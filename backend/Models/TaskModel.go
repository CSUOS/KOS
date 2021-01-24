package Models

import (
	"gorm.io/gorm"
)

// Task 태스크에 관한 스키마
type Task struct {
	gorm.Model // 모델에는 아이디랑 생성, 수정, 삭제 날짜가 기본적으로 포함.
	Name       string
	ListID     uint   // ListModel의 아이디를 가리킨다.
	Attribute  string // 태스크 속성
	Reactions  string // 리액션
}
