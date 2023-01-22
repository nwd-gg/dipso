package main

import (
	"log"
	gcs "nwd/dipso/utils/gcs"
	"os"

	"github.com/joho/godotenv"
)

type AppSettings struct {
	frontendUrl string
	appUrl      string
}

var settings *AppSettings
var uploader *gcs.ClientUploader

func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load ENV: %v", err)
	}

	err = os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", os.Getenv("GCS_AUTH_JSON_PATH"))
	if err != nil {
		log.Fatal("Failed to set ENV: %v", err)
	}

	settings = &AppSettings{
		frontendUrl: os.Getenv("FRONTEND_URL"),
		appUrl:      os.Getenv("APP_URL"),
	}

	uploader, err = gcs.NewClientUploader(os.Getenv("GCS_PROJECT_ID"), os.Getenv("GCS_BUCKET_NAME"), "test-files/")
	if err != nil {
		log.Fatal("Failed to create client: %v", err)
	}
}
