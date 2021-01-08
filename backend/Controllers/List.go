package Controllers

import (
	"fmt"
	"net/http"
	"strconv"

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

}

// CopyList 리스트를 복사한다.
func CopyList(c *gin.Context) {
	// 리퀘스트 바디
	type copy struct {
		ProjectID uint `json:"ProjectID"`
		ListID    uint `json:"ListID"`
	}

	var temp copy

	// JSON 디코드
	c.BindJSON(&temp)

	// 복사할 리스트와 복사된 리스트가 추가될 프로젝트
	var targetList Models.List
	var targetProject Models.Project

	err := Models.GetProjectByID(&targetProject, strconv.FormatUint(uint64(temp.ProjectID), 10))

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	err = Models.GetListByID(&targetList, strconv.FormatUint(uint64(temp.ListID), 10))

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 새로운 리스트를 만든다.
	// var newList Models.List

	// newList.Index = targetList.Index
	// newList.ProjectID = targetList.ProjectID
	// newList.Name = targetList.Name

	err = Models.CreateList(&targetList)

	// 새로운 리스트를 기존에 프로젝트에 추가한다.
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		targetProject.Lists = append(targetProject.Lists, targetList)
		c.JSON(http.StatusOK, targetProject)
	}

}

// ExportsList 리스트를 다른 프로젝트로 이동시킨다.
func ExportsList(c *gin.Context) {

}
