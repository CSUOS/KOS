package GitHubInteraction

import "errors"

func GetBranches(owner string, repo string) ([]string, error) {
	url := ToRequestURL("repos", owner, repo, "branches")
	res, err := GetResponse("GET", url, nil)
	if (err != nil) {
		return nil, errors.New("Failed to get a response from GitHub: " + err.Error())
	}

	result := make([]string, len(res.Body), len(res.Body))
	
	for index, branch := range res.Body {
		result[index] = branch["name"].(string)
	}

	return result, nil
}