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
		userRoutes.GET("users", Controllers.GetAllUsers)
		userRoutes.POST("user", Controllers.CreateUser)
		userRoutes.GET("user/:id", Controllers.GetUserByID)
		userRoutes.PUT("user/:id", Controllers.UpdateUser)
		userRoutes.DELETE("user/:id", Controllers.DeleteUser)
	}

	projectRoutes := r.Group("/v1/project-api")
	{
		projectRoutes.GET("projects", Controllers.GetAllProjects)
		projectRoutes.POST("project", Controllers.CreateProject)
		projectRoutes.GET("project/:id", Controllers.GetProjectByID)
		projectRoutes.PUT("project/:id", Controllers.UpdateProject)
		projectRoutes.DELETE("project/:id", Controllers.DeleteProject)
	}

	listRoutes := r.Group("/v1/list-api")
	{
		listRoutes.GET("lists", Controllers.GetAllLists)
		listRoutes.POST("list", Controllers.CreateList)
		listRoutes.GET("list/:id", Controllers.GetListByID)
		listRoutes.PUT("list/:id", Controllers.UpdateList)
		listRoutes.DELETE("list/:id", Controllers.DeleteList)
	}

	taskRoutes := r.Group("/v1/task-api")
	{
		taskRoutes.GET("tasks", Controllers.GetAllTasks)
		taskRoutes.POST("task", Controllers.CreateTask)
		taskRoutes.GET("task/:id", Controllers.GetTaskByID)
		taskRoutes.PUT("task/:id", Controllers.UpdateTask)
		taskRoutes.DELETE("task/:id", Controllers.DeleteTask)
	}

	worksInRoutes := r.Group("/v1/works-in-api")
	{
		worksInRoutes.GET("works_in", Controllers.GetAllWorksIn)
		worksInRoutes.POST("works_in", Controllers.CreateWorksIn)
		worksInRoutes.GET("works_in/:id", Controllers.GetWorksInByID)
		worksInRoutes.PUT("works_in/:id", Controllers.GetWorksInByID)
		worksInRoutes.DELETE("works_in/:id", Controllers.DeleteWorksIn)
	}

	return r
}
