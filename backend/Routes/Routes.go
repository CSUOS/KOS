package Routes

import (
	"github.com/CSUOS/KOS/backend/Controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter 경로를 정의
func SetupRouter() *gin.Engine {
	r := gin.Default()

	userRoutes := r.Group("/v1/user-api")
	{
		// 사용자의 정보를 가져온다.
		userRoutes.GET("users", Controllers.GetAllUsers)

		userRoutes.POST("user", Controllers.CreateUser)

		userRoutes.GET("user/:id", Controllers.GetUserByID)

		// 사용자의 정보를 업데이트
		userRoutes.PUT("user/:id", Controllers.UpdateUser)

		userRoutes.DELETE("user/:id", Controllers.DeleteUser)

	}

	projectRoutes := r.Group("/v1/project-api")
	{

		// 프로젝트 생성
		projectRoutes.POST("project", Controllers.CreateProject)

		// 프로젝트의 기여도를 가져온다.
		projectRoutes.GET("contribution/:id", Controllers.GetContributions)

		// 프로젝트를 카피한다.
		projectRoutes.POST("copy", Controllers.CopyProject)

		// 유저의 권한을 확인 후에 프로젝트를 삭제
		projectRoutes.DELETE("delete", Controllers.DeleteProjectByAuthUser)

		projectRoutes.GET("projects", Controllers.GetAllProjects)

		projectRoutes.GET("project/:id", Controllers.GetProjectByID)

		projectRoutes.PUT("project/:id", Controllers.UpdateProject)

		projectRoutes.DELETE("project/:id", Controllers.DeleteProject)
	}

	listRoutes := r.Group("/v1/list-api")
	{

		listRoutes.GET("lists", Controllers.GetAllLists)

		listRoutes.POST("list", Controllers.CreateList)

		// 하나의 리스트를 반환
		listRoutes.GET("list/:id", Controllers.GetListByID)

		// 리스트를 업데이트 한다.
		listRoutes.PUT("update/:id", Controllers.UpdateList)

		// 리스트를 삭제한다.
		listRoutes.DELETE("delete/:id", Controllers.DeleteList)

		// 리스트를 복사한다.
		listRoutes.POST("copy", Controllers.CopyList)

		// 리스트를 이동
		listRoutes.POST("move", Controllers.MoveList)

		// 리스트를 다른 프로젝트로 이동
		listRoutes.POST("exports", Controllers.ExportsList)
	}

	taskRoutes := r.Group("/v1/task-api")
	{

		taskRoutes.GET("tasks", Controllers.GetAllTasks)

		// 태스크 생성
		taskRoutes.POST("task", Controllers.CreateTask)

		// 태스크 이동
		taskRoutes.POST("move", Controllers.MoveTask)

		// 아이디와 매칭되는 태스크를 반환
		taskRoutes.GET("task/:id", Controllers.GetTaskByID)

		// 태스크 업데이트
		taskRoutes.PUT("task/:id", Controllers.UpdateTask)

		// 리액션 추가
		taskRoutes.PUT("reaction", Controllers.AddReaction)

		taskRoutes.DELETE("task/:id", Controllers.DeleteTask)

	}

	worksInRoutes := r.Group("/v1/works-in-api")
	{

		// 유저의 프로젝트 정보를 가져온다.
		worksInRoutes.GET("/:userID/:projectID", Controllers.GetWorksInByUserAndProjectID)

		// 유저를 프로젝트에 초대
		worksInRoutes.POST("invite", Controllers.InviteUser)

		// 프로젝트에서 나간다.
		worksInRoutes.PUT("exit", Controllers.ExitUserFromProject)

		worksInRoutes.GET("works-ins", Controllers.GetAllWorksIn)

		worksInRoutes.POST("works-in", Controllers.CreateWorksIn)

		worksInRoutes.GET("works-in/:id", Controllers.GetWorksInByID)

		worksInRoutes.PUT("works-in/:id", Controllers.UpdateWorksIn)

		worksInRoutes.DELETE("works_in/:id", Controllers.DeleteWorksIn)
	}

	return r
}