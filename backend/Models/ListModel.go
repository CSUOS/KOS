package Models

import "github.com/jinzhu/gorm"

// List 리스트에 관한 정보 스키마
type List struct {
	gorm.Model        // 모델에는 아이디랑 생성, 수정, 삭제 날짜가 기본적으로 포함.
	Tasks      []Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // 하나의 리스트에는 여러 태스크가 존재 Gorm has many (one to many)
	ProjectID  uint
	Name       string // 리스트 이름
	Index      int    // 리스트 인덱스
}
