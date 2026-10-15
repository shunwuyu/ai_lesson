 字符串
https://gitee.com/geektime-geekbang/go_learning/blob/master/code/ch9/string/string_fun_test.go#
命令须在模块内执行
- go mod init example/03
`xxx_test.go` 是 Go 的测试文件命名约定，只被`go test` 识别执行。
`-v` 即 verbose，详细输出每个测试的运行结果
- go test -v .

