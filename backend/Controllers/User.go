package Controllers

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// 로그인 요청시에 Request Body에 있어야 할 내용
type LoginRequest struct {
	ID			string	// 로그인을 요청하는 ID
	Password	string	// 로그인을 요청하는 Password
}

// Login 로그인 요청을 처리, 성공할 경우 JWT 토큰 발행
func Login(c *gin.Context) {
	var req LoginRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Request body is not valid."})
		return
	}

	if req.ID == "" || req.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "At least one parameter is not valid."})
		return
	}
	if ValidateByRabums(req) {
		// 입력한 id로 유저 찾기
		var user Models.User
		if err := Models.GetUserByName(&user, req.ID); err != nil {
			// 회원이 등록되어있지 않은 경우
			c.JSON(http.StatusBadRequest, gin.H{"message": "No contents matched"})
			return
		}

		// 로그인이 성공하면 JWT 토큰 발급
		secret := GetSecret()
		atClaims := jwt.MapClaims{}
		atClaims["id"] = fmt.Sprint(user.ID)
		atClaims["exp"] = time.Now().Add(time.Hour).Unix()
		accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)

		signed, err := accessToken.SignedString([]byte(secret))

		if err != nil {
			fmt.Println(err.Error())
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		c.SetCookie("access-token", signed, 60*60, "/", "", false, false)
		c.JSON(http.StatusOK, gin.H{"id": fmt.Sprint(user.ID)})
		return
	} else {
		// 그 어떤 이유로든 로그인이 실패하면
		// 부가적인 정보 없이 401 반환
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Login is failed for " + req.ID})
		return
	}
}

// GetSecret JWT 토큰을 발행하는데 필요한 secret을 .env에서 가져옴. 없을 경우 경고 메세지를 출력하고 기본값 사용
func GetSecret() string {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Failed to load '.env'. Create one and set ACCESS_SECRET: " + err.Error())
		return "2kjhv5lk23j4vvl2jk34v5j23vo2jvio3r"
	}

	token, found := os.LookupEnv("ACCESS_SECRET")
	if !found {
		fmt.Println("There's no ACCESS_SECRET in .env: " + err.Error())
		return "2kjhv5lk23j4vvl2jk34v5j23vo2jvio3r"
	}

	return token
}

// ParseValidAuthToken 쿠키에 JWT 토큰이 있는지 확인하고, 그 토큰이 정상적으로 Sign되었는지 확인한 뒤 그 토큰 내 데이터(MapClaims) 반환.
func ParseValidAuthToken(r *http.Request) (jwt.MapClaims, error) {
	tokenCookie, err := r.Cookie("access-token")
	if err != nil {
		return nil, errors.New("There's no valid auth token.")
	}

	token, err := jwt.Parse(tokenCookie.Value, func(token *jwt.Token) (interface{}, error) {
		// token method가 SigningMethodHMAC 인지를 검증함.
		if _, verified := token.Method.(*jwt.SigningMethodHMAC); verified {
			return []byte(GetSecret()), nil
		} else {
			return nil, errors.New("Unexpected signing method: " + token.Header["alg"].(string))
		}
	})

	if err != nil {
		return nil, err
	}

	claims, casted := token.Claims.(jwt.MapClaims)
	if !casted || !token.Valid {
		return nil, errors.New("There's no valid auth token.")
	}
	
	return claims, nil
}

// ValidateByRabums RABUMS 서버와 통신하여 로그인 요청을 보냄.
func ValidateByRabums(req interface{}) bool {
	// 아직 RABUMS 서버가 활성화되지 않았으므로,
	// 현재는 디버그를 목적으로 모든 요청에 대하여
	// 로그인을 수락하는 것으로 함.
	return true
}

// Logout 로그아웃 요청을 처리, 단순히 JWT 토큰을 비활성화함.
func Logout(c *gin.Context) {
	c.SetCookie("access-token", "", 0, "/", "", false, false)
}

// GetAllUsers 모든 유저들의 정보를 반환
func GetAllUsers(c *gin.Context) {
	var user []Models.User
	err := Models.GetAllUsers(&user)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
	}
}

// CreateUser 유저를 하나 생성한다.
func CreateUser(c *gin.Context) {
	var user Models.User

	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateUser(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// GetUserByID 파라미터로 전달된 아이디와 매칭되는 유저를 하나 반환한다.
func GetUserByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Models.User
	err := Models.GetUserByID(&user, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
	}
}

// UpdateUser 아이디와 매칭되는 유저를 찾고 업데이트
func UpdateUser(c *gin.Context) {
	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(c.Request)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var user Models.User
	id := c.Params.ByName("id")

	// 수정하려는 유저가 현재 로그인된 유저와 같은지 확인
	if id != claims["id"].(string) {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	err = Models.GetUserByID(&user, id)

	if err != nil {
		c.JSON(http.StatusNotFound, user)
	}

	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err = Models.UpdateUser(&user, id); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser 아이디에 매칭되는 유저를 삭제
func DeleteUser(c *gin.Context) {
	var user Models.User
	id := c.Params.ByName("id")
	err := Models.DeleteUser(&user, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: " user is deleted"})
	}
}
