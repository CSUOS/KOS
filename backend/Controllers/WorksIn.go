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

// GetWorksInByUserID 유저와 프로젝트 아이디로 유저-프로젝트 관계를 가져온다.
func GetWorksInByUserID(c *gin.Context) {
	id := c.Params.ByName("id")
	var worksIn []Models.WorksIn

	err := Models.GetWorksInByUserID(&worksIn, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// 특정 프로젝트에 속해있는 유저 받아오기
func GetWorksInByProjectID(c *gin.Context) {
	id := c.Params.ByName("id")
	var worksIn []Models.WorksIn

	err := Models.GetWorksInByProjectID(&worksIn, id)

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
	err := Models.GetWorksInByID(&worksIn, id)

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
		c.JSON(http.StatusOK, gin.H{"id " + id: " works-in is deleted"})
	}
}

// InviteUser 유저를 프로젝트로 초대
func InviteUser(c *gin.Context) {
	type reqBody struct {
		UserID    string `json:"UserID"`
		ProjectID string `json:"ProjectID"`
	}

	var req reqBody

	c.BindJSON(&req)

	var User Models.User
	err := Models.GetUserByID(&User, req.UserID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	var Project Models.Project
	err = Models.GetProjectByID(&Project, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	var worksIn Models.WorksIn

	worksIn.AuthLVL = 1
	worksIn.ProjectID = Project.ID
	worksIn.UserID = User.ID
	worksIn.User = User
	worksIn.Project = Project

	err = Models.CreateWorksIn(&worksIn)

	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, worksIn)
	}
}

// ExitUserFromProject 프로젝트에 유저 이탈
func ExitUserFromProject(c *gin.Context) {
	type reqBody struct {
		UserID    string `json:"userID"`
		ProjectID string `json:"ProjectID"`
	}

	var req reqBody

	c.BindJSON(&req)

	var worksIn Models.WorksIn

	err := Models.GetWorksInByUserNProjectID(&worksIn, req.UserID, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.DeleteWorksInByUserNProjectID(&worksIn, req.UserID, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + fmt.Sprint(worksIn.ID): " works-in is deleted"})
	}
}
