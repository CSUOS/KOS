package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
)

// GetAllWorksIn 모든 유저와 프로젝트의 관계를 반환
func GetAllWorksIn(worksIn *[]WorksIn) (err error) {
	if err = Config.DB.Find(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// CreateWorksIn 유저와 프로젝트의 관계를 생성
func CreateWorksIn(worksIn *WorksIn) (err error) {
	if err = Config.DB.Create(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// GetWorksInByID 아이디에 매칭되는 관계를 반환
func GetWorksInByID(worksIn *WorksIn, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// GetWorksInByUserID 유저아이디가 속해있는 모든 프로젝트들을 반환한다.
func GetWorksInByUserID(worksIn *[]WorksIn, id string) (err error) {
	if err = Config.DB.Where("user_id = ?", id).Find(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// UpdateWorksIn 아이디에 매칭되는 유저 - 프로젝트 관계 업데이트
func UpdateWorksIn(worksIn *WorksIn, id string) (err error) {
	fmt.Println(worksIn)
	Config.DB.Save(worksIn)
	return nil
}

// DeleteWorksIn 아이디에 매칭되는 유저 - 프로젝트 관계 삭제
func DeleteWorksIn(worksIn *WorksIn, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(worksIn)
	return nil
}
