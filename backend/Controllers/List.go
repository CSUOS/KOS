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
		c.JSON(http.StatusOK, gin.H{"id " + id: "is deleted"})
	}
}
