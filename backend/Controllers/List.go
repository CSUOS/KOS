package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"

	"github.com/gin-gonic/gin"
)

// GetAllLists 모든 리스트들의 정보를 가져온다
func GetAllLists(c *gin.Context) {
	var lists []Models.List
	err := Models.GetAllLists(&lists)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, lists)
	}
}

// AddList 프로젝트안에 리스트를 추가한다.
func AddList(c *gin.Context) {
	id := c.Params.ByName("id")
	var Project Models.Project
	var list Models.List

	err := Models.GetProjectByID(&Project, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	c.BindJSON(&list)

	Project.Lists = append(Project.Lists, list)

	err = Models.UpdateProject(&Project, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, Project)
	}
}

// CreateList 리스트를 하나 생성한다.
func CreateList(c *gin.Context) {
	var list Models.List

	if err := c.BindJSON(&list); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateList(&list); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, list)
}

// GetListByID 아이디에 매칭되는 리스트를 반환한다.
func GetListByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var list Models.List
	err := Models.GetListByID(&list, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, list)
	}
}

// UpdateList 아이디와 매칭되는 리스트를 업데이트
func UpdateList(c *gin.Context) {
	var list Models.List
	id := c.Params.ByName("id")
	err := Models.GetListByID(&list, id)

	if err != nil {
		c.JSON(http.StatusNotFound, list)
		return
	}

	if err := c.BindJSON(&list); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err = Models.UpdateList(&list, id); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, list)
}

// DeleteList 아이디와 매칭되는 리스트를 삭제한다.
func DeleteList(c *gin.Context) {
	var list Models.List
	id := c.Params.ByName("id")
	err := Models.DeleteList(&list, id)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: " list is deleted"})
	}
}

// MoveList 리스트를 이동시킨다.
func MoveList(c *gin.Context) {
	type reqBody struct {
		ProjectID string `json:"ProjectID"`
		From      string `json:"FromID"`
		To        string `json:"ToID"`
	}

	var req reqBody

	// 디코드
	c.BindJSON(&req)

	var from Models.List
	var to Models.List
	var targetProject Models.Project

	err := Models.GetListByProjectNListID(&from, req.From, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetListByProjectNListID(&to, req.To, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 인덱스 스왑.
	var temp = from.Rank
	from.Rank = to.Rank
	to.Rank = temp

	Models.UpdateList(&from, req.From)
	Models.UpdateList(&to, req.To)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		err = Models.GetProjectByID(&targetProject, req.ProjectID)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, targetProject)
		}
	}
}

// CopyList 리스트를 복사한다.
func CopyList(c *gin.Context) {
	// 리퀘스트 바디
	type reqBody struct {
		ProjectID string `json:"ProjectID"`
		ListID    string `json:"ListID"`
	}

	var req reqBody

	// JSON 디코드
	c.BindJSON(&req)

	// 복사할 리스트와 복사된 리스트가 추가될 프로젝트
	var targetList Models.List
	var targetProject Models.Project
	var targetTasks []Models.Task

	// 아이디에 매칭되는 프로젝트를 하나 가져온다.
	err := Models.GetProjectByID(&targetProject, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 아이디에 매칭되는 리스트를 하나 가져온다.
	err = Models.GetListByID(&targetList, req.ListID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 리스트 아이디에 매칭되는 태스크들을 반환한다.
	err = Models.GetTasksByListID(&targetTasks, targetList.ID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 새로운 리스트를 만든다.
	var newList Models.List
	var newTasks []Models.Task

	// 먼저 태스크들을 복사한다.

	for i := 0; i < len(targetTasks); i++ {
		var tempTask Models.Task
		tempTask.Attribute = targetTasks[i].Attribute
		tempTask.Name = targetTasks[i].Name
		newTasks = append(newTasks, tempTask)
	}

	// 새로운 리스트 복사에 필요한 정보들만 복사 후
	newList.Rank = targetList.Rank
	newList.Name = targetList.Name
	newList.Tasks = newTasks

	// 기존 프로젝트 리스트에 추가
	targetProject.Lists = append(targetProject.Lists, newList)
	err = Models.UpdateProject(&targetProject, req.ProjectID)

	// 새로운 리스트를 기존에 프로젝트에 추가한다.
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, targetProject)
	}
}

// ExportsList 리스트를 다른 프로젝트로 이동시킨다.
func ExportsList(c *gin.Context) {
	type reqBody struct {
		From   string `json:"FromID"`
		To     string `json:"ToID"`
		ListID string `json:"ListID"`
	}

	var req reqBody

	c.BindJSON(&req)

	var from Models.Project
	var to Models.Project

	var targetList Models.List
	var targetTasks []Models.Task

	err := Models.GetProjectByID(&from, req.From)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetProjectByID(&to, req.To)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetListByProjectNListID(&targetList, req.ListID, req.From)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	var newList Models.List
	var newTasks []Models.Task

	err = Models.GetTasksByListID(&targetTasks, targetList.ID)

	for i := 0; i < len(targetTasks); i++ {
		var temp Models.Task
		temp.Name = targetTasks[i].Name
		temp.Attribute = targetTasks[i].Attribute
		newTasks = append(newTasks, temp)
	}

	newList.Name = targetList.Name
	newList.Rank = targetList.Rank
	newList.Tasks = newTasks

	to.Lists = append(to.Lists, newList)

	// 원래 있던 장소에서 삭제
	Models.DeleteList(&targetList, req.ListID)

	err = Models.UpdateProject(&to, req.To)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, to)
	}
}
