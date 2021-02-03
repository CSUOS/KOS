package Models

import (
	"github.com/CSUOS/KOS/backend/Config"
)

// GetAllWorksIn 모든 유저와 프로젝트의 관계를 반환
func GetAllWorksIn(worksIn *[]WorksIn) (err error) {
	if err = Config.DB.Preload("User").Preload("Project").Find(worksIn).Error; err != nil {
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
	if err = Config.DB.Preload("User").Preload("Project.Lists.Tasks").Where("user_id = ?", id).Find(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// 특정 프로젝트에 속해있는 유저 받아오기
func GetWorksInByProjectID(worksIn *[]WorksIn, id string) (err error) {
	if err = Config.DB.Preload("User").Where("project_id = ?", id).Find(worksIn).Error; err != nil {
		return err
	}
	return nil
}

// UpdateWorksIn 아이디에 매칭되는 유저 - 프로젝트 관계 업데이트
func UpdateWorksIn(worksIn *WorksIn, authlvl string) (err error) {
	if err = Config.DB.Model(worksIn).Update("AuthLVL", authlvl).Error; err != nil {
		return err
	}
	return nil
}

// DeleteWorksIn 아이디에 매칭되는 유저 - 프로젝트 관계 삭제
func DeleteWorksIn(worksIn *WorksIn, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(worksIn)
	return nil
}

func DeleteWorksInByUserNProjectID(worksIn *WorksIn, userID string, projectID string) (err error) {
	Config.DB.Where("user_id = ?", userID).Where("project_id = ?", projectID).Delete(worksIn)
	return nil
}

// GetWorksInByUserNProjectID 유저 아이디와 프로젝트 아이디를 조회해서 관계를 찾아온다.
func GetWorksInByUserNProjectID(worksIn *WorksIn, userID string, projectID string) (err error) {
	if err = Config.DB.Preload("User").Preload("Project").Where("user_id = ?", userID).Where("project_id = ?", projectID).First(worksIn).Error; err != nil {
		return err
	}
	return nil
}
