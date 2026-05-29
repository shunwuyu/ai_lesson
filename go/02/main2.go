package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// fmt.Fprintf 的作用是将格式化后的文本写入到指定
	// 的输出流（如文件、网络连接或标准输出）中。
	fmt.Fprintf(w, "Hello World")
}

func main() {
	http.HandleFunc("/", handler)
	// ListenAndServe 启动 HTTP 服务器，监听指定地址和端口，
	http.ListenAndServe(":8080", nil)
}
