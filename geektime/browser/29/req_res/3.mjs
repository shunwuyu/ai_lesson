import http from 'http';
import fs from 'fs';
import { join } from 'path';

http.createServer((req, res) => {
  const filePath = join('./', 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    }
  });
}).listen(3000);