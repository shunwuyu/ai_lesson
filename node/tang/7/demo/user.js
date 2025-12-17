// 指定属性导出，
// 定义一个使用 module.exports 导出的模块
// 定义了一个名为 hello 的函数，用于输出问候语
// 定义了一个名为 byebye 的函数，用于输出告别语
// 定义了一个名为 userInfo 的对象，包含姓名和年龄两个属性
module.exports.hello = function (name) {
  console.log(`Hello, ${name}!`)
}
module.exports.byebye = function (name) {
  console.log(`byebye, ${name}!`)
}
module.exports.userInfo = {
  name: 'forever',
  age: 18
}
