package vision

import (
	"context"
	"fmt"
	"io"

	vision "cloud.google.com/go/vision/apiv1"
)

func GetKeywords(file io.ReadCloser) ([]string, error) {
	ctx := context.Background()

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return nil, fmt.Errorf("Failed to create client: %v", err)
	}
	defer client.Close()

	image, err := vision.NewImageFromReader(file)
	if err != nil {
		return nil, fmt.Errorf("Failed to create image: %v", err)
	}

	labels, err := client.DetectLabels(ctx, image, nil, 10)
	if err != nil {
		return nil, fmt.Errorf("Failed to detect labels: %v", err)
	}

	var labelStrings []string
	for _, label := range labels {
		labelStrings = append(labelStrings, label.Description)
	}

	return labelStrings, nil
}
