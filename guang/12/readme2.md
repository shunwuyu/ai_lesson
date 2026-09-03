**SSE：服务器单向不停地往浏览器推送消息，浏览器建立一条长连接，服务器一点一点发数据，也就是我们常说的「流式输出」。**

> 
> 和 websocket 区别（新手必记）
> 
> 
> - SSE：**只能服务器→客户端单向发**，HTTP 协议，最简单，适合大模型打字机效果
> - WebSocket：双向收发，协议升级，适合聊天实时互动

大模型回答文字一点点蹦出来，绝大多数网页版就是用 **SSE**。

## 二、最核心的 3 个响应头（服务器必须返回）

这三个头是 SSE 的灵魂，少一个浏览器就不会当成流处理。

```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
```

逐个解释：

1. `Content-Type: text/event‑stream`
告诉浏览器：**这不是普通网页，是 SSE 数据流**
2. `Cache-Control: no-cache`
禁止缓存这条流，流式数据不能被缓存卡住
3. `Connection: keep‑alive`
保持 HTTP 长连接，不要发完一段就断开

> 
> 额外可选头（跨域时）
> `Access-Control-Allow-Origin: *`

## 三、SSE 数据报文格式（固定语法）

发给客户端的每一条消息必须按这个格式：

```
data: 消息内容\n\n
```

- 必须以 `data:` 开头
- 一条消息**结尾两个换行 `\n\n`**，代表这条消息发送完毕
- 如果文字很长，可以多行 `data:`，最后再两个换行

示例数据流（服务器一点点吐出）

```
data: 你好
data: ，我是AI
data: 正在回答你\n\n
```

## 四、最小可运行完整案例（Node.js + 浏览器，复制就能跑）

### 1）后端服务 server.js

```
const http = require('http');

const server = http.createServer((req, res) => {
  // 开启SSE接口
  if(req.url === '/stream'){
    // 返回三个关键响应头
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

    // 模拟流式，每隔1秒发一段文字
    let words = ["你","好","，","欢","迎","了","解","SSE"];
    let index = 0;

    const timer = setInterval(()=>{
      if(index >= words.length){
        clearInterval(timer);
        res.end(); // 流结束，关闭连接
        return;
      }
      // 按sse格式发送
      res.write(`data: ${words[index]}\n\n`);
      index++;
    }, 1000)
  }
});

server.listen(3000, ()=>{
  console.log("服务启动 http://localhost:3000")
})
```

### 2）前端页面 index.html（浏览器接收流）

```
<!DOCTYPE html>
<html>
<body>
  <div id="result"></div>

  <script>
    // 新建SSE对象，一行代码建立长连接
    const eventSource = new EventSource("http://localhost:3000/stream");
    const box = document.getElementById('result');

    // 收到数据流触发
    eventSource.onmessage = (e)=>{
      box.innerText += e.data;
    }

    // 出错关闭
    eventSource.onerror = ()=>{
      eventSource.close();
    }
  </script>
</body>
</html>
```

### 运行效果

文字**一个字一个字蹦出来**，就是大模型流式输出的效果。