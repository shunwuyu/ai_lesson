package main

import "fmt"

func main() {
	// 创建一个通道，用于协程之间传递数据
	ch := make(chan int)

	go func() {

		ch <- 100 // 发送数据
	}()
	// num := <-ch 这行代码会阻塞，直到后台的协程把数据 100 发送过来，它才会继续往下执行。
	num := <-ch // 接收数据
	fmt.Println(num)
}
