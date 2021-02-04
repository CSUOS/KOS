package Controllers

import (
	"fmt"
	"net/http"
	"sort"
	"strconv"
	"strings"

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
		return
	}

	if err := c.BindJSON(&task); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err = Models.UpdateTask(&task, id); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, task)
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
		From      string `json:"FromID"`
		To        string `json:"ToID"`
		TaskID    string `json:"TaskID"`
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

// AddTask 리스트안에 태스크를 추가한다.
func AddTask(c *gin.Context) {
	type reqBody struct {
		ProjectID string      `json:"ProjectID"`
		ListID    string      `json:"ListID"`
		Task      Models.Task `json:"Task"`
	}

	var req reqBody
	var list Models.List

	c.BindJSON(&req)

	err := Models.GetListByProjectNListID(&list, req.ListID, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	list.Tasks = append(list.Tasks, req.Task)

	err = Models.UpdateList(&list, req.ListID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, list)
	}
}

// ModifyTaskProp 태스크 속성 수정
func ModifyTaskProp(c *gin.Context) {
	type reqBody struct {
		TaskID    string `json:"TaskID"`
		Fixed     bool   `json:"Fixed"`
		Emergency bool   `json:"Emergency"`
	}

	var req reqBody
	var task Models.Task

	c.BindJSON(&req)

	err := Models.GetTaskByID(&task, req.TaskID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	task.Fixed = req.Fixed
	task.Emergency = req.Emergency

	err = Models.UpdateTask(&task, req.TaskID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, task)
	}
}

// GetTasksBySortedOrder 태스크들을 정렬해서 가져온다.
func GetTasksBySortedOrder(c *gin.Context) {
	id := c.Params.ByName("id")
	var list Models.List
	var tasks []Models.Task

	err := Models.GetListByID(&list, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetTasksByListID(&tasks, list.ID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	sort.Slice(tasks, func(i, j int) bool {
		if tasks[i].Fixed {
			return true
		}

		if tasks[i].Emergency {
			return true
		}

		return tasks[i].Rank < tasks[j].Rank
	})

	// 정렬되어진 태스크드들을 반환.
	c.JSON(http.StatusOK, tasks)
}

// TasksSearch 태스크를 검색한다.
func TasksSearch(c *gin.Context) {
	type reqBody struct {
		ListID  string `json:"ListID"`
		Keyword string `json:"Keyword"`
	}

	var req reqBody
	var tasks []Models.Task

	c.BindJSON(&req)

	id, err := strconv.ParseUint(req.ListID, 10, 32)

	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	}

	// 리스트 아이디에 해당되는 모든 태스크들을 반환한다.
	err = Models.GetTasksNameNAttrByListID(&tasks, uint(id))

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	var result []Models.Task

	// 받아온 태스크들을 순환하면서 만약 키워드가 포함되어있다면 반환값에 추가한다.
	for i := range tasks {
		if strings.Contains(tasks[i].Name, req.Keyword) {
			result = append(result, tasks[i])
		}
	}

	c.JSON(http.StatusOK, result)
}

// AddReaction 태스크에 리액션을 추가
func AddReaction(c *gin.Context) {

}
