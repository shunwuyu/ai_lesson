import fs from 'fs'
// 二进制读取
const buf = fs.readFileSync('./test.txt')
console.log(buf);
// 打印Buffer大小
console.log(buf.length)
// 修改前2个字符
// 仅修改内存里的 Buffer，磁盘原文件无变化
buf.write('gg')

// 输出修改后的内容 
// toString() 默认按 UTF-8 编码，把字节翻译成对应文字；
console.log(buf.toString())
