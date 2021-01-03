package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/gin-gonic/gin"
)

// GetAllWorksIn 모든 유저 - 프로젝트 관계를 가져온다.
func GetAllWorksIn(c *gin.Context) {
	var worksIn []Models.WorksIn
	err := Models.GetAllWorksIn(&worksIn)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// CreateWorksIn 유저 - 프로젝트 관계를 생성
func CreateWorksIn(c *gin.Context) {
	var worksIn Models.WorksIn
	c.BindJSON(&worksIn)
	err := Models.CreateWorksIn(&worksIn)

	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// GetWorksInByID 유저 - 프로젝트 관계를 아이디로 가져온다
func GetWorksInByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var worksIn Models.WorksIn
	err := Models.GetWorksInByID(&worksIn, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// UpdateWorksIn 유저 - 프로젝트 관계를 업데이트
func UpdateWorksIn(c *gin.Context) {
	var worksIn Models.WorksIn
	id := c.Params.ByName("id")
	err := Models.UpdateWorksIn(&worksIn, id)

	if err != nil {
		c.JSON(http.StatusNotFound, worksIn)
	}

	c.BindJSON(&worksIn)
	err = Models.UpdateWorksIn(&worksIn, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// DeleteWorksIn 유저 - 프로젝트의 관계를 삭제
func DeleteWorksIn(c *gin.Context) {
	var worksIn Models.WorksIn
	id := c.Params.ByName("id")
	err := Models.DeleteWorksIn(&worksIn, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: "is deleted"})
	}
}
