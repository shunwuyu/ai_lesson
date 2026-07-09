import fs from 'fs'
import path from 'path'

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })

  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(path.resolve(dirPath, file.name), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.resolve(dirPath, file.name))
    }
  })

  return arrayOfFiles
}

// 获取当前目录下所有文件
console.log(getAllFiles('./'))
