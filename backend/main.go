package main

import (
	"net/http"
	upload "nwd/dipso/utils/upload"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	Init()
	router := gin.New()

	// Set a lower memory limit for multipart forms (default is 32 MiB)
	router.MaxMultipartMemory = 8 << 20

	router.Use(gin.Logger())

	// todo auth
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{settings.frontendUrl}

	router.Use(cors.New(config))

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	router.Use(gin.Recovery())

	router.POST("/api/upload", upload.HandleFileUpload)

	router.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, "")
	})

	err := router.Run(settings.appUrl)
	if err != nil {
		panic(err)
	}
}
