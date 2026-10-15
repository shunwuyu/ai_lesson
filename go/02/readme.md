# Go Web 入门学习手册 —— 基于 Gin 的 Hello World

本手册以 `main.go` 为例，带你从零理解一个 Go Web 服务是如何搭建起来的。
适合已经安装好 Go 环境（本仓库使用 Go 1.26+）的初学者。

---

## 一、最终要实现的效果

启动程序后，访问 `http://localhost:8080/hello`，浏览器或 curl 会收到 JSON 响应：

```json
{"message":"hello"}
```

---

## 二、完整代码

文件：`main.go`

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello",
		})
	})
	// 默认8080
	r.Run()
}
```

---

## 三、逐行拆解

### 第 1 步：`package main`

```go
package main
```

- Go 代码以「包（package）」为单位组织。
- 包名为 `main` 的包比较特殊：它是**程序的入口**，编译后会生成可执行文件。
- 普通库文件的包名不能叫 `main`，且 `main` 包中必须有一个 `func main()` 函数。

> 规则：一个 `.go` 文件开头必须声明所属包。同一个目录下的所有 `.go` 文件必须属于同一个包。

### 第 2 步：导入依赖包

```go
import "github.com/gin-gonic/gin"
```

- `import` 引入第三方库 Gin（一个流行的 Go Web 框架）。
- 路径 `github.com/gin-gonic/gin` 对应 GitHub 上的仓库地址，Go 模块系统会据此下载代码。
- 如果引入了却没使用，Go 编译器会**直接报错**（这是和很多语言不同的严格设计）。

### 第 3 步：程序入口 `func main()`

```go
func main() {
```

- 程序从 `main` 包的 `main()` 函数开始执行。
- `func` 是声明函数的关键字，`main` 函数不接受参数、没有返回值。

### 第 4 步：创建路由引擎

```go
r := gin.Default()
```

- `gin.Default()` 创建一个 `*gin.Engine` 实例（可以理解为"Web 服务器 + 路由表"）。
- `Default()` 与 `New()` 的区别：`Default()` 自带两个常用中间件——
  - `Logger`：把每个请求打印到控制台；
  - `Recovery`：某个请求 panic 时不至于让整个进程崩溃。
- `:=` 是 Go 的短变量声明，等价于 `var r *gin.Engine = gin.Default()`，类型自动推断。

### 第 5 步：注册 GET 路由

```go
r.GET("/hello", func(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hello",
	})
})
```

拆开看：

1. `r.GET(path, handler)`：注册一条路由——当有人用 **GET** 方法访问 `/hello` 时，执行后面的处理函数。
2. 第二个参数是一个**匿名函数（闭包）**：`func(c *gin.Context) { ... }`
   - `c *gin.Context` 是 Gin 传入的"上下文"对象，封装了本次请求的一切：URL 参数、Header、请求体，以及写回响应的方法。
   - 每个请求进来都会新建一个 `Context`。
3. `c.JSON(200, ...)`：把数据序列化成 JSON 写入响应，`200` 是 HTTP 状态码。
4. `gin.H` 是 `map[string]any` 的别名，用来快速构造 JSON 对象：

```go
gin.H{"message": "hello"}  // 等价于 {"message": "hello"}
```

### 第 6 步：启动服务器

```go
// 默认8080
r.Run()
```

- `r.Run()` 内部调用 `http.ListenAndServe()`，**阻塞**在当前行，持续监听请求。
- 不传参数时默认监听 `:8080`；也可以写成 `r.Run(":9090")` 换端口。
- 程序会一直运行，直到你在终端按 `Ctrl+C` 终止。

---

## 四、如何运行

### 方式 1：直接运行（开发时常用）

```bash
cd go/02
go run main.go
```

> 注意：本目录还有一个 `main2.go`，它也声明了 `package main` 和 `func main()`。
> 如果直接执行 `go run .`，会出现 `main redeclared in this block` 编译错误——
> 同一包中不允许有两个 `main` 函数。所以这里用 `go run main.go` 只编译单个文件；
> 或者把 `main2.go` 移到独立目录。

看到类似输出即启动成功：

```
[GIN-debug] GET    /hello  --> main.func1 (2 handlers)
[GIN-debug] Listening and serving HTTP on :8080
```

### 方式 2：先编译再运行（部署时常用）

```bash
go build -o hello main.go
./hello
```

### 验证接口

新开一个终端：

```bash
curl http://localhost:8080/hello
# 输出: {"message":"hello"}
```

或直接用浏览器访问 `http://localhost:8080/hello`。

