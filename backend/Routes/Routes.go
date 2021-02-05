package Routes

import (
	"github.com/CSUOS/KOS/backend/Controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter 경로를 정의
func SetupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
	config.AllowCredentials = true
	
	r.Use(cors.New(config))

	// postman 에서 계속 403 나시면 origin모두 허용하는 아래 코드 사용하세요! 
	// r.Use(cors.Default())

	userRoutes := r.Group("/v1/user-api")
	{
		// 모든 사용자의 정보를 가져온다.
		userRoutes.GET("users", Controllers.GetAllUsers)

		// 유저 생성.
		userRoutes.POST("user", Controllers.CreateUser)

		// 특정 사용자의 정보를 가져온다.
		userRoutes.GET("user", Controllers.GetUserByID)

		// 사용자의 정보를 업데이트
		userRoutes.PUT("user/:id", Controllers.UpdateUser)

		// 유저 삭제.
		userRoutes.DELETE("user/:id", Controllers.DeleteUser)

		userRoutes.POST("login", Controllers.Login)

		userRoutes.POST("logout", Controllers.Logout)
	}

	projectRoutes := r.Group("/v1/project-api")
	{

		// 프로젝트 생성
		projectRoutes.POST("project", Controllers.CreateProject)

		// 프로젝트에 연결된 GitHub 리포지토리의 브랜치 목록을 가져온다.
		projectRoutes.GET("contribution/branches", Controllers.GetBranches)

		// 특정 Github ID의, 프로젝트에 연결된 GitHub 리포지토리의 커밋 목록을 가져온다.
		projectRoutes.GET("contribution/commits/list/:id", Controllers.GetContributionsOfID)

		// 모든 멤버의, 프로젝트에 연결된 GitHub 리포지토리의 커밋 목록을 가져온다.
		projectRoutes.GET("contribution/commits/list/", Controllers.GetContributions)

		// 프로젝트에 연결된 GitHub 리포지토리의 특정 브랜치에 커밋된 커밋 수를 가져온다.
		projectRoutes.GET("contribution/commits/count", Controllers.CountCommits)

		// 프로젝트를 카피한다.
		projectRoutes.POST("copy", Controllers.CopyProject)

		// 유저의 권한을 확인 후에 프로젝트 다루기
		projectRoutes.DELETE("delete", Controllers.DeleteProjectByAuthUser)

		// 모든 프로젝트를 가져온다.
		projectRoutes.GET("projects", Controllers.GetAllProjects)

		// 아이디에 매칭되는 프로젝트 하나 반환.
		projectRoutes.GET("project/:id", Controllers.GetProjectByID)

		// 아이디에 매칭되는 프로젝트 업데이트.
		projectRoutes.PUT("project/:id", Controllers.UpdateProject)

		// 아이디에 매칭되는 프로젝트 하나 삭제.
		projectRoutes.DELETE("project/:id", Controllers.DeleteProject)
	}

	listRoutes := r.Group("/v1/list-api")
	{
		// 모든 리스트를 반환한다.
		listRoutes.GET("lists", Controllers.GetAllLists)

		// 프로젝트안에 리스트를 만든다.
		listRoutes.POST("list", Controllers.AddList)

		// 리스트 생성(테스트 API)
		// listRoutes.POST("list", Controllers.CreateList)

		// 하나의 리스트를 반환
		listRoutes.GET("list/:id", Controllers.GetListByID)

		// 리스트를 업데이트 한다.
		listRoutes.PUT("update/:id", Controllers.UpdateList)

		// 리스트를 삭제한다.
		listRoutes.DELETE("delete/:id", Controllers.DeleteList)

		// 리스트를 복사한다.
		listRoutes.PUT("copy", Controllers.CopyList)

		// 리스트를 이동
		listRoutes.PUT("move", Controllers.MoveList)

		// 리스트를 다른 프로젝트로 이동
		listRoutes.POST("exports", Controllers.ExportsList)
	}

	taskRoutes := r.Group("/v1/task-api")
	{

		// 모든 태스크들을 가져온다.(테스트 API)
		taskRoutes.GET("tasks", Controllers.GetAllTasks)

		// 리스트안에 태스크 생성
		taskRoutes.POST("task", Controllers.AddTask)

		// 태스크 생성(테스트 API)
		// taskRoutes.POST("task", Controllers.CreateTask)

		// 태스크 이동
		taskRoutes.POST("move", Controllers.MoveTask)

		// 아이디와 매칭되는 태스크를 반환
		taskRoutes.GET("task/:id", Controllers.GetTaskByID)

		// 태스크 업데이트
		taskRoutes.PUT("task/:id", Controllers.UpdateTask)

		// 리액션 추가
		taskRoutes.PUT("reaction", Controllers.AddReaction)

		// 태스크 속성 수정
		taskRoutes.PUT("modify", Controllers.ModifyTaskProp)

		// 태스크들을 일정한 순서로 가져온다.
		taskRoutes.GET("sort/:id", Controllers.GetTasksBySortedOrder)

		// 태스크 검색.
		taskRoutes.GET("search", Controllers.TasksSearch)

		// 아이디에 매칭되는 태스크 삭제.
		taskRoutes.DELETE("task/:id", Controllers.DeleteTask)

	}

	worksInRoutes := r.Group("/v1/works-in-api")
	{

		// 유저의 프로젝트 정보를 가져온다.
		worksInRoutes.GET("works-in-user", Controllers.GetWorksInByUser)
		
		// 프로젝트에 속해있는 유저들 정보를 가져온다.
		worksInRoutes.GET("works-in-project/:id", Controllers.GetWorksInByProjectID)

		// 유저를 프로젝트에 초대
		worksInRoutes.POST("invite", Controllers.InviteUser)

		// 프로젝트에서 나간다.
		worksInRoutes.POST("exit", Controllers.ExitUserFromProject)

		// 모든 프로젝트 - 유저 관계를 가져온다.
		worksInRoutes.GET("works-ins", Controllers.GetAllWorksIn)

		// 프로젝트 - 유저 관계 생성(테스트 API)
		worksInRoutes.POST("works-in", Controllers.CreateWorksIn)

		// 아이디에 매칭되는 프로젝트 - 유저 관계를 가져온다.
		worksInRoutes.GET("works-in/:id", Controllers.GetWorksInByID)

		// 프로젝트 아이디, 유저 아이디로 관계를 가져온다.
		worksInRoutes.GET("works-in/:id/:pid", Controllers.GetWorksInByBothID)

		// 프로젝트 권한 부여
		worksInRoutes.POST("works-in/setAuth", Controllers.UpdateWorksIn)

		// 프로젝트 - 유저 관계 삭제.
		worksInRoutes.DELETE("works-in/:id", Controllers.DeleteWorksIn)
	}

	return r
}
