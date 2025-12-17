// 文件 export_default.js
// 导出默认对象
export default {
  // 定义 hello 方法，输出欢迎信息
  hello(name) {
    console.log(`Hello, ${name}!`)
  },
  // 定义 byebye 方法，输出道别信息
  byebye(name) {
    console.log(`byebye, ${name}!`)
  },
  // 定义 userInfo 对象，存储用户信息
  userInfo: {
    name: 'forever', // 用户名
    age: 18 // 用户年龄
  }
}
