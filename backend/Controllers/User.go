package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/gin-gonic/gin"
)

// GetAllUsers 모든 유저들의 정보를 반환
func GetAllUsers(c *gin.Context) {
	var user []Models.User

	if err := Models.GetAllUsers(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// CreateUser 유저를 하나 생성한다.
func CreateUser(c *gin.Context) {
	var user Models.User

	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateUser(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// GetUserByID 파라미터로 전달된 아이디와 매칭되는 유저를 하나 반환한다.
func GetUserByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Models.User

	if err := Models.GetUserByID(&user, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateUser 아이디와 매칭되는 유저를 찾고 업데이트
func UpdateUser(c *gin.Context) {
	var user Models.User
	id := c.Params.ByName("id")

	if err := Models.GetUserByID(&user, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.UpdateUser(&user, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, user)
}

// DeleteUser 아이디에 매칭되는 유저를 삭제
func DeleteUser(c *gin.Context) {
	var user Models.User
	id := c.Params.ByName("id")

	if err := Models.DeleteUser(&user, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{"id " + id: "is deleted"})
}
