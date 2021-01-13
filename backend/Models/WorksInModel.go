package Models

import (
	"gorm.io/gorm"
)

// WorksIn 유저들과 프로젝트의 관계
type WorksIn struct {
	gorm.Model
	User      User // 유저 Gorm One to One
	UserID    uint
	Project   Project // 프로젝트 Gorm One to One
	ProjectID uint
	AuthLVL   uint // 권한 레벨 MEMBER = 1, ADMIN = 2
}
