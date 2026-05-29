// 引入 'http' 模块
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // 设置响应头
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据
    res.end('Hello World\n');
});

// 监听端口
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});