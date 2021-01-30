

<p align="center">
      <h1 align="center">Backend 문서</h2>
	  <p align="center">
    	<a href="https://github.com/CSUOS/KOS/issues">Report Bug</a>
  	  </p>
</p>

# 목차

- [목차](#목차)
- [서버 실행](#서버-실행)
- [GITHUB Auth 설정 방법](#github-auth-설정-방법)
- [Access Secret 설정 안내](#access-secret-설정-안내)
- [로그인 세션 확인 방법 안내](#로그인-세션-확인-방법-안내)
	- [정상적으로 로그인되었는지 확인](#정상적으로-로그인되었는지-확인)

# 서버 실행

server 디렉토리에서 다음의 명령어로 실행

* 기본

```
go run main.go
```

# GITHUB Auth 설정 방법

아무런 Auth 설정 없이 GitHub에 API를 호출하면 1시간 당 60건 밖에 요청할 수 없습니다. 하지만 API 요청을 Auth Token과 함께 보내면 1시간 당 5,000건으로 제한이 완화되므로 Auth 관련 설정을 꼭 해야 합니다.

그 방법은 아래와 같습니다.

1. 본 리포지토리의 `/backend` 경로에 `.env` 파일을 만들어주세요.
2. 그리고 그 파일에 `GITHUB_TOKEN = [토큰]` (대괄호 제외)를 적어주세요. 정확한 토근 값은 유출을 방지하기 위해 이 문서에는 적지 않았으므로, 미팅 노트를 확인해주세요.
```
GITHUB_TOKEN = [토큰]
```
3. `.env` 파일을 저장하고 서버를 다시 시작해주세요.

이렇게 하면 API 요청을 `csuos-kos` 계정의 권한으로 보내게 되므로 1시간 당 5,000건의 요청을 보낼 수 있습니다.

# Access Secret 설정 안내

백엔드에서 JWT Token을 사용하려면 `.env` 파일에 `ACCESS_SECRET` 가 정의되어있어야 하며, 이 값으로는 외부에 유출되지 않은 임의의 문자열을 사용해야 합니다. 이 값이 설정되지 않은 채 백엔드를 사용하면 소스코드에 정의된 기본값을 사용하게 되므로 위험할 수 있습니다.

이를 설정하는 방법은 위에서 GitHub Auth를 설정한 방법과 동일합니다.

1. 본 리포지토리의 `/backend` 경로에 `.env` 파일을 만들어주세요.
2. 그리고 그 파일에 `GITHUB_TOKEN = [토큰]` (대괄호 제외)를 적어주세요. 정확한 토근 값은 유출을 방지하기 위해 이 문서에는 적지 않았으므로, 미팅 노트를 확인해주세요.
```
ACCESS_SECRET = [임의의 토큰]
```
3. `.env` 파일을 저장하고 서버를 다시 시작해주세요.

# 로그인 세션 확인 방법 안내

백엔드의 몇몇 기능들은 로그인 된 상태에서만 접근할 수 있어야 합니다. 따라서 몇몇 API에서는 이를 확인하는 코드를 넣어야 하는데, 아래와 같이 할 수 있습니다. (UpdateUser에서 예시를 확인할 수 있습니다.)

## 정상적으로 로그인되었는지 확인

```go
func SampleAPI(c *gin.Context) {
	// 로그인되어있는지 확인 (User.go에 정의된 ParseValidAuthToken 함수 사용)
	// Controllers 패키지 밖에서 사용해야 한다면 Controllers 패키지를 import 해주세요.
	claims, err := ParseValidAuthToken(c.Request)
	if err != nil {
		// 로그인되어있지 않다면 401 반환
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// 토큰에 저장되어있는 특정 데이터에 접근
	// 토큰에 어떤 데이터가 저장되어있는지는 User.go의 Login 함수를 확인해주세요.
	currentId := claims["id"].(string)
}
```