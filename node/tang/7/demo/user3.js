// 定义一个模块，使用 exports 导出模块中的内容。
// 定义了一个名为 hello 的函数，用于输出问候语
// 定义了一个名为 byebye 的函数，用于输出告别语
// 定义了一个名为 userInfo 的对象，包含姓名和年龄两个属性
exports.hello = function (name) {
  console.log(`Hello, ${name}!`)
}
exports.byebye = function (name) {
  console.log(`byebye, ${name}!`)
}
exports.userInfo = {
  name: 'forever',
  age: 18
}
