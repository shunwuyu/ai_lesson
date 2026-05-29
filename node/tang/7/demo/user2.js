// 统一的对象导出。
// 在模块中定义一个hello函数
function hello(name) {
  console.log(`Hello, ${name}!`)
}

// 在模块中定义一个byebye函数
function byebye(name) {
  console.log(`byebye, ${name}!`)
}

// 定义了一个名为 userInfo 的对象，包含姓名和年龄两个属性
const userInfo = {
  name: 'forever',
  age: 18
}

// 将函数和对象统一导出到模块的外部
module.exports = {
  hello,
  byebye,
  userInfo
}

