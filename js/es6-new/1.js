// //  let a = 1
// //  let b = 2
// //  let c = 3
// 这行代码使用数组解构赋值语法，将数组 [1, 2, 3] 中的元素依次赋值给变量 a、b 和 c
// // let [a, b , c] = [1, 2, 3]
// 支持嵌套数组解构赋值
// // const arr = [1, [2, 3, [4], 5]]
// // let [a, [b, c, [d], e]] = arr
// // console.log(a, b, c, d, e);


// // const arr = [1, 2, 3, 4, 5]
// 数组解构赋值中的剩余元素（rest）语法 
// // let [a, ...b] = arr
// // console.log(a, b);
// ES6 的 对象属性简写（Shorthand Property） 语法
// const sex = 'boy'
// const obj = {
//   name: '康总',
//   age: 18,
//   sex,
//   like: {
//     n: '泡脚'
//   }
// }

// // let name = obj.name
// 对象解构赋值（Destructuring Assignment），并且包含了 嵌套对象的解构。
// let {name, age, like: {n}} = obj
// console.log(name, age, n);


// 使用解构赋值将字符串 'hello' 拆分为单个字符，分别赋值给变量 a 到 e，
const [a, b, c, d, e] = 'hello'
console.log(a, b, c, d, e);

// 原始类型字符串在访问属性时会被临时包装成 String 对象。
// ES6 的对象解构赋值语法
// const str = 'hello' // str.length
// let {length} = 'hello'

// console.log(length);



function foo({x: a, y: b}) {
  return a + b
}

foo({x: 1, y: 2})