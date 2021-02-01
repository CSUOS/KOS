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
	err := Models.GetAllTasks(&tasks)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, tasks)
	}
}

// CreateTask 태스크를 하나 생성한다.
func CreateTask(c *gin.Context) {
	var task Models.Task
	c.BindJSON(&task)
	err := Models.CreateTask(&task)

	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, task)
	}
}

// GetTaskByID 아이디에 매칭되는 태스크를 반환
func GetTaskByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var task Models.Task
	err := Models.GetTaskByID(&task, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, task)
	}
}

// UpdateTask 아이디와 매칭되는 태스크를 찾고 업데이트
func UpdateTask(c *gin.Context) {
	var task Models.Task
	id := c.Params.ByName("id")
	err := Models.GetTaskByID(&task, id)

	if err != nil {
		c.JSON(http.StatusNotFound, task)
	}

	c.BindJSON(&task)
	err = Models.UpdateTask(&task, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, task)
	}
}

// DeleteTask 아이디와 매칭되는 태스크 삭제
func DeleteTask(c *gin.Context) {
	var task Models.Task
	id := c.Params.ByName("id")
	err := Models.DeleteTask(&task, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: " task is deleted"})
	}
}

// MoveTask 태스크를 이동
func MoveTask(c *gin.Context) {
	type reqBody struct {
		ProjectID string `json:"ProjectID"`
		From      string `json:"fromID"`
		To        string `json:"ToID"`
		TaskID    string `json:"taskID"`
	}

	var req reqBody

	c.BindJSON(&req)

	var toList Models.List
	var fromList Models.List
	var targetTask Models.Task

	// 리스트가 프로젝트 안에 포함되어 있는 리스트 인지 확인하고 가져온다.
	err := Models.GetListByProjectNListID(&toList, req.To, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetListByProjectNListID(&fromList, req.From, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 태스크가 리스트에 포함되어 있는지 확인.
	err = Models.GetTaskByListID(&targetTask, req.TaskID, req.From)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	var newTask Models.Task

	newTask.Reactions = targetTask.Reactions
	newTask.Name = targetTask.Name
	newTask.Attribute = targetTask.Attribute

	Models.DeleteTask(&targetTask, req.TaskID)

	toList.Tasks = append(toList.Tasks, newTask)

	err = Models.UpdateList(&toList, req.To)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, toList)
	}
}

// AddReaction 태스크에 리액션을 추가
func AddReaction(c *gin.Context) {

}
