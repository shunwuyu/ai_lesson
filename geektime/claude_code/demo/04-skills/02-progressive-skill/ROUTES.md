# 路由分析

## 当前路由结构

从 `src/index.js` 中提取的所有路由定义：

### 应用级路由

| HTTP 方法 | 路径 | 处理函数 | 代码行号 |
|-----------|------|----------|----------|
| GET | `/` | 匿名函数 | 6-8 |
| GET | `/hello` | 匿名函数 | 11-13 |
| GET | `/users/:id` | 异步函数 | 15-22 |

### 路由详情

#### 1. GET /
```javascript
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});
```
- **功能**: 返回首页欢迎信息
- **参数**: 无
- **响应**: 纯文本 "Welcome to the homepage!"

#### 2. GET /hello
```javascript
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});
```
- **功能**: Hello World 测试端点
- **参数**: 无
- **响应**: 纯文本 "Hello, world!"

#### 3. GET /users/:id
```javascript
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});
```
- **功能**: 根据用户 ID 查询用户信息
- **路径参数**:
  - `id`: 用户唯一标识符
- **响应**:
  - 200: 用户 JSON 对象
  - 404: `{ error: 'User not found' }`

---

## 代码问题

### 1. 未定义的引用
- `User` 模型未导入（第 17 行使用了 `User.findById()`）

### 2. 架构问题
- 所有路由都定义在主应用文件中
- 缺少路由模块化
- 没有错误处理中间件
- 缺少请求体解析中间件（虽然当前不需要）

---

## 推荐的重构方案

### 建议目录结构

```
src/
├── index.js          # 主应用入口
├── routes/
│   ├── index.js      # 路由聚合
│   ├── home.js       # 首页路由
│   └── users.js      # 用户路由
├── controllers/      # 控制器（可选）
├── models/           # 数据模型
└── middleware/       # 中间件
```

### 重构后的代码示例

**src/routes/users.js**
```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
```

**src/index.js**
```javascript
const express = require('express');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/', homeRoutes);
app.use('/users', userRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

## 路由统计

- **总路由数**: 3
- **GET 方法**: 3
- **POST 方法**: 0
- **PUT 方法**: 0
- **DELETE 方法**: 0
- **带参数路由**: 1 (`/users/:id`)

---

## 待改进项

1. ✅ 路由模块化
2. ⬜ 添加用户认证中间件
3. ⬜ 添加请求日志中间件
4. ⬜ 实现完整的 CRUD 操作
5. ⬜ 添加输入验证（如使用 express-validator）
6. ⬜ 添加 API 版本控制（如 `/api/v1/users`）
