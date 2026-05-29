// server.js
import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'

const app = new Koa()

app.use(async ctx => {
  const html = fs.readFileSync('./template.html', 'utf-8')

  const vueApp = createSSRApp({
    data: () => ({ count: 0 }),
    template: `<div><button @click="count++">Count is: {{ count }}</button></div>`
  })

  const appContent = await renderToString(vueApp)

  ctx.body = html.replace(`<!--app-html-->`, appContent)
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
