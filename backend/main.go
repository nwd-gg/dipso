package main

import (
  "fmt"
  "net/http"

  "github.com/gin-contrib/cors"
  "github.com/gin-gonic/gin"
)

func main() {
  router := gin.New()

  // Set a lower memory limit for multipart forms (default is 32 MiB)
  router.MaxMultipartMemory = 8 << 20  

  router.Use(gin.Logger())

  // todo auth
  config := cors.DefaultConfig()
  config.AllowOrigins = []string{"http://localhost:3000"}
  router.Use(cors.New(config))

  // Recovery middleware recovers from any panics and writes a 500 if there was one.
  router.Use(gin.Recovery())

  router.POST("/api/upload", handleFileUpload)

  router.GET("/", func(context *gin.Context) {
    context.JSON(http.StatusOK, "")
  })

  // todo: move to envs
  router.Run("localhost:8080")
}

func handleFileUpload(c *gin.Context) {
  form, err := c.MultipartForm()

  if err != nil {
    return
  }

  files := form.File["files"]

  for _, file := range files {
    fmt.Println(file.Filename)
  }

  c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
}