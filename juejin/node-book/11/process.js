// node process.js
// node process.js --name=123 -ab --hello 123
//  返回一个数组，包含启动 Node.js 进程时传递的命令行参数。
console.log(process.argv)
// 获取当前工作目录的绝对路径。
console.log(process.cwd())
// process.env 获取当前执行环境的环境变量
console.log(process.env.DEEPSEEK_API_KEY, '-----')