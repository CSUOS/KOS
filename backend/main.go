package main

import (
	"fmt"

	"github.com/CSUOS/KOS/backend/Config"
	"github.com/CSUOS/KOS/backend/Models"
	"github.com/CSUOS/KOS/backend/Routes"
	"github.com/jinzhu/gorm"
)

var err error

func main() {
	Config.DB, err = gorm.Open("mysql", Config.DBURL(Config.BuildDBConfig()))

	if err != nil {
		fmt.Println("Status: ", err)
	}

	defer Config.DB.Close()

	allModels := []interface{}{&Models.User{}, &Models.Project{}, &Models.Task{}, &Models.List{}, &Models.WorksIn{}}

	Config.DB.AutoMigrate(allModels...)

	r := Routes.SetupRouter()

	r.Run()
}
