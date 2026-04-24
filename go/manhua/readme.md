# 聊天服务

Go语言中最大的特色是并发, 接下来通过一个简单的聊天室更全面了解Go语言的并发。

## 聊天服务准备技术

- 先采用一种框架beego，beego能够快速开发API，Web服务等应用。

- WebSocket协议 底层的双工通信协议
    websocket包地址：github.com/gorilla/websocket

- mysql

## 项目初始化

1. 创建项目
mkdir chatservice
cd chatservice
go mod init chatservice
初始化项目模块，起名叫 chatservice，生成 go.mod 文件，以后导包就靠它了。
以后别的代码想引用你项目里的东西，就得用 import "chatservice/你的包路径"。

2. 安装 Gin
go get -u github.com/gin-gonic/gin
下载和安装包 
它会被下载到一个全局的缓存目录中。
-u：这是“更新”的意思。它表示不仅要下载，还要去检查有没有新版本。


## ws项目

chatservice 
go mod init chatservice
go get github.com/gin-gonic/gin
go get github.com/gorilla/websocket
go get github.com/sashabaranov/go-openai

1. main.go
2. router.go
