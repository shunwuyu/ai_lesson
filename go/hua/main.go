package main

import (
	"fmt"
	"time"
)

// js 是弱类型， 变量类型由值决定（动态）。
// go 是强类型语言， 变量类型由声明时指定（静态）。
// Go 没有 class 关键字，用结构体 + 方法实现面向对象
// type 定义一个新的数据类型
// struct 定义一个结构体类型
type Person struct {
	// 大写 公有属性
	// 小写 私有属性
	Name     string // 姓名 字符串类型
	Age      int    // 年龄 整数类型
	Hometown string // 家乡
	// 切片就是Go 里能变长、可动态扩容的数组。
	// Go 数组长度固定死，不能改 连续内存，提前分配好内存空间。
	Hobbies  []string // 爱好 切片（相当于 JS 数组）
	IsSingle bool     // 是否单身
	Sex      string   // 性别
	XQ       int      // 心情值
}

// 二、给 Person 定义一个方法：送花（相当于 JS 对象里的 sendFlower）
// p *Person 表示方法属于 Person 类型 dai 是方法调用者，
// 大写 公有方法
// target *Person 表示接收花的人 是参数
// * 代表指针
func (p *Person) SendFlower(target *Person) {
	// 调用接收花的人的方法
	target.ReceiveFlower(p)
}

// 方法：收花（根据名字自动区分 小美 / 小红 逻辑）
// (receiver *Person) 表示方法属于 Person 类型 receiver 是方法调用者，
func (receiver *Person) ReceiveFlower(sender *Person) {
	// 如果是小红，走代理逻辑（延时帮小美加心情）
	if receiver.Name == "小红" {
		// 2秒后执行
		// time.AfterFunc 是 Go 标准库中的一个函数，用于在指定时间后执行一个函数。
		time.AfterFunc(2*time.Second, func() {
			xm.XQ = 99               // 修改小美的心情
			xm.ReceiveFlower(sender) // 让小美正式收花
		})
		return
	}

	// 如果是小美，走自己的收花逻辑
	if receiver.Name == "小美" {
		if receiver.XQ < 80 {
			fmt.Println("gun～～～")
		} else {
			fmt.Println(sender.Name + "送了花, 万达走一波")
		}
	}
}

var xm *Person

func main() {
	// 1. 创建 戴佑圣
	// & 代表取地址
	// &结构体{} = 创建实例 + 拿到指针
	dai := &Person{
		Name:     "戴佑圣",
		Age:      17,
		Hometown: "吉安",
		Hobbies:  []string{"学习", "搞钱"},
		IsSingle: true,
		Sex:      "男",
		XQ:       90,
	}

	// 2. 创建 小美
	xm = &Person{
		Name:     "小美",
		Age:      19,
		Hometown: "九江",
		Sex:      "女",
		XQ:       50, // 初始心情50
	}

	// 3. 创建 小红
	xh := &Person{
		Name:     "小红",
		Hometown: "吉安",
	}

	fmt.Println("戴佑圣开始送花...")
	dai.SendFlower(xh) // 传给小红，小红自动代理

	// 等待延时执行完
	// 不加这句，程序会直接退出，延时 2 秒的送花逻辑根本来不及执行！
	time.Sleep(3 * time.Second)
	fmt.Println("程序结束")
}
