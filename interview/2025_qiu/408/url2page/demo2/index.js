const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

http.createServer(function (request, response) {
  console.log('request come', request.url)
  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

//   if (request.url === '/index.js') {
//     const filePath = path.join(__dirname, request.url); // 拼接当前脚本文件地址
//      const stat = fs.statSync(filePath); // 获取当前脚本状态
//      const mtime = stat.mtime.toGMTString() // 文件的最后修改时间
//      const requestMtime = request.headers['if-modified-since']; // 来自浏览器传递的值
 
//      console.log(stat);
//      console.log(mtime, requestMtime);
 
//      // 走协商缓存
//      if (mtime === requestMtime) {
//        response.statusCode = 304;
//        response.end();
//        return;
//      }
 
//      // 协商缓存失效，重新读取数据设置 Last-Modified 响应头
//      console.log('协商缓存 Last-Modified 失效');
//      response.writeHead(200, {
//          'Content-Type': 'text/javascript',
//          'Last-Modified': mtime,
//      });
 
//      const readStream = fs.createReadStream(filePath);
//      readStream.pipe(response);
//    }
 
if (request.url === '/index.js') {
    const filePath = path.join(__dirname, request.url); // 拼接当前脚本文件地址
    const buffer = fs.readFileSync(filePath); // 获取当前脚本状态
    const fileMd5 = md5(buffer); // 文件的 md5 值
    const noneMatch = request.headers['if-none-match']; // 来自浏览器端传递的值

    if (noneMatch === fileMd5) {
        response.statusCode = 304;
        response.end();
        return;
    }

    console.log('Etag 缓存失效');
    response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=0',
        'ETag': fileMd5,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  }



}).listen(8888)

