package Models

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
)

// GetAllUsers 모든 유저들의 정보를 가져온다.
func GetAllUsers(user *[]User) (err error) {
	if err = Config.DB.Find(user).Error; err != nil {
		return err
	}
	return nil
}

// CreateUser 유저를 생성
func CreateUser(user *User) (err error) {
	// password 변환 과정 필요
	if err = Config.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// GetUserByID 아이디에 매칭되는 유저 테이블에서 첫번째 행을 반환
func GetUserByID(user *User, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(user).Error; err != nil {
		return err
	}
	return nil
}

// GetUserByName 유저가 입력한 아이디에 매칭되는 유저를 반환
func GetUserByName(user *User, name string) (err error) {
	if err = Config.DB.Where("name = ?", name).First(user).Error; err != nil {
		return err
	}
	return nil
}

// UpdateUser 아이디에 매칭되는 유저 정보 업데이트
func UpdateUser(user *User, id string) (err error) {
	fmt.Println(user)
	Config.DB.Save(user)
	return nil
}

// DeleteUser 아이디에 매칭되는 유저 삭제
func DeleteUser(user *User, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(user)
	return nil
}
