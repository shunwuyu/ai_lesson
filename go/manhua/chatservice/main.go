package main

import (
	// 导入路由
	"chatservice/routers"
)

func main() {
	r := routers.InitRouter()
	r.Run(":8080") // 启动服务
}