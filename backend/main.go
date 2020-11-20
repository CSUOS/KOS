package main

import (
	"github.com/CSUOS/KOS/backend/pkg/db"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// Router 연결
	db.DBInit()
	for i := 0; i < 10; i++ {
		db.InsertTest(i)
	}
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	//Test용 ping api, get 요청을 보내면 pong을 반환
	router.Run(":3000")
	// 3000번 포트로 서버 구동
}
