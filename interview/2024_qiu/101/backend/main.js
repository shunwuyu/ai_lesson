const http = require('http');
const whiteList = [
    'http://127.0.0.1:5501'
]
const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    console.log(origin)
  if (whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // 当这个头被设置为true时，响应可以携带cookies、HTTP认证信息等凭据，
    //   从而允许跨域请求在浏览器中使用这些敏感信息。简而言之，它允许
    //   跨域请求携带和接收凭据。
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
    // 设置CORS头部
  

  // 对于预检请求（OPTIONS），立即响应
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204); // No Content
//     res.end();
//   } else {
    // 对于其他请求类型，处理并返回数据
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify({
        message: 'Hello, World!'
    }));
//   }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});