package gpt

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	consts "nwd/dipso/utils/consts"
	"os"
	"strings"
	"text/template"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
)

type PromptData struct {
	Value string
	Name  string
	Text  string
}

func GetUserRecomendation(labels string, c *gin.Context) (string, error) {
	prompt, err := CreateGuidePrompt(labels)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return "", err
	}

	guide, err := GetRespFromGhatGPT(prompt)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return "", err
	}

	return guide, nil
}

func ClassifyLabelsPrompt(input string) (string, error) {
	templateData := &PromptData{
		Value: input,
		Name:  "keysPrompt",
		Text:  getPromptTextFromFile(consts.CLASSIFY_PROMPT_PATH),
	}

	return generatePrompt(templateData)
}

func CreateGuidePrompt(input string) (string, error) {
	templateData := &PromptData{
		Value: input,
		Name:  "guidePrompt",
		Text:  getPromptTextFromFile(consts.GUIDE_PROMPT_PATH),
	}

	return generatePrompt(templateData)
}

func GetRespFromGhatGPT(text string) (string, error) {
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("missing API_KEY")
	}

	client := openai.NewClient(apiKey)
	defer func() {
		client = nil
	}()

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:       openai.GPT3Dot5Turbo,
			Temperature: 0,
			MaxTokens:   666,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: text,
				},
			},
		},
	)

	if err != nil {
		return "", fmt.Errorf("failed to complete text: %v", err)
	}

	respText := resp.Choices[0].Message.Content
	return respText, nil
}

func generatePrompt(templateData *PromptData) (string, error) {
	if templateData.Value == "" || templateData.Name == "" || templateData.Text == "" {
		return "", fmt.Errorf("template data is missing one or more fields")
	}

	template, err := createTemplate(templateData.Name, templateData.Text)

	if err != nil {
		return "", fmt.Errorf("failed to create template: %v", err)
	}

	prompt := createPrompt(template, templateData)

	return prompt, nil
}

func createPrompt(t *template.Template, data interface{}) string {
	var prompt strings.Builder
	err := t.Execute(&prompt, data)
	if err != nil {
		log.Fatalln(err)
	}
	return prompt.String()
}

func createTemplate(name string, t string) (*template.Template, error) {
	if name == "" || t == "" {
		return nil, errors.New("name and text can not be empty")
	}

	tmpl, err := template.New(name).Parse(t)
	if err != nil {
		return nil, err
	}
	return tmpl, nil
}

func getPromptTextFromFile(path string) string {
	data, err := os.ReadFile(path)
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	// Convert the bytes to a string
	return string(data)
}
