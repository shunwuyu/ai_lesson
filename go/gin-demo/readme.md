1. 创建项目文件夹，并进入目录
mkdir gin-demo
cd gin-demo

2. 初始化 go module（生成 go.mod）
go mod init gin-demo

3. 拉取 gin 依赖
go env -w GOPROXY=https://goproxy.cn,direct
七牛
go get github.com/gin-gonic/gin

4. go run main.go
