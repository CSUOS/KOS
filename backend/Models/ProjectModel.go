package Models

import (
	"gorm.io/gorm"
)

// Project 프로젝트 스키마
type Project struct {
	gorm.Model        // 모델에는 아이디랑 생성, 수정, 삭제 날짜가 기본적으로 포함.
	Lists      []List `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"` // 하나의 프로젝트에 여러 리스트가 존재 Gorm has many(one to many) 스키마에서 Lists in project 대체
	BGColor    string `gorm:"default:green"`// 배경 색깔
	IsPrivate  bool   // 공개 프로젝트 설정
	BookMark   bool   // 북마크
	Name       string // 이름
	RepoOwner  string // GitHub 리포지토리 소유자 (ex. CSUOS)
	RepoName   string // GitHub 리포지토리 이름 (ex. KOS)
}
