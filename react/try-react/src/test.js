// console.log('test一下');
// es6 module, add.js 返回 add 方法
// add.js 会返回多个方法， 只需要 add 
// Add,add 都是add.js 在此文件的代表
import Add, { add } from './add.js'
console.log(Add)
console.log(add(1, 2))