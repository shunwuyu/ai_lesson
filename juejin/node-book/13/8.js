import fs from 'fs'
// 监听当前目录下所有的文件和子目录中的文件
fs.watch('./', { recursive: true }, (eventType, filename) => {
  console.log(`File '${filename}' has changed: ${eventType}`)
})