// JS 里**Buffer**是 Node.js 专属对象，用来存放**二进制原始字节数据**（图片、文件、数据流）
// Node.js 环境运行
// 1.字符串转Buffer(二进制)
const buf = Buffer.from('hello')
console.log(buf) // <Buffer 68 65 6c 6c 6f>

// 2.Buffer转回字符串
const str = buf.toString()
console.log(str) // hello
