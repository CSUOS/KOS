package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/gin-gonic/gin"
)

// GetAllTasks 모든 태스크들의 정보를 반환
func GetAllTasks(c *gin.Context) {
	var tasks []Models.Task

	if err := Models.GetAllTasks(&tasks); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, tasks)
}

// CreateTask 태스크를 하나 생성한다.
func CreateTask(c *gin.Context) {
	var task Models.Task

	if err := c.BindJSON(&task); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateTask(&task); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, task)
}

// GetTaskByID 아이디에 매칭되는 태스크를 반환
func GetTaskByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var task Models.Task

	if err := Models.GetTaskByID(&task, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, task)
}

// UpdateTask 아이디와 매칭되는 태스크를 찾고 업데이트
func UpdateTask(c *gin.Context) {
	var task Models.Task
	id := c.Params.ByName("id")

	if err := Models.GetTaskByID(&task, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	if err := c.BindJSON(&task); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	
	if err := Models.UpdateTask(&task, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, task)
}

// DeleteTask 아이디와 매칭되는 태스크 삭제
func DeleteTask(c *gin.Context) {
	var task Models.Task
	id := c.Params.ByName("id")

	if err := Models.DeleteTask(&task, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, gin.H{"id " + id: "is deleted"})
}
