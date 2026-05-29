// 这个文件夹里的所有 .go 文件都是一伙的，它们共同组成了 routers 这个功能模块。
package routers

import (
	"chatservice/controllers"
	"github.com/gin-gonic/gin"
)
// gin web 框架的引擎 
// 大写， 公开方法
// 小写， 私有方法
func InitRouter() *gin.Engine {
	// 创建一个gin引擎
	r := gin.Default()
	// 创建一个api组 /api开始
	// {} 这完全是为了代码可读性
	api := r.Group("/api")
	{
		api.GET("/user", controllers.GetUser)
		api.POST("/user", controllers.CreateUser)
	}

	return r
}