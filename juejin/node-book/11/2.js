// 终止 Node.js 进程，如果指定了 code 参数，则使用该参数作为退出状态码。
console.log('hello')

// process.exit()
// 在终端里可以通过 echo $? 获取传递的退出状态码。
process.exit(1)
// 下面这行代码不会执行
console.log('world')
