package main

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
	"github.com/CSUOS/KOS/backend/Models"
	"github.com/CSUOS/KOS/backend/Routes"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var err error

func main() {
	Config.DB, err = gorm.Open(mysql.Open(Config.DBURL(Config.BuildDBConfig())), &gorm.Config{})
  // 서버 실행시 kos DB가 없으면 DB 생성
  Config.DB.Exec("Create Database if not exists kos")
	Config.DB.Exec("Use kos")
	if err != nil {
		fmt.Println("Status: ", err)
	}

	allModels := []interface{}{&Models.User{}, &Models.Project{}, &Models.Task{}, &Models.List{}, &Models.WorksIn{}}

	Config.DB.AutoMigrate(allModels...)

	r := Routes.SetupRouter()

	r.Run()
}
