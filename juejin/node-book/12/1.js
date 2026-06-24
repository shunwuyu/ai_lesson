import path from 'path'

console.log(path.join('a', 'b', 'c'))
// 当前进程的工作目录路径
console.log(path.join(process.cwd(), '/hello', 'world'))
