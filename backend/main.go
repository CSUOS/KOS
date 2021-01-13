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
	if err != nil {
		fmt.Println("Status: ", err)
	}

	allModels := []interface{}{&Models.User{}, &Models.Project{}, &Models.Task{}, &Models.List{}, &Models.WorksIn{}}

	Config.DB.AutoMigrate(allModels...)

	r := Routes.SetupRouter()

	r.Run()
}
