package Config

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// DB
var DB *gorm.DB

// DBConfig DB 정보를 위한 구조체
type DBConfig struct {
	Host     string // 호스트 이름 ex) localhost
	Port     int    // 포트 번호 ex) 3306
	User     string // 사용자 이름 ex) root
	DBName   string // DB 스키마 이름 ex)hello
	Password string // 비밀 번호
}

// BuildDBConfig 설정에 따른 DB 설정 구조체 반환
func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "localhost",
		Port:     3306,
		User:     "root",
		Password: "admin",
	}

	return &dbConfig
}

// DBURL DB에 연결하는 URL 생성 후 반환
func DBURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}
