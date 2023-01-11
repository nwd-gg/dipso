package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
)

func main() {
  router := gin.Default()
  router.GET("/api", getCustomResp)

  router.Run("localhost:8080")
}

func getCustomResp(c *gin.Context) {
  c.IndentedJSON(http.StatusOK, "all good, bra")
}