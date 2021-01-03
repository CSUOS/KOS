package Models

import (
	"github.com/jinzhu/gorm"
)

// WorksIn 유저들과 프로젝트의 관계
type WorksIn struct {
	gorm.Model
	User    User    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // 유저 Gorm One to One
	Project Project `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // 프로젝트 Gorm One to One
	AuthLVL uint    // 권한 레벨 VIEWR = 0, MEMBER = 1, ADMIN = 2
}
