// 变量提升
// console.log(age);  
// var age = 18


// var age
// console.log(age);  
// age = 18


// 重复申明， 第二次忽略
// var age = 18
// var age = 20
// console.log(age);


// {
//   let age = 19 // 块级
//   var myname = '康总' // 全局
// }
// // console.log(age); // 报错  age is not defined
// console.log(myname); // 康总


// function foo() { // 函数级
//   let age = 19
// }

// for (let i = 0; i < 10; i++) { // 块级
//   console.log(i); // 0 1 2 3 4 5 6 7 8 9
// }

// 这段代码会报错。因为 let age 在块级作用域内存在暂时性死区（TDZ）：
// 在声明前访问 age 会抛出 ReferenceError，即使外层有同名变量。
// let age = 18
// if (1) {
//   console.log(age);  // 暂时性死区 
//   let age = 19
// }

// 这段代码会报错。因为 const 声明的变量是常量，不能被重新赋值。
// const age = 19
// age = 20