// server.js - 后端服务，运行在 8080 端口
const http = require('http');

const server = http.createServer((req, res) => {
  // 允许所有来源（跨域关键：CORS 头）
  // 注意：我们先不加 CORS 头，让跨域失败！
  // 这样你就能看到经典的跨域错误
  console.log('hahahah');

  if (req.url === '/api/hello' && req.method === 'GET') {
    // 响应 JSON 数据
    // 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，
    // 只是结果被浏览器拦截了。
    console.log('/////////')
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from Node.js backend!' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8080, () => {
  console.log('Backend running at http://localhost:8080');
});