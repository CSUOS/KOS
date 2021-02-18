package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
	"gorm.io/datatypes"
)

// GetAllTasks 모든 태스크를 반환
func GetAllTasks(task *[]Task) (err error) {
	if err = Config.DB.Find(task).Error; err != nil {
		return err
	}
	return nil
}

// CreateTask 태스크를 하나 만든다
func CreateTask(task *Task) (err error) {
	if err = Config.DB.Create(task).Error; err != nil {
		return err
	}
	return nil
}

// GetTaskByID 아이디랑 매칭되는 태스크를 반환
func GetTaskByID(task *Task, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(task).Error; err != nil {
		return err
	}
	return nil
}

// UpdateTask 아이디랑 매칭되는 태스크를 업데이트
func UpdateTask(task *Task, id string) (err error) {
	fmt.Println(task)
	Config.DB.Save(task)
	return nil
}

// DeleteTask 아이디와 매칭되는 태스크를 삭제한다.
func DeleteTask(task *Task, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(task)
	return nil
}

// DeleteTaskByListID 리스트 아이디와 매칭되는 태스크를 삭제
func DeleteTaskByListID(task *Task, id uint) (err error) {
	Config.DB.Where("list_id = ?", id).Delete(task)
	return nil
}

// GetTasksNameNAttrByListID 태스크들을 리스트 아이디로 이름과 속성만 반환한다.(복사시에 ID와 불필요한 복사를 피하기위해서 이용)
func GetTasksNameNAttrByListID(tasks *[]Task, id uint) (err error) {
	if err = Config.DB.Where("list_id = ?", id).Select("Name", "Attribute").Find(tasks).Error; err != nil {
		return err
	}
	return nil
}

// GetTasksByListID 리스트 아이디에 매칭되는 태스크들을 반환한다.
func GetTasksByListID(tasks *[]Task, id uint) (err error) {
	if err = Config.DB.Where("list_id = ?", id).Find(tasks).Error; err != nil {
		return err
	}
	return nil
}

// GetTaskByListID 태스크 ID와 리스트 ID에 매칭되는 태스크를 반환한다.
func GetTaskByListID(task *Task, taskID string, listID string) (err error) {
	if err = Config.DB.Where("id = ?", taskID).Where("list_id = ?", listID).First(task).Error; err != nil {
		return err
	}
	return nil
}

// GetNTasksByListID 해당 리스트 아이디에 몇개의 태스크가 속해있는지 반환
func GetNTasksByListID(id uint, count *int64) (err error) {
	if err = Config.DB.Model(&Task{}).Where("list_id = ?", id).Count(count).Error; err != nil {
		return err
	}
	return nil
}

// GetReaction 리액션을 가져온다.
func GetReaction(task *Task, emoji string) (err error) {
	if err = Config.DB.First(&task, datatypes.JSONQuery("Reactions").HasKey(emoji)).Error; err != nil {
		return err
	}
	return nil
}
