const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/test' && req.method === 'GET') {
    // 设置 CORS 头，允许跨域请求
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // 允许任何源
    });
    res.end(JSON.stringify({ msg: '跨域成功！' }));
  } else if (req.url === '/api/test' && req.method === 'PATCH') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // 允许任何源
    });
    res.end(JSON.stringify({ msg: '跨域成功！' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8080, () => {
  console.log('CORS Server running at http://localhost:8080');
});