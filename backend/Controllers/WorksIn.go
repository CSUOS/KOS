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

	if err := c.BindJSON(&worksIn); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := Models.CreateWorksIn(&worksIn); err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, worksIn)
}

// GetWorksInByID 유저 - 프로젝트 관계를 works_in 아이디로 가져온다
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

// GetWorksInByUser 유저 토큰으로 유저-프로젝트들 관계를 가져온다.
func GetWorksInByUser(c *gin.Context) {
	// project 정보와 해당 유저의 auth까지 전달
	type resBody struct {
		Project []Models.Project `json:"projects"`
		AuthLVL []uint `json:"auths"`
	}

	// 로그인되어있는지 확인
	claims, err := ParseValidAuthToken(c.Request)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
	
	// 토큰으로부터 id 추출
	id := claims["id"].(string)

	// project 정보만 받아오도록 수정
	var worksIn []Models.WorksIn
	var res resBody

	if err := Models.GetWorksInByUserID(&worksIn, id); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	} else {
		for i := 0; i < len(worksIn); i++ {
			res.Project = append(res.Project, worksIn[i].Project)
			res.AuthLVL = append(res.AuthLVL, worksIn[i].AuthLVL)
		}
		c.JSON(http.StatusOK, res)
	}
}

// GetWorksInByProjectID 특정 프로젝트에 속해있는 유저를 반환한다.
func GetWorksInByProjectID(c *gin.Context) {
	// 유저 정보는 Password 빼고 보내기
	type resBody struct {
		ID    uint `json:"ID"`
		Name  string `json:"Name"`
		Icon  string `json:"Icon"`
		GitID  string `json:"GitID"`
		AuthLVL uint `json:"AuthLVL`
	}

	id := c.Params.ByName("id")
	var worksIn []Models.WorksIn
	var res []resBody

	// 우선 worksIn으로 가져오고,
	if err := Models.GetWorksInByProjectID(&worksIn, id); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	} else {
		for i := 0; i < len(worksIn); i++ {
			var tmp resBody
			tmp.ID = worksIn[i].User.ID
			tmp.Name = worksIn[i].User.Name
			tmp.Icon = worksIn[i].User.Icon
			tmp.GitID = worksIn[i].User.GitID
			tmp.AuthLVL = worksIn[i].AuthLVL
			res = append(res, tmp)
		}
		c.JSON(http.StatusOK, res)
	}
}

// UpdateWorksIn 유저 - 프로젝트 관계를 업데이트
func UpdateWorksIn(c *gin.Context) {
	// todo : 유저가 AuthLvL이 2인 유저인지 확인
	type reqBody struct {
		UserID    string `json:"UserID"`
		ProjectID string `json:"ProjectID"`
		AuthLVL   string   `json:"AuthLVL"`
	}
	var req reqBody
	var worksIn Models.WorksIn
	
	if err := c.BindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// 해당 유저와 프로젝트와의 관계 찾기
	err := Models.GetWorksInByUserNProjectID(&worksIn, req.UserID, req.ProjectID)

	if err != nil {
		c.JSON(http.StatusNotFound, req)
	}
	
	// 추출한 프로젝트 - 유저 관계를 authlvl로 update
	if err = Models.UpdateWorksIn(&worksIn, req.AuthLVL); err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, worksIn)
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

	err = Models.GetWorksInByUserNProjectID(&worksIn, req.UserID, req.ProjectID)
	if err != nil {
		err = Models.CreateWorksIn(&worksIn)
		if err != nil {
			fmt.Println(err.Error())
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, worksIn)
		}
	} else {
		// 이미 관계 존재
		c.AbortWithStatus(http.StatusMethodNotAllowed)
	}
}

// ExitUserFromProject 프로젝트에 유저 이탈
func ExitUserFromProject(c *gin.Context) {
	// pid만 받고 세션으로 처리하면 되지 않을까?

	type reqBody struct {
		UserID    string `json:"UserID"`
		ProjectID string `json:"ProjectID"`
	}

	var req reqBody

	if err := c.BindJSON(&req); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

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
