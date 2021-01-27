package Models

import (
	"gorm.io/gorm"
	"gorm.io/datatypes"
)

// Task 태스크에 관한 스키마
type Task struct {
	gorm.Model // 모델에는 아이디랑 생성, 수정, 삭제 날짜가 기본적으로 포함.
	Name       string
	ListID     uint // ListModel의 아이디를 가리킨다.
	Rank	   uint	// list 내의 index
	Attribute  datatypes.JSON // 태스크 속성
	/* 아래가 기본 틀
	{
        "type" : [{
			"key" : "제목",
			"value" : [
				[true, "check1"],
				[false, "check2"]
			]
		}]
    }
	*/
	Reactions  datatypes.JSON // 리액션
	/* 아래가 기본 틀
	[{
		"emojiname" : ["user1", "user2"] 
    }]
	*/
}
