// app.js

// 1. 导入 Koa 核心模块
// Koa 是一个轻量、现代化的 Node.js Web 框架，用于构建服务器端应用。
// 使用 ES 模块语法（import），要求 package.json 中设置 "type": "module"
import Koa from 'koa';

// 2. 导入 koa-router 模块
// koa-router 是 Koa 官方推荐的路由中间件，用于定义不同 HTTP 方法和路径的处理逻辑。
// 它允许我们以声明式方式注册路由（如 GET /, POST /users 等）。
import Router from 'koa-router';

// 3. 创建一个 Koa 应用实例
// `new Koa()` 返回一个新的 Koa 应用对象，它是整个 Web 服务的核心。
// 所有中间件、错误处理、请求响应流程都围绕这个实例展开。
const app = new Koa();

// 4. 创建一个路由器实例
// `new Router()` 初始化一个路由管理器，后续可通过它注册多个路由规则。
// 可选：传入配置对象，例如 { prefix: '/api' } 给所有路由加前缀。
const router = new Router();

// 5. 定义一个 GET 请求路由：根路径 '/'
// - `router.get(path, handler)` 表示只响应 HTTP GET 方法
// - 路径 '/' 对应 URL 的根路径，例如 http://localhost:8000/
// - 处理函数接收一个上下文对象 `ctx`（context），它是 Koa 的核心抽象，
//   封装了 Node.js 原生的 request 和 response 对象，并提供便捷属性和方法。
router.get('/', (ctx) => {
  // 6. 从 URL 查询参数中安全地获取 'name' 字段
  // - `ctx.query` 是 Koa 自动解析的查询字符串对象（已解码）
  //   例如：?name=张三 → ctx.query.name === '张三'
  // - 使用空值合并操作符 `??`：只有当 ctx.query.name 为 null 或 undefined 时才使用默认值
  //   （比 `||` 更安全，因为 ''、0、false 不会被误判为“假”而替换）
  const name = ctx.query.name ?? 'World';

  // 7. 设置 HTTP 响应体（response body）
  // - `ctx.body` 是 Koa 提供的设置响应内容的属性
  // - 赋值后，Koa 会自动设置 Content-Type（此处为 text/html; charset=utf-8）
  // - 支持字符串、Buffer、Stream、Object（自动转 JSON）等多种类型
  ctx.body = `Hello, ${name}!`;
});

// 8. 将路由器中间件挂载到 Koa 应用中
// - `router.routes()` 返回一个 Koa 中间件函数，负责匹配并执行对应路由逻辑
// - `router.allowedMethods()` 是一个辅助中间件：
//     * 当客户端发送了该路径不支持的 HTTP 方法（如 POST 到只支持 GET 的路由），
//       它会自动返回 405 Method Not Allowed，并设置 Allow 响应头
// - `.use()` 用于将中间件加入 Koa 的处理链（按顺序执行）
app.use(router.routes()).use(router.allowedMethods());

// 9. 定义服务器监听的端口号
// - 使用常量 PORT 提高可维护性（便于后续通过环境变量覆盖）
const PORT = 8000;

// 10. 启动 HTTP 服务器并监听指定端口
// - `app.listen(port, callback)` 是 Koa 对 Node.js `http.createServer(app.callback()).listen(...)` 的封装
// - 回调函数在服务器成功启动后执行，通常用于打印日志或通知
app.listen(PORT, () => {
  // 11. 控制台输出服务启动信息（带 ✅ 表情增强可读性）
  // - 使用模板字符串动态插入端口号
  // - 建议使用 localhost 而非 127.0.0.1，兼容 IPv6 环境
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});