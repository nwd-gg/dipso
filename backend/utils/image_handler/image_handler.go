package image_handler

import (
	"log"
	"os"

	consts "nwd/dipso/utils/consts"

	"github.com/davidbyttow/govips/v2/vips"
)

type ImgSize[T int, U int] struct {
	Width  T
	Height U
}

func checkError(err error) {
	if err != nil {
		imageLogger("Image handler error", vips.LogLevelCritical, "An error during image processing")
		os.Exit(1)
	}
}

func imageLogger(messageDomain string, verbosity vips.LogLevel, message string) {
	var messageLevelDescription string
	switch verbosity {
	case vips.LogLevelError:
		messageLevelDescription = "error"
	case vips.LogLevelCritical:
		messageLevelDescription = "critical"
	case vips.LogLevelWarning:
		messageLevelDescription = "warning"
	case vips.LogLevelMessage:
		messageLevelDescription = "message"
	case vips.LogLevelInfo:
		messageLevelDescription = "info"
	case vips.LogLevelDebug:
		messageLevelDescription = "debug"
	}

	log.Printf("[%v.%v] %v", messageDomain, messageLevelDescription, message)
}

func InitVips() {
	vips.LoggingSettings(imageLogger, vips.LogLevelInfo)

	// Disable the cache so that after GC, libvips does not hold reference to any object
	vips.Startup(&vips.Config{
		ConcurrencyLevel: 0,
		MaxCacheFiles:    0,
		MaxCacheMem:      0,
		MaxCacheSize:     0,
		ReportLeaks:      false,
		CacheTrace:       false,
		CollectStats:     false,
	})
}

func ShutdownVips() {
	vips.Shutdown()
}

func getJpegParams() *vips.JpegExportParams {
	ep := vips.NewJpegExportParams()
	ep.StripMetadata = true
	ep.Quality = 75
	ep.Interlace = true
	ep.OptimizeCoding = true
	ep.SubsampleMode = vips.VipsForeignSubsampleAuto
	ep.TrellisQuant = true
	ep.OvershootDeringing = true
	ep.OptimizeScans = true
	ep.QuantTable = 3

	return ep
}

func HandleImage(buf []byte) []byte {
	image, err := vips.NewImageFromBuffer(buf)
	checkError(err)

	size := calculateSize(image)
	if err := image.Thumbnail(size[0], size[1], vips.InterestingAll); err != nil {
		checkError(err)
	}

	ep := getJpegParams()
	imageBytes, _, err := image.ExportJpeg(ep)
	checkError(err)

	return imageBytes
}

// note: tuple [width, height]
func calculateSize(img *vips.ImageRef) [2]int {
	var resultSize [2]int
	originSize := [...]int{img.Width(), img.Height()}

	for index, value := range originSize {
		if value < consts.MAX_IMG_PROPERTY_SIZE {
			resultSize[index] = value
		} else {
			resultSize[index] = consts.MAX_IMG_PROPERTY_SIZE
		}
	}

	return resultSize
}
