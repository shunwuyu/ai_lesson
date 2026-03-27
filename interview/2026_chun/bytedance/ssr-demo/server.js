// server.js
import fs from 'fs'
import path from 'path'
import express from 'express'
// 它用于SSR或定制化工具，让开发者以编程方式启动服务，而非仅依赖命令行。
import { createServer as createViteServer } from 'vite'
// 获取当前文件的目录
// ESM 模块规范不支持 __dirname
// 参数为空时，它会返回当前工作目录的绝对路径
const __dirname = path.resolve()
// 创建 express 应用
const app = express()

async function start() {
  // 创建 Vite 服务器
  const vite = await createViteServer({
    // 启用中间件模式
    server: { middlewareMode: true },
    // 自定义应用类型 
    appType: 'custom'
  })
  // 中间件模式
  // 将 Vite 的中间件挂载到 express 应用上
  app.use(vite.middlewares)
  // 处理所有请求
  app.use(async (req, res) => {
    try {
      // 1. 读取 HTML 模板
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // 2. 让 Vite 处理 HTML（关键！）
      // 处理 HTML 模板，返回处理后的 HTML 内容
      template = await vite.transformIndexHtml(req.url, template)

      // 3. 加载服务端入口
      // ssrLoadModule作用是加载服务端入口文件，并返回一个对象，对象中包含 render 函数
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

      // 4. 执行 SSR
      // react在服务器端将组件和数据渲染为完整HTML字符串
      const appHtml = render()

      // 5. 注入 HTML
      const html = template.replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 修复堆栈跟踪
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
}

start()