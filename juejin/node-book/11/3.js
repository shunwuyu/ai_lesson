
// 获取当前进程的 PID
console.log(process.pid)
// 返回运行 Node.js 的操作系统平台
console.log(process.platform)
// 获取 CPU 架构信息。
console.log(process.arch)

process.stdout.write('hello')
process.stdout.write(' ')
process.stdout.write('world')
process.stdout.write('\n')
// 监听用户输入数据
process.stdin.on('data', (data) => {
  console.log(`User input: ${data}`);
});