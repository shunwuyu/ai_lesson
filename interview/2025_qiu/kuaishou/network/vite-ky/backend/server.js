// server.js（后端）
const express = require('express');
const app = express();

// 模拟登录状态接口
app.get('/api/user', (req, res) => {
  res.json({ id: 1, name: '张三', role: 'admin' });
});

app.listen(3000, () => {
  console.log('后端服务运行在 http://localhost:3000');
});