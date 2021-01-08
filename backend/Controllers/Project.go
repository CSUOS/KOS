package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/gin-gonic/gin"
)

// GetAllProjects 프로젝트들의 정보를 가져온다
func GetAllProjects(c *gin.Context) {
	var projects []Models.Project
	err := Models.GetAllProjects(&projects)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, projects)
	}
}

// CreateProject 프로젝트를 하나 생성한다.
func CreateProject(c *gin.Context) {
	var project Models.Project

	if err := c.BindJSON(&project); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateProject(&project); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, project)
}

// GetProjectByID 파라미터로 전달된 아이디와 매칭되는 프로젝트 하나 반환
func GetProjectByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var project Models.Project
	err := Models.GetProjectByID(&project, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, project)
	}
}

// UpdateProject 아이디와 매칭되는 프로젝트를 찾고 업데이트
func UpdateProject(c *gin.Context) {
	var project Models.Project
	id := c.Params.ByName("id")
	err := Models.GetProjectByID(&project, id)

	if err != nil {
		c.JSON(http.StatusNotFound, project)
		return
	}

	if err := c.BindJSON(&project); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err = Models.UpdateProject(&project, id); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, project)
}

// DeleteProject 아이디와 매칭되는 프로젝트를 삭제
func DeleteProject(c *gin.Context) {
	var project Models.Project
	id := c.Params.ByName("id")
	err := Models.DeleteProject(&project, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: "is deleted"})
	}
}
