// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  // 设置允许跨域的源
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501')
  // 允许哪些请求头
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,name');
  // 响应头暴露给前端
  res.setHeader('Access-Control-Expose-Headers', 'name');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 处理实际请求
  if (req.url === '/getData' && req.method === 'PUT') {
    // 从请求头读取自定义请求头
    const nameFromHeader = req.headers['name'];
    res.setHeader('name', nameFromHeader);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ msg: 'success', name: nameFromHeader }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
