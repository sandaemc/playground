package main

import "fmt"
import "encoding/json"
import "io/ioutil"
import "os"
import "os/exec"

func check(e error) {
    if e != nil {
        panic(e)
    }
}

type Repos struct {
    Repos []Repo `json:"repos"`
}

type Repo struct {
    Name string `json:"name"`
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

    for _, repo := range repos.Repos {
        if _, err := os.Stat(repo.Name); os.IsNotExist(err) {
            fmt.Println(fmt.Sprintf("Cloning %s...", repo.Name))

            cmd := exec.Command("git", "clone", repo.Url, repo.Name)
            err := cmd.Run()
            if err != nil {
                fmt.Println(err)
            }
        }
    }
}
