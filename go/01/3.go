package main

import "fmt"

func main() {
	// 创建一个通道，用于协程之间传递数据
	ch := make(chan int)
	// 匿名函数， 立即启用一个协程
	go func() {
		ch <- 100 // 向通道ch发送数据
	}()
	// num := <-ch 这行代码会阻塞，直到后台的协程把数据 100 发送过来，它才会继续往下执行。
	// 无数据可读时，通道接收操作就卡住，等别的协程往通道发数据才继续。
	num := <-ch // 接收数据
	fmt.Println(num)
}
