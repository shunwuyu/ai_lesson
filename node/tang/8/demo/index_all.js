// 文件 import_all.js

// 导入 export_all.js 中所有被导出的模块成员，并作为 allValues 对象的属性
import * as allValues from './user_all.js'

// 在控制台输出 allValues 对象
console.log(allValues)

// 从 allValues 对象中解构出 hello、byebye、default 和 userInfo 模块成员
const { hello, byebye, default: data, userInfo } = allValues

// 调用 hello() 方法，输出欢迎信息并传入用户姓名
hello(userInfo.name)

// 调用 byebye() 方法，输出道别信息并传入用户姓名
byebye(userInfo.name)

// 输出 data 对象的 goal 属性
console.log(data.goal)
