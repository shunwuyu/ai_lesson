import fs from 'node:fs'
import fs2 from 'node:fs/promises'
//读取文件
fs2.readFile('./index.txt').then(result => {
    console.log(result.toString())
})
fs.readFile('./index.txt', (err, data) => {
    if (err) {
        return err
    }
    console.log(data.toString())
})
let txt = fs.readFileSync('./index.txt')
console.log(txt.toString())