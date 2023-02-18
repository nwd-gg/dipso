package vision

import (
	"context"
	"fmt"

	visionpb "cloud.google.com/go/vision/v2/apiv1p1beta1/visionpb"
	"github.com/google/martian/v3/log"
	grpc "google.golang.org/grpc"
)

var annotatorServer visionpb.ImageAnnotatorServer

type ImageRequest struct {
	req visionpb.AnnotateImageRequest
}
type BatchImagesRequest struct {
	requests visionpb.BatchAnnotateImagesRequest
}

func (b *BatchImagesRequest) AddImageRequest(req *ImageRequest) {
	b.requests.Requests = append(b.requests.Requests, &req.req)
}

func NewImageRequest() *ImageRequest {
	return &ImageRequest{}
}

func (i *ImageRequest) SetImageFromUrl(url string) {
	i.req.Image = &visionpb.Image{
		Source: &visionpb.ImageSource{
			ImageUri: url,
		},
	}
}

func RunDetection() {
	ctx := context.Background()
	butchOfRequests := &BatchImagesRequest{}
	resp, err := annotatorServer.BatchAnnotateImages(ctx, &butchOfRequests.requests)

	if err != nil {
		log.Errorf("Failed to run image detection: %v", err)
	}

	fmt.Print("RESP:", resp)
}

func GetClient() visionpb.ImageAnnotatorClient {
	var cc grpc.ClientConnInterface
	client := visionpb.NewImageAnnotatorClient(cc)
	return client
}

// func GetKeywords(file io.ReadCloser) ([]string, error) {
// 	client := getClient()
// 	ctx := context.Background()
// 	batch := &BatchImagesRequest{
// 		batch: BatchAnnotateImagesRequest,
// 	}

// 	resp, err := client.BatchAnnotateImages(ctx, in)

// 	if err != nil {
// 		return nil, fmt.Errorf("Failed to create image: %v", err)
// 	}

// 	labels, err := client.DetectLabels(ctx, image, nil, 10)
// 	if err != nil {
// 		return nil, fmt.Errorf("Failed to detect labels: %v", err)
// 	}

// 	var labelStrings []string
// 	for _, label := range labels {
// 		labelStrings = append(labelStrings, label.Description)
// 	}

// 	return labelStrings, nil
// }
