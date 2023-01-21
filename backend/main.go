package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const (
	MAX_FILE_SIZE        = 10 * 1024 * 1024 // 10 MB
	PROMTS_FOLDER_PATH   = "./gpt_prompts/"
	KEYWORDS_PROMPT_PATH = PROMTS_FOLDER_PATH + "keywords.txt"
	RECIPES_PROMPT_PATH  = PROMTS_FOLDER_PATH + "recipes.txt"
	STORY_PROMPT_PATH    = PROMTS_FOLDER_PATH + "recommendation.txt"
)

type GCSKey struct {
	PrivateKey  string `json:"private_key"`
	ClientEmail string `json:"client_email"`
}

type PromptData struct {
	Value string
	Name  string
	Text  string
}

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

	router.POST("/api/upload", handleFileUpload)

	router.GET("/", func(context *gin.Context) {
		context.JSON(http.StatusOK, "")
	})

	router.Run(settings.routerPort)
}

func handleError(err error, c *gin.Context) bool {
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return true
	}
	return false
}
