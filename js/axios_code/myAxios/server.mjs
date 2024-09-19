import Koa from 'koa';
const app = new Koa();

app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*'); // 允许所有来源
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        if (ctx.request.method === 'OPTIONS') {
          ctx.status = 200;
          return;
        }
        
        await next();
});

// 一个简单的路由处理函数
app.use(async ctx => {
  ctx.body = 'Hello, World!';
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});