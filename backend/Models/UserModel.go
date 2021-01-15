package Models

import (
	"gorm.io/gorm"
)

// User 유저의 데이터 스키마
type User struct {
	gorm.Model        // 모델에는 유니크 아이디랑 생성, 수정, 삭제 날짜가 기본적으로 포함.
	Name       string // 유저의 아이디
	Password   string // 유저의 비밀번호
	GitID      string // GithubID
}
