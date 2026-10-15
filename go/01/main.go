// Go 的每个源码文件开头都得声明属于哪个包 
// 这个包要单独跑成一个程序，需要 main 函数当起点。
package main
// 内置包 fmt 
import "fmt"
// func 就是用来定义函数的关键字
func main() {
	// fmt.Println("Hello Go")
	// **Go 是强类型语言，变量一旦确定类型，不能随便赋值别的类型**。
	// var name string = "Andrew"
	// name = 1
	// **`:=` 就是 var 的简写，省去写 var 和类型，专门给函数内部快速声明 + 赋值变量**。
	age := 18
	// // Go 是强类型语言，变量 age 在首次通过 :=
	// // 声明时已被推断为整型（int），因此后续不能给它赋值为字符串类型。
	// age = "19"
	// // fmt.Println(age)
	// Go 的 if 条件不用括号，是语法设计，为了代码更简洁，而且强制要求左大括号跟在同一行。
	if age >= 18 {
		fmt.Println("adult")
	}
}
