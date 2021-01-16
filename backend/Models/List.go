package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
)

// GetAllLists 모든 리스트를 반환한다.
func GetAllLists(list *[]List) (err error) {
	if err = Config.DB.Preload("Tasks").Find(list).Error; err != nil {
		return err
	}
	return nil
}

// CreateList 리스트를 생성한다.
func CreateList(list *List) (err error) {
	if err = Config.DB.Create(list).Error; err != nil {
		return err
	}
	return nil
}

// GetListByID 아이디에 매칭되는 리스트를 반환
func GetListByID(list *List, id string) (err error) {
	if err = Config.DB.Preload("Tasks").Where("id = ?", id).First(list).Error; err != nil {
		return err
	}
	return nil
}

// UpdateList 아이디에 매칭되는 리스트를 업데이트
func UpdateList(list *List, id string) (err error) {
	fmt.Println(list)
	Config.DB.Save(list)
	return nil
}

// DeleteList 아이디에 매칭되는 리스트를 삭제
func DeleteList(list *List, id string) (err error) {
	// GORM 제약조건이 동작하지 않아 수동으로 삭제, 리스트 아래있는 태스크들을 삭제
	Config.DB.Where("list_id = ?", id).Delete(list.Tasks)
	Config.DB.Where("id = ?", id).Delete(list)
	return nil
}

// DeleteListByProjectID 프로젝트 아이디와 매칭되는 리스트를 삭제
func DeleteListByProjectID(list *List, id string) (err error) {
	Config.DB.Where("project_id = ?", id).Delete(list)
	return nil
}

// GetAllListID 프로젝트 아이디와 매칭되는 리스트의 아이디를 모두 반환한다.
func GetAllListID(list *[]List, id string) (err error) {
	if err = Config.DB.Where("project_id = ?", id).Find(list).Error; err != nil {
		return err
	}
	return nil
}

// GetListsByProjectID 프로젝트 아이디에 매칭되는 리스트들을 반환
func GetListsByProjectID(list *[]List, id string) (err error) {
	if err = Config.DB.Where("project_id = ?", id).Select("Name", "Index").Find(list).Error; err != nil {
		return err
	}
	return nil
}
