const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

// 使用koa-bodyparser中间件解析请求体
app.use(bodyParser());

// 加载路由
app.use(router.routes());

// 启动应用
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});