package GitHubInteraction

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
)

const URL = "https://api.github.com/"

type ProcessedResponse struct {
	Header 	map[string][]string
	Body	[]map[string]interface{}
}

func ToRequestURL(path ...string) string {
	return URL + strings.Join(path, "/")
}

func GetResponse(method string, reqUrl string, params map[string]string) (*ProcessedResponse, error) {
	req, err := http.NewRequest(method, reqUrl, nil)
	if (err != nil) {
		return nil, err
	}

	q := req.URL.Query()
	q.Add("accept", "application/vnd.github.v3+json")
	for key, value := range params {
		q.Add(key, value)
	}
	req.URL.RawQuery = q.Encode()

	res, err := http.DefaultClient.Do(req)
	resBody, _ := ioutil.ReadAll(res.Body)
	if (err != nil) {
		return nil, err
	}

	res.Body.Close()

	bodyString := string(resBody)
	if bodyString[0] != '[' {
		bodyString = "[" + bodyString + "]"
	}
	
	var parsed []map[string]interface{}
	json.Unmarshal([]byte(bodyString), &parsed)
	
	return &ProcessedResponse { res.Header, parsed }, nil
}