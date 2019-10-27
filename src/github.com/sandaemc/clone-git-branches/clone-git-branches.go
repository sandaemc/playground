package main

import "fmt"
import "encoding/json"
import "io/ioutil"
import "os"
import "os/exec"
import "strings"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

type Repos struct {
    Repos []Repo `json:"repos"`
}

type Repo struct {
    Url string `json:"url"`
}

func main() {

    jsonFile, err := os.Open(".config.json")
    if err != nil {
        fmt.Println(err)
    }

    defer jsonFile.Close()

    var repos Repos

    byteValue, _ := ioutil.ReadAll(jsonFile)
    json.Unmarshal(byteValue, &repos)

    dir, err := os.Getwd()
    if err != nil {
        fmt.Println(err)
    }

    for _, repo := range repos.Repos {
        slices := strings.Split(repo.Url, "/")
        repoName := slices[1]

        if _, err := os.Stat(repoName); os.IsNotExist(err) {
            fmt.Println(fmt.Sprintf("Cloning %s...", repoName))

            uri := fmt.Sprintf("git@github.com:%s.git", repo.Url)

            cmd := exec.Command("git", "clone", uri)
            err := cmd.Run()
            if err != nil {
                fmt.Println(err)
            }
        }
    }
}
