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
    // nil 代表空值
    return a / b, nil
}

👉 相当于 JS：

return [result, error]
四、结构体（代替 class）
Go 无 class，用 struct 替代
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
Go 指针是存储变量内存地址的安全变量，支持获取地址，但禁止指针运算。

六、 goroutine（协程）
可以理解为：“同时做多件事的能力”
如果说线程是操作系统眼中CPU调度的最小单元，那么协程就是用户态下程序自主调度的最小执行单元。

go xxx() = 开启一个协程
不写 go → 同步执行
写了 go → 并发执行 

线程 (Thread) 就像一位厨师。雇佣一位新厨师（创建线程）成本很高，而且厨房空间有限，能容纳的厨师数量是有限的。
协程 (Coroutine) 就像厨师手里要做的一道道菜。

没有协程（同步阻塞）
一位厨师一次只做一道菜。如果这道菜需要炖煮20分钟，厨师就会傻站在锅边干等，什么事也干不了，非常浪费时间。

使用协程（异步非阻塞）
一位厨师可以同时照看好几道菜（多个协程）。
他先把“红烧肉”下锅炖上（启动协程1）。
在等待红烧肉炖煮的间隙（协程1挂起/阻塞），他不会闲着，而是转身去切“土豆丝”（切换到协程2）。
切完土豆丝，他又去给“清蒸鱼”调味（切换到协程3）。
等红烧肉炖好了（协程1恢复），他再回来出锅。

Promise 是异步， 不是真正的并发， 协程是真正的并发，用于高并发调度。
吊打java 

package main

import (
	"fmt" 
	"time"
)

func sayHello() {
	fmt.Println("hello")
}

func main() {
	go sayHello() // 开启一个协程
	time.Sleep(time.Second) // 等一会，不然程序直接结束
}

channel（通道）是什么？
可以理解为：协程之间传数据的管道

3.go

七、包管理（类似 npm）

初始化：
在当前目录下创建一个名为 go.mod 的依赖管理文件，将该项目初始化为一个名为 demo 的独立 Go 模块。

go mod init demo

安装依赖：

go get github.com/gin-gonic/gin

Gin 是一个基于 Go 语言的高性能、轻量级 HTTP Web 框架，以其极快的路由速度和简洁易用的 API 设计而著称，非常适合构建高并发的 RESTful 服务。
相当于express

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

