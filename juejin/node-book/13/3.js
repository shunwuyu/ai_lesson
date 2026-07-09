import fs from 'fs'

fs.writeFileSync('./newTest.txt', 'hello world')

// 写入二进制文件 (读取一个图片，然后输出到一个新的位置)。
// 读取一个图片
const imgBuf = fs.readFileSync('./logo.png')
console.log('isBuffer', Buffer.isBuffer(imgBuf), 'bufferSize', imgBuf.length)

// 写入到新文件
fs.writeFileSync('newLogo.png', imgBuf, 'binary')
