const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

// --- 1. 模拟数据库 (用户表) ---
const usersDB = [
    { id: 1, username: 'admin', password: '123', role: 'admin' },
    { id: 2, username: 'user', password: '123', role: 'user' }
];

// --- 2. 模拟 Session 存储 (内存数据库) ---
// 结构: { "sessionId": { userId: 1, username: 'admin', role: 'admin' } }
const sessionStore = {}; 

// 中间件配置
app.use(express.json());
// 解析 urlencoded 请求体
app.use(express.urlencoded({ extended: true }));
// 解析 Cookie
app.use(cookieParser()); // 解析 Cookie
app.use(express.static('public')); // 托管前端页面

// --- 3. 核心中间件：根据 sessionId 取出用户对象 ---
function sessionMiddleware(req, res, next) {
    const sessionId = req.cookies['sessionId']; // 从 Cookie 获取 ID

    if (!sessionId) {
        return next(); // 没有 ID，跳过，后续守卫会拦截
    }

    // 【关键步骤】用 sessionId 去存储中“捞出”完整的用户对象
    const sessionData = sessionStore[sessionId];

    if (sessionData) {
        // 将用户对象挂载到 request 上，供后续路由使用
        req.user = sessionData; 
        console.log(`✅ 会话验证成功: 用户 ${req.user.username} 已登录`);
    } else {
        console.log('⚠️ 无效的 SessionID，可能已过期或被篡改');
        res.clearCookie('sessionId'); // 清除无效 Cookie
    }
    
    next();
}

// --- 4. 路由守卫：检查是否登录 ---
function authGuard(req, res, next) {
    if (req.user) {
        return next(); // 已登录，放行
    }
    // 未登录，返回 401
    return res.status(401).json({ error: '未授权，请先登录', code: 'NO_SESSION' });
}

// --- 路由定义 ---

// A. 登录接口
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // 1. 验证账号密码
    const user = usersDB.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 2. 创建会话：生成 sessionId
    const sessionId = uuidv4();
    
    // 3. 存储用户对象 (把敏感信息如密码去掉)
    sessionStore[sessionId] = {
        id: user.id,
        username: user.username,
        role: user.role,
        loginTime: new Date()
    };

    // 4. 设置 Cookie (HttpOnly 防止 XSS 窃取)
    res.cookie('sessionId', sessionId, {
        // HttpOnly 防止 XSS 窃取
        httpOnly: true, 
        maxAge: 1000 * 60 * 60, // 1小时过期
        path: '/'
    });

    console.log(`🔐 登录成功: ${username}, SessionID: ${sessionId}`);
    res.json({ message: '登录成功', user: sessionStore[sessionId] });
});

// B. 受保护的资源 (需要登录)
app.get('/api/profile', sessionMiddleware, authGuard, (req, res) => {
    // 这里可以直接使用 req.user，因为中间件已经“捞出”了对象
    res.json({
        message: '这是受保护的个人信息',
        data: req.user
    });
});

// C. 登出
app.post('/api/logout', (req, res) => {
    const sessionId = req.cookies['sessionId'];
    if (sessionId) {
        delete sessionStore[sessionId]; // 删除服务端会话
        res.clearCookie('sessionId');
    }
    res.json({ message: '已退出登录' });
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});