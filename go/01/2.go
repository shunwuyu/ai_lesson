package main

import (
	"fmt"
)

// 定义一个普通函数，它将作为协程的任务
func sayHello() {
	fmt.Println("hello")
}

func main() {
	// 1. 启动协程
	// go 关键字告诉 Go 运行时：在后台开启一个新的轻量级线程（协程）来执行 sayHello 函数
	// 关键点：main 函数不会等待 sayHello 执行完毕，而是立即继续执行下一行代码
	// 没有后面， 不会打印
	go sayHello()

	// 2. 阻塞主协程
	// 如果没有这行代码，main 函数会瞬间执行完毕，程序退出，导致 sayHello 协程被强制终止
	// time.Sleep 让主协程“暂停” 1 秒，给 sayHello 协程留出执行的时间
	// 注意：在实际工程中，通常使用 sync.WaitGroup 或 channel 来代替 Sleep 进行同步
	// time.Sleep(time.Second)
}
