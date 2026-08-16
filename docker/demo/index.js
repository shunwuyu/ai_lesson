// server.js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('hello world\n');
});
server.listen(1234, '0.0.0.0', () => {
  console.log('node service run on 1234');
});
