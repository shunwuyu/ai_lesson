// require('http') 同步加载内置 http 模块
// Node.js 通过 CommonJS 模块系统实现模块化
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello, World!');
}).listen(3000);