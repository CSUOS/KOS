package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"

	_ "github.com/go-sql-driver/mysql"
)

// GetAllLists 모든 리스트를 반환한다.
func GetAllLists(list *[]List) (err error) {
	if err = Config.DB.Preload("Project").Preload("Tasks").Find(list).Error; err != nil {
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
	Config.DB.Select("Tasks").Where("id = ?", id).Delete(list)
	return nil
}
