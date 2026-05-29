// 文件 import.js

// 引入 export_named.js 中具名导出的模块
import { byebye, hello, userInfo as user } from './export_named.js'

// 调用 byebye() 方法，输出道别信息并传入用户姓名
byebye(user.name)

// 调用 hello() 方法，输出欢迎信息并传入用户姓名
hello(user.name)
