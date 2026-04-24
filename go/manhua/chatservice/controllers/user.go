package controllers

import (
	"chatservice/services"
	// http 模块
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	user := services.GetUser()

	// http.StatusOK 200
	// gin.H 是gin框架的json响应体， 类型申明
	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}
// * 确实代表指针
// c 的参数，它是一个指向 gin.Context 结构体的指针。
func CreateUser(c *gin.Context) {
	// 申明一个结构体， 用于接收请求体
	// Name -> name
	var req struct {
		Name string `json:"name"`
	}
	// 尝试把前端发来的 JSON 数据填入 req 变量，如果填的过程中出错了（比如格式不对、缺字段），
	// 就立刻告诉前端‘你发错了’，并停止后续操作
	if err := c.ShouldBindJSON(&req); err != nil {
		// StatusBadRequest
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	user := services.CreateUser(req.Name)

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}