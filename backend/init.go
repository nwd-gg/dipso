package main

import (
	"log"
	gcs "nwd/dipso/utils/gcs"
	"os"

	"nwd/dipso/utils/image_handler"

	"github.com/joho/godotenv"
)

type AppSettings struct {
	frontendUrl string
	appUrl      string
}

var settings *AppSettings

func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Failed to load ENV: %v", err)
	}

	err = os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", os.Getenv("GCS_AUTH_JSON_PATH"))
	if err != nil {
		log.Fatalf("Failed to set ENV: %v", err)
	}

	settings = &AppSettings{
		frontendUrl: os.Getenv("FRONTEND_URL"),
		appUrl:      os.Getenv("APP_URL"),
	}

	_, err = gcs.NewClientUploader(os.Getenv("GCS_PROJECT_ID"), os.Getenv("GCS_BUCKET_NAME"), "test-files/")
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	// todo: shutdown vips
	image_handler.InitVips()
}
