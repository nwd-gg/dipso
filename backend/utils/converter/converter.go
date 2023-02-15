package converter

import (
	"gopkg.in/gographics/imagick.v3/imagick"
)

func ConvertImage(inputPath, outputPath string) error {
	imagick.Initialize()
	defer imagick.Terminate()

	mw := imagick.NewMagickWand()
	defer mw.Destroy()

	err := mw.ReadImage(inputPath)
	if err != nil {
		return err
	}

	err = mw.SetFormat(outputPath)
	if err != nil {
		return err
	}

	err = mw.WriteImage(outputPath)
	if err != nil {
		return err
	}

	return nil
}

// Example how to use it
//func main() {
//	err := ConvertImage("input.jpg", "output.png")
//	if err != nil {
//		fmt.Println(err)
//	}
//}
