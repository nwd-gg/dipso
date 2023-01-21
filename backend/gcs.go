package main

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"time"

	"cloud.google.com/go/storage"
)

const (
	TIMEOUT_VALUE = 50 // sec
)

type GCSKey struct {
	PrivateKey  string `json:"private_key"`
	ClientEmail string `json:"client_email"`
}

// holds the necessary data to interact with GCS
type ClientUploader struct {
	cl         *storage.Client
	projectID  string
	bucketName string
	uploadPath string
}

// creates a new instance of ClientUploader
func NewClientUploader(projectID, bucketName, uploadPath string) (*ClientUploader, error) {
	client, err := storage.NewClient(context.Background())
	if err != nil {
		return nil, fmt.Errorf("Failed to create client: %v", err)
	}

	return &ClientUploader{
		cl:         client,
		projectID:  projectID,
		bucketName: bucketName,
		uploadPath: uploadPath,
	}, nil
}

func (c *ClientUploader) UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*TIMEOUT_VALUE)
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
