package text_handler

import (
	"net/http"
	gpt "nwd/dipso/utils/gpt"

	"github.com/gin-gonic/gin"
)

type ReqBody struct {
	Text string `json:"text"`
}

func HandleText(c *gin.Context) {
	var body ReqBody

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	story, err := gpt.GetUserRecomendation(body.Text, c)

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
