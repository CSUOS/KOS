package GitHubInteraction

import (
	"errors"
	"fmt"
	"strings"
	"time"
)

type Commit struct {
	Message string	`json:"message"`
	Date time.Time	`json:"date"`
	Author string	`json:"author"`
}

func GetCommits(owner string, repo string, branch string, perPage int, page int) ([]Commit, error) {
	url := ToRequestURL("repos", owner, repo, "commits")
	params := map[string]string{
        "sha": branch,
        "page": fmt.Sprint(page),
        "per_page": fmt.Sprint(perPage),
	}
	
	res, err := GetResponse("GET", url, params)
	if (err != nil) {
		return nil, errors.New("Failed to get a response from GitHub: " + err.Error())
	}

	result := make([]Commit, len(res.Body), len(res.Body))

	for index, history := range res.Body {
		commit := history["commit"].(map[string]interface{})

		author := commit["author"].(map[string]interface{})
		result[index].Author = author["name"].(string)

		dateStr := author["date"].(string)
		result[index].Date, err = time.Parse(time.RFC3339, dateStr)
		if (err != nil) {
			return nil, errors.New("Failed to parse a date of a commit: " + err.Error())
		}

		message := commit["message"].(string)
		result[index].Message = message
	}

	return result, nil
}

func getHashOfLatestCommit(owner string, repo string, branch string) (*string, error) {
	url := ToRequestURL("repos", owner, repo, "commits")
	params := map[string]string{
        "sha": branch,
        "page": "1",
        "per_page": "1",
    }
	res, err := GetResponse("GET", url, params)
	if (err != nil) {
		return nil, errors.New("Failed to get a response from GitHub: " + err.Error())
	}

	hashOfCommit := res.Body[0]["sha"].(string)
	return &hashOfCommit, nil
}

func getHashOfOldestCommit(owner string, repo string, branch string) (*string, error) {
	url := ToRequestURL("repos", owner, repo, "commits")
	params := map[string]string{
        "sha": branch,
        "page": "1",
        "per_page": "1",
	}
	
	res, err := GetResponse("GET", url, params)
	if (err != nil) {
		return nil, errors.New("Failed to get a response from GitHub: " + err.Error())
	}

	if links, exist := res.Header["Link"]; exist {
		lastLinks := links[len(links) - 1]
		apiCallForLast := lastLinks[strings.LastIndex(lastLinks, "<") + 1:strings.LastIndex(lastLinks, ">")]
		res, err = GetResponse("GET", apiCallForLast, nil)
		if (err != nil) {
			return nil, errors.New("Failed to get a response from GitHub: " + err.Error())
		}	
	}

	hashOfString := res.Body[len(res.Body) - 1]["sha"].(string)
	return &hashOfString, nil
}

func CountAllCommits(owner string, repo string, branch string) (*int, error) {
	oldest, err := getHashOfOldestCommit(owner, repo, branch)
	if (err != nil) {
		return nil, errors.New("Failed to find the oldest commit: " + err.Error())
	}

	latest, err := getHashOfLatestCommit(owner, repo, branch)
	if (err != nil) {
		return nil, errors.New("Failed to find the latest commit: " + err.Error())
	}

	url := ToRequestURL("repos", owner, repo, "compare", *oldest + "..." + *latest)
	res, err := GetResponse("GET", url, nil)
	if (err != nil) {
		return nil, errors.New("Failed to compare between commits: " + err.Error())
	}

	count := int(res.Body[0]["total_commits"].(float64) + 1)
	return &count, nil
}