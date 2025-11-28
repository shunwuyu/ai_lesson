import http from 'http';
import fs from 'fs';
import url from 'url';
import querystring from 'querystring';
import { authenticate } from './model/user.js';

const PORT = 3000;

// 工具函数：解析 POST 数据
function parsePostData(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => resolve(querystring.parse(body)));
  });
}

// 设置 Cookie 工具
function setCookie(res, name, value, options = {}) {
  const opts = [
    `Path=${options.path || '/'}`,
    `HttpOnly`,
    `Max-Age=${options.maxAge || 3600}`
  ];
  if (options.secure) opts.push('Secure');
  res.setHeader('Set-Cookie', `${name}=${value}; ${opts.join('; ')}`);
}

// 清除 Cookie
function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; Max-Age=0`);
}

const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  const path = reqUrl.pathname;

  // 静态资源：返回 HTML
  if (path === '/' || path === '/index.html') {
    fs.readFile('./view/index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(data);
      }
    });
    return;
  }

  // 登录接口
  if (path === '/login' && req.method === 'POST') {
    const postData = await parsePostData(req);
    const { username, password } = postData;

    if (authenticate(username, password)) {
      setCookie(res, 'isLoggedIn', 'true', { maxAge: 3600 }); // 1小时
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false }));
    }
    return;
  }

  // 退出登录
  if (path === '/logout' && req.method === 'POST') {
    clearCookie(res, 'isLoggedIn');
    res.writeHead(200);
    res.end();
    return;
  }

  // 未匹配路由
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});