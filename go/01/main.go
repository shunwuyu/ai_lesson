package main

import "fmt"

func main() {
	fmt.Println("Hello Go")
	// var name string = "Andrew"
	// name = 1
	age := 18
	// Go 是强类型语言，变量 age 在首次通过 :=
	// 声明时已被推断为整型（int），因此后续不能给它赋值为字符串类型。
	// age = "19"
	// fmt.Println(age)
	if age >= 18 {
		fmt.Println("adult")
	}
}
