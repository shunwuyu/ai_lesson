# GO 入门

https://go.dev/dl/

- go version

- 2. 配置环境（通常自动）
go env

重点关注：

GOPATH（工作目录）安装的依赖包固定存放在 GOPATH/pkg/mod/
GOROOT（安装目录） 存放官方编译器和标准库；

- first demo
01/main.go
go run main.go

三、基础语法（核心够用版）
1. 变量 & 类型
var name string = "Andrew"
const (
    StatusOK = 200
    NotFound = 404
)
var 是 Go 中声明变量的关键字，用于定义一个可赋值、有类型的变量，支持指定类型或自动推导类型。
age := 18  // 推荐写法（自动推导）
短变量声明 直接声明并赋值变量，自动推导类型。
常见类型：

int
float64 64 位，精度高
var price float64 = 19.99
string 
bool

👉 类似 TS，但更强类型 + 更简单

2. if / for（重点）
if（无括号！）
if age > 18 {
    fmt.Println("adult")
}
for（Go 只有一个循环）
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

👉 没有 while，统一用 for

3. 数组 & 切片（重点）
arr := [3]int{1, 2, 3}     // 固定长度
slice := []int{1, 2, 3}    // 动态（常用）
切片（slice），不是数组，天生就是动态长度、可追加元素的。
数组是固定长度的值类型，切片是动态长度的引用类型。

追加：

slice = append(slice, 4)

👉 slice ≈ JS array（但更底层）

4. map（类似 JS object）
m := map[string]int{
    "a": 1,
    "b": 2,
}

fmt.Println(m["a"])
5. 函数
func add(a int, b int) int {
    return a + b
}

简写：

func add(a, b int) int {
    return a + b
}
6. 多返回值（Go 特色）
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("divide by zero")
    }
    return a / b, nil
}

👉 相当于 JS：

return [result, error]
四、结构体（代替 class）
type User struct {
    Name string
    Age  int
}

使用：

u := User{Name: "Andrew", Age: 18}

方法：

func (u User) sayHello() {
    fmt.Println("Hello", u.Name)
}

👉 类似 JS class，但更轻量

五、指针（必须理解）
func updateAge(age *int) {
    *age = 20
}

👉 核心理解一句话：
👉 Go 默认是值拷贝，指针用于修改原数据


六、并发（Go 核心优势🔥）
goroutine（轻量线程）
go func() {
    fmt.Println("async")
}()
channel（通信）
ch := make(chan int)

go func() {
    ch <- 1
}()

fmt.Println(<-ch)

👉 对比 JS：

goroutine ≈ async task
channel ≈ 更安全的消息队列（比 Promise 更底层）
七、包管理（类似 npm）

初始化：

go mod init demo

安装依赖：

go get github.com/gin-gonic/gin
八、实战案例（重点🔥）
案例1：HTTP 服务（类似 Node）
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World")
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}

运行：

go run main.go

访问：

http://localhost:8080

👉 对比 JS：

app.get('/', (req, res) => res.send('Hello'))
案例2：用 Gin（推荐🔥）

Gin

package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()

    r.GET("/hello", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "hello",
        })
    })

    r.Run()
}

👉 类似：

Express / Koa
案例3：读取 JSON（常用）

type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}