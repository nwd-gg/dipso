package main

import (
	"flag"
	"fmt"

	"gopkg.in/gographics/imagick.v3/imagick"
)

var (
	tmpFolder = flag.String("i", "./tmp", "temporary folder for images")
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
func main() {
	err := ConvertImage("input.jpg", "output.jpg")
	if err != nil {
		fmt.Println(err)
	}
}
