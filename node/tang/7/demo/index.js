// const user = require('./user');
// const user = require('./user2');
// const user = require('./user3');
// const user = require('./user4'); // 没有输出
// console.log(user);

// 导入模块 "./exports" 并将其赋值给变量 user
const user = require('./user')

// 调用 context 模块中的 hello 函数，并传入 context.userInfo.name 参数
user.hello(user.userInfo.name)
// // 调用 context 模块中的 byebye 函数，并传入 context.userInfo.name 参数
user.byebye(user.userInfo.name)

// 2.2 解构引入
// 导入模块 "./exports" 中的 hello, userInfo 和 byebye，并赋值给相应的变量
const { hello, userInfo, byebye } = require('./user')
// 调用 hello 函数，并传入 userInfo.name 参数
hello(userInfo.name)
// 调用 byebye 函数，并传入 userInfo.name 参数
byebye(userInfo.name)

// 当然可以在导入的时候修改引入的模块名称。

// 导入模块 "./exports" 中的 hello, userInfo 和 byebye，并赋值给相应的变量
const { hello, userInfo: user, byebye } = require('./exports')
// 调用 hello 函数，并传入 userInfo.name 参数
hello(user.name)
// 调用 byebye 函数，并传入 userInfo.name 参数
byebye(user.name)