按 `Ctrl+C` 停止服务。

---

## 五、动手练习（由易到难）

### 练习 1：再加一条路由

在 `r.Run()` 之前添加：

```go
r.GET("/world", func(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "world",
	})
})
```

用 curl 访问 `/world` 验证。

### 练习 2：路径参数

```go
r.GET("/user/:name", func(c *gin.Context) {
	name := c.Param("name")
	c.JSON(200, gin.H{"hello": name})
})
```

访问 `/user/tom` 得到 `{"hello":"tom"}`。

### 练习 3：查询参数

```go
r.GET("/search", func(c *gin.Context) {
	kw := c.Query("kw") // ?kw=go
	c.JSON(200, gin.H{"keyword": kw})
})
```

访问 `/search?kw=gin`。

### 练习 4：接收 POST JSON

```go
r.POST("/echo", func(c *gin.Context) {
	var body map[string]any
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, body)
})
```

```bash
curl -X POST http://localhost:8080/echo \
  -H "Content-Type: application/json" \
  -d '{"a":1}'
```

### 练习 5：换端口

把 `r.Run()` 改成 `r.Run(":9090")`，再用 curl 验证。

---

## 六、对比：标准库写法（main2.go）

`main2.go` 用 Go 内置的 `net/http` 实现了同样的事：

```go
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
```

| 对比项 | net/http（main2.go） | Gin（main.go） |
|---|---|---|
| 依赖 | 标准库，无需安装 | 第三方库 |
| 路由 | 只支持简单路径匹配 | 支持 `/user/:name`、分组、方法路由 |
| 参数获取 | 手动解析 `r.URL.Query()` | `c.Param()` / `c.Query()` 一行搞定 |
| JSON 响应 | 手动 `json.NewEncoder(w).Encode()` | `c.JSON(200, data)` |
| 中间件 | 自己封装 | 内置 Logger/Recovery，生态丰富 |

**结论**：学习阶段理解 `net/http` 的原理很重要，实际开发用 Gin 这类框架效率更高。

运行 main2.go：`go run main2.go`，访问 `http://localhost:8080/`。

---

## 七、go.mod 是什么

本目录的 `go.mod` 声明了模块信息：

```
module demo

go 1.26.2

require github.com/gin-gonic/gin v1.12.0
```

- `module demo`：模块名。导入本模块内的包时以它开头。
- `go 1.26.2`：所需的最低 Go 版本。
- `require`：项目依赖及其版本，`go.sum` 记录校验哈希。
- 常用命令：
  - `go mod tidy`：自动添加缺失依赖、移除未使用的依赖（每次改完 import 都可以跑一下）。
  - `go mod download`：下载依赖到本地缓存。

> 提示：`go mod tidy` 后 gin 会从 `// indirect` 变为直接依赖，这是正常的。

---

## 八、常见问题

1. **`import "github.com/gin-gonic/gin" ... could not be read`**
   依赖没有下载。在项目目录执行 `go mod tidy`。
2. **`main redeclared in this block`**
   同一目录有两个带 `func main()` 的文件（`main.go` 和 `main2.go`）。用 `go run main.go` 指定单文件，或把示例拆到不同目录。
3. **`address already in use`**
   8080 端口被占用。换端口 `r.Run(":9090")`，或找到占用进程：`lsof -i :8080`。
4. **下载依赖超时（国内网络）**
   设置代理镜像：
   ```bash
   go env -w GOPROXY=https://goproxy.cn,direct
   ```
5. **浏览器访问 `/hello` 显示乱码或空白？**
   确认服务已启动、端口正确；JSON 接口建议用 curl 验证。

---

## 九、下一步学习方向

- Gin 中间件：自定义 `r.Use(...)`，理解请求生命周期
- 参数校验：`binding` 标签 + `ShouldBind` 结构体绑定
- 分组路由：`r.Group("/api")`
- 工程结构：handler / service / repository 分层
- 数据持久化：结合数据库（如 MongoDB，本仓库已引入 mongo-driver）
- 部署：`go build` 交叉编译（`GOOS=linux GOARCH=amd64 go build`）+ Docker
