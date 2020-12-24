package db
 
import (
    "testing"
)
 
func TestMain(t *testing.T) {
	DBInit()
	if InsertTest(1){
		t.Error("db insert failed")
	}
	// db가 서버에 있지 않아서 오류남 (아직 불가)
}