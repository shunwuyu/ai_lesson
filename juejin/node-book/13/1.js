// import fs from 'fs'

// 同步读取
// const syncData = fs.readFileSync('./test.txt', 'utf-8')
// console.log('====sync read====')
// console.log(syncData)

// 回调形式 异步读取
// fs.readFile('./test.txt', 'utf-8', (err, callbackData) => {
//   if (!err) {
//     console.log('====callback read====')
//     console.log(callbackData)
//   }
//   else {
//     console.log('====callback read error====')
//     console.log(err)
//   }
// })
// 回调地狱 
// fs.readFile('./file1.txt', 'utf-8', (err, d1) => {
//   if (err) return console.log('file错误', err);
//   console.log('file1:', d1);

//   fs.readFile('./file2.txt', 'utf-8', (err, d2) => {
//     if (err) return console.log('file2错误', err);
//     console.log('file2:', d2);

//     fs.readFile('./file3.txt', 'utf-8', (err, d3) => {
//       if (err) return console.log('file3错误', err);
//       console.log('file3:', d3);
//     });
//   });
// });

// promise形式 异步读取
// fs.promises.readFile('./test.txt', 'utf-8').then((promiseData) => {
//   console.log('====promise read====')
//   console.log(promiseData)
// })

// promise 形式还可以是如下写法（常用）
import fs from 'fs/promises'
// fs.readFile('./test.txt', 'utf-8').then((promiseData) => {
//   console.log('====promise read====')
//   console.log(promiseData)
// })

const res = await fs.readFile('./test.txt', 'utf-8')
console.log(res)
