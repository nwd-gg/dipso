package main

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/storage"
	"github.com/joho/godotenv"
)

type AppSettings struct {
	frontendUrl string
	routerPort  string
}

var settings *AppSettings
var uploader *ClientUploader

func Init() {
	godotenv.Load()
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", os.Getenv("GCS_AUTH_JSON_PATH"))

	client, err := storage.NewClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	settings = &AppSettings{
		frontendUrl: os.Getenv("FRONTEND_URL"),
		routerPort:  os.Getenv("APP_PORT"),
	}

	uploader = &ClientUploader{
		cl:         client,
		bucketName: os.Getenv("GCS_BUCKET_NAME"),
		projectID:  os.Getenv("GCS_PROJECT_ID"),
		uploadPath: "test-files/",
	}
}
