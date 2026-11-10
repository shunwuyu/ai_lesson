const http = require('http');
const crypto = require('crypto');

// ===================== 配置区 =====================
// 模拟用户数据库
const userDB = {
  admin: { username: 'admin', password: '123456', role: '管理员' },
  user: { username: 'user', password: '123456', role: '普通用户' }
};

// 服务端 Session 存储（内存版，重启服务全部丢失，讲解重点！）
const sessionStore = {};
// session 过期时间 5分钟
const SESSION_EXPIRE = 5 * 60 * 1000;

// 生成唯一 sessionId
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

// 解析 Cookie 字符串 {key:value}
function parseCookie(cookieStr = '') {
  const cookieObj = {};
  cookieStr.split(';').forEach(item => {
    const [k, v] = item.trim().split('=');
    if (k && v) cookieObj[k] = v;
  });
  return cookieObj;
}

// 清理过期session
function cleanExpireSession() {
  const now = Date.now();
  for (const sid in sessionStore) {
    if (sessionStore[sid].expire < now) {
      delete sessionStore[sid];
    }
  }
}

// 渲染登录页面
function renderLoginPage(msg = '') {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>登录页 - Cookie Session演示</title>
<style>
.box{width:400px;margin:50px auto;padding:20px;border:1px solid #ccc;border-radius:8px;}
.err{color:red;margin:10px 0;}
</style>
</head>
<body>
<div class="box">
  <h3>登录（原生Node Cookie+Session）</h3>
  ${msg ? `<div class="err">${msg}</div>` : ''}
  <form method="POST" action="/login">
    <div>用户名：<input type="text" name="username" /></div>
    <div style="margin:8px 0">密码：<input type="password" name="password" /></div>
    <button type="submit">登录</button>
  </form>
  <div style="margin-top:15px;font-size:14px;color:#666">
    账号：admin / 123456  或者 user / 123456
  </div>
</div>
</body>
</html>
  `;
}

// 渲染首页（登录成功后）
function renderHomePage(user) {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>首页</title>
<style>
.box{width:400px;margin:50px auto;padding:20px;border:1px solid #ccc;border-radius:8px;}
</style>
</head>
<body>
<div class="box">
  <h3>✅ 登录成功！</h3>
  <p>欢迎你：${user.username}【${user.role}】</p>
  <p>原理说明：浏览器Cookie保存sessionId，服务端内存根据sessionId找到你的登录信息</p>
  <a href="/logout">退出登录</a>
</div>
</body>
</html>
  `;
}

// 解析 POST form 表单数据
function parsePostBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const data = {};
      for (const [k, v] of params) {
        data[k] = v;
      }
      resolve(data);
    });
  });
}

// 创建http服务
const server = http.createServer(async (req, res) => {
  // 每次请求先清过期session
  cleanExpireSession();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const cookies = parseCookie(req.headers.cookie);
  const sid = cookies.sid;

  // 1. 访问根路径 /
  if (path === '/') {
    // 判断有没有有效的session
    if (sid && sessionStore[sid] && sessionStore[sid].expire > Date.now()) {
      // 有效，返回首页
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end(renderHomePage(sessionStore[sid].user));
    } else {
      // 未登录，跳转登录页
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
    return;
  }

  // 2. 登录页面 GET
  if (path === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(renderLoginPage());
    return;
  }

  // 3. 登录提交 POST
  if (path === '/login' && req.method === 'POST') {
    const { username, password } = await parsePostBody(req);
    // 校验账号密码
    if (!userDB[username] || userDB[username].password !== password) {
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end(renderLoginPage('用户名或密码错误！'));
      return;
    }
    // 校验通过，创建session
    const sessionId = generateSessionId();
    sessionStore[sessionId] = {
      user: userDB[username],
      expire: Date.now() + SESSION_EXPIRE
    };
    // 设置Cookie：sid=xxx，httpOnly（重点！防止js读取cookie，XSS防护）
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `sid=${sessionId}; HttpOnly; Max-Age=${SESSION_EXPIRE/1000}; Path=/`
    });
    res.end();
    return;
  }

  // 4. 退出登录 /logout
  if (path === '/logout') {
    // 删除服务端session
    if (sid && sessionStore[sid]) delete sessionStore[sid];
    // 让浏览器cookie失效
    res.writeHead(302, {
      Location: '/login',
      'Set-Cookie': 'sid=; HttpOnly; Max-Age=0; Path=/'
    });
    res.end();
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
  res.end('<h3>404 页面不存在</h3>');
});

const PORT = 3010;
server.listen(PORT, () => {
  console.log(`服务启动成功：http://localhost:${PORT}`);
  console.log('账号：admin / 123456  或者 user / 123456');
});
