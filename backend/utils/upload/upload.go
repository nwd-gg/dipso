package upload

import (
	"bytes"
	"image"
	"image/jpeg"
	"log"
	"mime/multipart"
	"net/http"
	consts "nwd/dipso/utils/consts"
	gpt "nwd/dipso/utils/gpt"
	vision "nwd/dipso/utils/vision"
	"strings"

	"github.com/adrium/goheif"
	"github.com/gin-gonic/gin"
)

type readerWrapper struct {
	*bytes.Reader
}

func (r *readerWrapper) Close() error {
	return nil
}

func HandleFileUpload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to parse form data: " + err.Error(),
		})
		return
	}

	// validate content av
	if len(form.File["upload"]) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No file uploaded",
		})
		return
	}
	files := form.File["upload"]
	var labels []string

	for _, file := range files {
		if file.Size > consts.MAX_FILE_SIZE {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "File size exceeds the limit",
			})
			return
		}

		isValid, fileType := validateFileType(file)

		log.Println(isValid, fileType)

		if !isValid {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid file type",
			})
			return
		}
		blobFile, err := file.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to open file: " + err.Error(),
			})
			return
		}
		defer blobFile.Close()

		if fileType == "image/heic" || fileType == "image/heif" || fileType == "application/octet-stream" {
			img, err := covertHeic(blobFile)

			if err != nil {
				log.Fatalf("Failed to convert HEIC file")
				return
			}

			buf := bytes.NewBuffer(nil)
			err = jpeg.Encode(buf, img, nil)

			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to convert HEIC file: " + err.Error(),
				})
				return
			}

			reader := bytes.NewReader(buf.Bytes())
			wrappedReader := &readerWrapper{reader}
			blobFile = wrappedReader
		}

		keywords, err := vision.GetKeywords(blobFile)
		keywordsString := strings.Join(keywords, ", ")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to process file: " + err.Error(),
			})
			return
		}

		labels = append(labels, keywordsString)
	}

	story, err := gpt.GetUserRecomendation(labels, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": story,
	})
}

func validateFileType(fileHeader *multipart.FileHeader) (bool, string) {
	// more types
	validTypes := []string{
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/heif",
		"image/heic",
		"application/octet-stream",
	}

	file, err := fileHeader.Open()
	if err != nil {
		return false, ""
	}
	defer file.Close()

	// Only the first 512 bytes are used to sniff the content type.
	buffer := make([]byte, 512)
	_, err = file.Read(buffer)
	if err != nil {
		return false, ""
	}

	filetype := http.DetectContentType(buffer)
	for _, v := range validTypes {
		if v == filetype {
			return true, filetype
		}
	}
	return false, filetype
}

func covertHeic(file multipart.File) (image.Image, error) {
	img, err := goheif.Decode(file)

	if err != nil {
		log.Fatalf("Failed to parse %s: %v\n", file, err)

		return nil, err
	}

	return img, nil
}
