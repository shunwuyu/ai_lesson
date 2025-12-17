// 文件 import_default.js

// 引入 export_default.js 中默认导出的模块
import defaultModule from './user.js'

// 调用 defaultModule 中定义的 byebye() 方法，输出道别信息并传入用户姓名
defaultModule.byebye(defaultModule.userInfo.name)

// 调用 defaultModule 中定义的 hello() 方法，输出欢迎信息并传入用户姓名
defaultModule.hello(defaultModule.userInfo.name)

