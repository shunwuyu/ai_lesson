// 函数参数默认值
// function foo(x = 1, y = 1) {
//   return x + y
// }
// console.log(foo(3, 4));

// 剩余参数（Rest Parameters）
// function foo(...arg) {
//   // console.log(arguments); // arguments 代码函数接收到的所有参数  类数组
//   console.log(arg);
  
// }
// foo(1, 2, 3, 4)



// 箭头函数
const foo = (...arg) => {
  console.log(arguments); // arguments 代码函数接收到的所有参数  类数组
  console.log(arg);
}
foo(1, 2, 3, 4)