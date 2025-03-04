const Koa = require('koa')
const websocket = require('koa-websocket')

// 创建支持WebSocket的Koa实例
const app = websocket(new Koa())

// 存储所有连接的客户端
const clients = new Set()

// 处理普通HTTP请求
app.use(async ctx => {
  // 返回简单的聊天室页面
  ctx.body = `
  <html>
    <body>
      <div id="messages" style="height: 300px; overflow-y: scroll;"></div>
      <input type="text" id="messageInput" />
      <button onclick="sendMessage()">发送</button>
      <script>
        const ws = new WebSocket('ws://localhost:3000/ws')
        
        ws.onmessage = function(event) {
          const messages = document.getElementById('messages')
          messages.innerHTML += '<div>' + event.data + '</div>'
        }

        function sendMessage() {
          const input = document.getElementById('messageInput')
          ws.send(input.value)
          input.value = ''
        }
      </script>
    </body>
  </html>
  `
})

// 处理WebSocket连接
app.ws.use(async (ctx, next) => {
  // 新的WebSocket连接
  clients.add(ctx.websocket)
  
  // 当收到消息时广播给所有客户端
  ctx.websocket.on('message', message => {
    for(const client of clients) {
      client.send(message.toString())
    }
  })

  // 连接关闭时移除客户端
  ctx.websocket.on('close', () => {
    clients.delete(ctx.websocket)
  })
})

// 启动服务器
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})