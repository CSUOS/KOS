package db

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

var dbName = "testABC"

func DBInit() {
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/")

	if err != nil {
		fmt.Println(err.Error())
	}

	defer conn.Close()

	// DB 생성
	_, err = conn.Exec("create database if not exists " + dbName)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Successfully created databse..")
	}

	// DB 선택
	_, err = conn.Exec("Use " + dbName)
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("DB selected successfully..")
	}

	// 테이블 생성
	_, err = conn.Exec("CREATE Table if not exists test(test int(11), primary key (test))")
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Table created successfully..")
	}

}

func InsertTest(i int) {
	conn, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:3306)/"+dbName)
	defer conn.Close()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	conn.SetConnMaxLifetime(30 * time.Minute)

	_, err = conn.Exec("insert into test values (?);", i)
	if err != nil {
		fmt.Println(err)
	}
}
