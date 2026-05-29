// 1.2 具名导入导出
// 文件 export.js

// 定义 hello 方法，输出欢迎信息
export function hello(name) {
  console.log(`Hello, ${name}!`)
}

// 定义 byebye 方法，输出道别信息
export function byebye(name) {
  console.log(`byebye, ${name}!`)
}

// 定义 userInfo 对象，存储用户信息
export const userInfo = {
  name: 'forever', // 用户名
  age: 18 // 用户年龄
}

