package main

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"

	"github.com/PullRequestInc/go-gpt3"
	"github.com/gin-gonic/gin"
)

func getRespFromGhatGPT(text string) (string, error) {
	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("missing API_KEY")
	}

	ctx := context.Background()
	client := gpt3.NewClient(apiKey)
	defer func() {
		client = nil
	}()

	resp, err := client.CompletionWithEngine(ctx, gpt3.TextDavinci003Engine, gpt3.CompletionRequest{
		Prompt:           []string{text},
		Echo:             false,
		MaxTokens:        gpt3.IntPtr(420),
		Temperature:      gpt3.Float32Ptr(0),
		TopP:             gpt3.Float32Ptr(0),
		FrequencyPenalty: 0.0,
		PresencePenalty:  0.0,
	})
	if err != nil {
		return "", fmt.Errorf("Failed to complete text: %v", err)
	}

	// Collect the responses
	var texts []string
	for _, choice := range resp.Choices {
		texts = append(texts, choice.Text)
	}
	respText := strings.Join(texts, "")
	if len(respText) == 0 {
		return "", fmt.Errorf("empty response")
	}
	return respText, nil
}

func getKeywordsFromLabels(input []string) (string, error) {
	templateData := &PromptData{
		Value: strings.Join(input, ", "),
		Name:  "keysPrompt",
		Text:  getPromptTextFromFile(KEYWORDS_PROMPT_PATH),
	}
	return generatePrompt(templateData)
}

func getRecipes(input string) (string, error) {
	templateData := &PromptData{
		Value: input,
		Name:  "recipePrompt",
		Text:  getPromptTextFromFile(RECIPES_PROMPT_PATH),
	}
	return generatePrompt(templateData)
}

func getStory(input string) (string, error) {
	templateData := &PromptData{
		Value: input,
		Name:  "storyPrompt",
		Text:  getPromptTextFromFile(STORY_PROMPT_PATH),
	}

	return generatePrompt(templateData)
}

func generatePrompt(templateData *PromptData) (string, error) {
	if templateData.Value == "" || templateData.Name == "" || templateData.Text == "" {
		return "", fmt.Errorf("template data is missing one or more fields")
	}
	template, err := createTemplate(templateData.Name, templateData.Text)
	if err != nil {
		log.Fatalf("Failed to create template: %v", err)
	}
	prompt := createPrompt(template, templateData)
	return getRespFromGhatGPT(prompt)
}

func getUserRecomendation(labels []string, c *gin.Context) (string, error) {
	validKeywords, err := getKeywordsFromLabels(labels)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return "", err
	}
	recipes, err := getRecipes(validKeywords)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return "", err
	}

	story, err := getStory(recipes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return "", err
	}
	return story, nil
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
		return nil, errors.New("Name and Text can not be empty")
	}

	tmpl, err := template.New(name).Parse(t)
	if err != nil {
		return nil, err
	}
	return tmpl, nil
}

func getPromptTextFromFile(filename string) string {
	path := "./prompts/" + filename

	data, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	// Convert the bytes to a string
	return string(data)
}
