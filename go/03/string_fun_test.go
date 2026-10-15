//是这个文件所属的包名
package string_test

import (
	"strconv" // 字符串转换为整数
	// "strings" // 字符串操作
	"testing" // 测试框架
)
// `go test` 会自动扫描包内所有以`Test` 开头
// 测试框架递给你一个"记分员"对象（的指针），你拿它记日志、报失败。
// func TestStringFn(t *testing.T) {
// 	s := "A,B,C" // 定义一个字符串
// 	// 返回的是 `[]string`（字符串切片）
// 	// Go 用首字母大小写代替 public/private 关键字
// 	parts := strings.Split(s, ",") // 使用逗号分隔字符串
// 	// 下标， 元素， 下标不要
// 	for _, part := range parts {
// 		t.Log(part)
// 	}
// 	t.Log(strings.Join(parts, "-"))
// }

// TestConv 是单元测试函数，测试strconv包数字字符串转换功能
// 测试函数固定以Test开头，参数是*testing.T
func TestConv(t *testing.T) {
	// Itoa：int转字符串，10转为"10"
	s := strconv.Itoa(10)
	// t.Log：测试里打印日志，只在测试时输出
	t.Log("str" + s)

	// Atoi：字符串转int；这里用if短变量声明，先执行转换再判断err
	if i, err := strconv.Atoi("10"); err == nil {
		// 转换成功，打印相加结果
		t.Log(10 + i)
	}
}
