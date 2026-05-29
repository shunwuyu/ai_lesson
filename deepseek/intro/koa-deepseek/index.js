const koa = require("koa");
const app = new koa();
const Router = require("koa-router");
const router = new Router();
const axios = require("axios");
const cors = require('koa2-cors');

const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// app.use(async (ctx, next) => {
//   // 设置允许来自所有源的请求
//   ctx.set('Access-Control-Allow-Origin', '*');
  
//   // 设置允许的请求方法
//   ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  
//   // 设置允许的请求头
//   ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
  
//   // 如果是预检请求（OPTIONS），直接返回204 No Content
//   if (ctx.method === 'OPTIONS') {
//     ctx.status = 204;
//     return;
//   }

//   await next();
// });

// 配置 CORS 中间件
app.use(cors({
  origin: function(ctx) { // 动态设置允许的来源
      return '*'; // 允许所有来源，生产环境中应指定具体域名
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5, // 预检请求的有效期，单位为秒
  credentials: true, // 是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 支持的HTTP方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 支持的请求头
}));

router.post("/chatai", async (ctx) => {
  console.log(ctx.request.body, '---------')
  const { message } = ctx.request.body;
  console.log(message, '?????????????');

  const data = {
  // 你应运行那个模型参数 就用哪个模型参数
    model: "llama3.2:latest",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    stream: false,
  };

  const response = await axios
    .post("http://localhost:11434/api/chat", data)
    .then((response) => {
      // console.log(response.data.message.content);
      console.log('////////')
      
      ctx.body =  { 
        content: response.data.message.content
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.use(router.routes());

app.listen(3001, () => {
  console.log("Server is running on port http://localhost:3001");
});


