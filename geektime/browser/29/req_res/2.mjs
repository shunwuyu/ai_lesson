import http from 'http';

http.createServer((req, res) => {
  res.end('Hello, World!');
}).listen(3000);