const express = require('express');
const app = express();
const PORT = 3000;

// 根路径路由
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// /hello 路由
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});