import Koa from 'koa';
import cors from '@koa/cors';

const app = new Koa();

// 启用 CORS，允许跨域请求
app.use(cors());

// /todos 路由
app.use(async (ctx, next) => {
  console.log('来自服务器端的请求');
  if (ctx.path === '/todos' && ctx.method === 'GET') {
    ctx.body = {
      code: 0,
      user: [
        { id: 1, text: 'haha', completed: false },
        { id: 2, text: 'haha2', completed: true },
      ],
    };
    return;
  }
  await next();
});

// 基础路由
app.use(async (ctx) => {
  ctx.body = { message: 'Hello Koa!' };
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Koa 服务已启动: http://localhost:${PORT}`);
});
