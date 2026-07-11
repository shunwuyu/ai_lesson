import fs from 'fs'
// 文件磁盘里存放的本质是二进制字节，不是字符串。
// 二进制读取
// 只读取原始字节，不做字符串解码
// Node.js 专门用 Buffer 对象来存放字节数据，所以返回值就是 Buffer
// 物理磁盘：二进制（010101）
// Buffer 内存：十进制数字（0‑255）
// 控制台输出：十六进制字符串（0xXX）。 十六进制为了好看
const buf = fs.readFileSync('./test.txt')
console.log(buf instanceof Buffer);
console.log(buf);
// 打印Buffer大小
console.log(buf.length)
// 修改前2个字符
// 仅修改内存里的 Buffer，磁盘原文件无变化
buf.write('gg')

// 输出修改后的内容 
// toString() 默认按 UTF-8 编码，把字节翻译成对应文字；
console.log(buf.toString())
