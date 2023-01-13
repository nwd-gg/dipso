package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	vision "cloud.google.com/go/vision/apiv1"
	"github.com/PullRequestInc/go-gpt3"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type GCSKey struct {
	PrivateKey  string `json:"private_key"`
	ClientEmail string `json:"client_email"`
}

type ClientUploader struct {
	cl         *storage.Client
	projectID  string
	bucketName string
	uploadPath string
}

var uploader *ClientUploader

func init() {
	godotenv.Load()
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", os.Getenv("GCS_AUTH_JSON_PATH"))

	client, err := storage.NewClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	uploader = &ClientUploader{
		cl:         client,
		bucketName: os.Getenv("GCS_BUCKET_NAME"),
		projectID:  os.Getenv("GCS_PROJECT_ID"),
		uploadPath: "test-files/",
	}
}

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
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	files := form.File["upload"]
	var result string

	for _, file := range files {
		blobFile, err := file.Open()

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		err = uploader.UploadFile(blobFile, file.Filename)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		result = handleFile(blobFile)
	}

	c.JSON(200, gin.H{
		"message": result,
	})
}

func (c *ClientUploader) UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	bucket := c.cl.Bucket(c.bucketName)
	objectPath := c.uploadPath + object
	wc := bucket.Object(objectPath).NewWriter(ctx)

	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}

	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}

func readJSON(filePath string) (GCSKey, error) {
	var key GCSKey

	// Read the key file
	keyData, err := ioutil.ReadFile(filePath)
	if err != nil {
		return key, fmt.Errorf("Failed to read key file: %v", err)
	}

	// Unmarshal the key data
	if err := json.Unmarshal(keyData, &key); err != nil {
		return key, fmt.Errorf("Failed to parse key file: %v", err)
	}

	return key, nil
}

func handleFile(file multipart.File) string {
	client, err := vision.NewImageAnnotatorClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}
	defer client.Close()

	// Read the image file into memory
	file.Seek(0, io.SeekEnd)
	fileSize, err := file.Seek(0, io.SeekCurrent)
	if err != nil {
		// handle error
	}

	_, err = file.Seek(0, io.SeekStart)
	if err != nil {
		// handle error
	}

	reader := io.NewSectionReader(file, 0, fileSize)
	image, err := vision.NewImageFromReader(reader)
	if err != nil {
		log.Fatalf("Failed to create image: %v", err)
	}

	// Perform label detection on the image
	labels, err := client.DetectLabels(context.Background(), image, nil, 10)
	if err != nil {
		log.Fatalf("Failed to detect labels: %v", err)
	}

	logos, err := client.DetectLogos(context.Background(), image, nil, 10)
	if err != nil {
		log.Fatalf("Failed to detect logos: %v", err)
	}

	keywords := []string{}
	detectionResults := append(labels, logos...)

	for _, result := range detectionResults {
		keywords = append(keywords, result.Description)
	}

	log.Println("Keywords:", keywords)

	requestText := fmt.Sprintf(
		"Could you please take keywords: %s, and highlight food or drinks that can be useful in making cocktails.", strings.Join(keywords, ", "))

	return getRespFromGhatGPT(requestText)
}

func getRespFromGhatGPT(text string) string {
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		log.Fatalln("Missing API KEY")
	}

	ctx := context.Background()
	client := gpt3.NewClient(apiKey)

	resp, err := client.Completion(ctx, gpt3.CompletionRequest{
		Prompt: []string{text},
		Echo:   false,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("LEN:", len(resp.Choices))
	// Collect the responses
	var texts []string
	for _, choice := range resp.Choices {
		texts = append(texts, choice.Text)
	}

	respText := strings.Join(texts, "")

	fmt.Print("RESP TEXT", respText)

	return respText
}
