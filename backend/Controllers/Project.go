package Controllers

import (
	"fmt"
	"net/http"

	"github.com/CSUOS/KOS/backend/Models"
	// "github.com/CSUOS/KOS/backend/GitHubInteraction"

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
	var lists []Models.List
	var list Models.List
	var task Models.Task
	id := c.Params.ByName("id")

	// GORM 제약조건이 동작하지 않아 수동으로 삭제.
	// 먼저 프로젝트 ID와 매칭되는 모든 리스트를 찾아온다.
	Models.GetAllListID(&lists, id)
	// 리스트들을 순환하면서 리스트 ID에 해당되는 태스크를 삭제한다.
	for i := 0; i < len(lists); i++ {
		Models.DeleteTaskByListID(&task, lists[i].ID)
	}
	// 태스크를 삭제하면 이제 프로젝트 ID와 매칭되는 리스트를 삭제한다.
	Models.DeleteListByProjectID(&list, id)

	// 마지막으로 프로젝트를 삭제.
	err := Models.DeleteProject(&project, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id " + id: " project is deleted"})
	}
}

// GetBranches 프로젝트에 연결된 GitHub 리포지토리의 브랜치 목록을 가져온다.
func GetBranches(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Not Implemented"})
}

// GetContributionsOfID 특정 Github ID의, 프로젝트에 연결된 GitHub 리포지토리의 기여도를 가져온다.
func GetContributionsOfID(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Not Implemented"})
}

// GetContributions 모든 멤버의, 프로젝트에 연결된 GitHub 리포지토리의 기여도를 가져온다. (GitHub ID가 등록되지 않은 멤버는 제외)
func GetContributions(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Not Implemented"})
}

// CountCommits 프로젝트에 연결된 GitHub 리포지토리의 특정 브랜치에 커밋된 커밋 수를 가져온다.
func CountCommits(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Not Implemented"})
}

// CopyProject 프로젝트를 복사한다.
func CopyProject(c *gin.Context) {
	// 리퀘스트 바디에서 아이디 1개를 가져온다.
	type reqBody struct {
		ProjectID string `json:"ProjectID"`
	}

	// JSON 디코드
	var req reqBody
	c.BindJSON(&req)

	var targetProject Models.Project
	var newProject Models.Project
	var lists []Models.List
	var tasks []Models.Task
	var newTasks []Models.Task
	var newLists []Models.List
	var counts []int64

	// 디코드된 아이디를 기준으로 하나 가져온다.
	err := Models.GetProjectByID(&targetProject, req.ProjectID)

	// 프로젝트에 포함된 모든 리스트들을 가져온다.
	err = Models.GetAllListID(&lists, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	// 먼저 태스크들을 새롭게 복사한다.
	for i := 0; i < len(lists); i++ {
		err = Models.GetTasksNameNAttrByListID(&tasks, lists[i].ID)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			// 태스크를 복사하고
			newTasks = append(newTasks, tasks...)
			var count int64
			// 리스트안에 태스크가 몇개 들어있는지 확인하고 기록
			Models.GetNTasksByListID(lists[i].ID, &count)
			counts = append(counts, count)
		}
	}

	// 그 다음 리스트를 복사한다.
	err = Models.GetListsByProjectID(&lists, req.ProjectID)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}

	newLists = append(newLists, lists...)

	// 리스트 복사후에 해당 리스트에 있었던 태스크들의 수만큼 새로운 리스트안 태스크에 추가한다.
	var index int64
	index = 0
	for i := 0; i < len(counts); i++ {
		for j := 0; j < int(counts[i]); j++ {
			newLists[i].Tasks = append(newLists[i].Tasks, newTasks[int(index)])
			index = index + 1
		}
	}

	newProject.BGColor = targetProject.BGColor
	newProject.IsPrivate = targetProject.IsPrivate
	newProject.BookMark = targetProject.BookMark
	newProject.Name = targetProject.Name
	newProject.RepoOwner = targetProject.RepoOwner
	newProject.RepoName = targetProject.RepoName
	newProject.Lists = newLists

	// 프로젝트 새로 생성
	err = Models.CreateProject(&newProject)

	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, newProject)
	}

}

// DeleteProjectByAuthUser 유저의 권환을 확인 후에 프로젝트를 삭제한다.
func DeleteProjectByAuthUser(c *gin.Context) {
	// 유저의 권한 확인
}
