import * as dotenv from 'dotenv'
// Express 是基于 Node.js、轻量灵活的 Web 后端框架，
// 用来快速搭建服务、编写接口与 BFF 中转层。
import express from 'express';

dotenv.config({
  path: ['.env.local', '.env']
})

const openaiApiKey = process.env.VITE_DEEPSEEK_API_KEY;
console.log(openaiApiKey, '////');
const app = express();
const port = 3000;
const endpoint = 'https://api.deepseek.com/v1/chat/completions';

app.get('/api/user', (req, res) => {
    res.json({
        code: 200,
        msg: '请求成功',
        data: { name: "张三", age: 22 }
    })
})


// SSE 端点
app.get('/stream', async (req, res) => {
    // 设置响应头部
    // 告诉浏览器本次响应是 SSE 流，保持长连接不断开。
  //   没有这个头，浏览器会等数据收完才处理。设了之后，浏览器才允许一边收一边读，不会因为连
  // 没关闭就卡住。
    res.setHeader('Content-Type', 'text/event-stream');
// 禁止中间缓存，确保每次都回源站拿最新数据。
    res.setHeader('Cache-Control', 'no-cache');
    // 保持 TCP 连接不关，持续推送数据。
    res.setHeader('Connection', 'keep-alive');
    // 立即发送响应头，不等 body，让客户端快速确认连接。
    res.flushHeaders(); // 发送初始响应头
  
    try {
      // 发送 OpenAI 请求
      const response = await fetch(
        endpoint,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model:'deepseek-v4-pro', // 选择你使用的模型
                messages: [{ role: 'user', content: req.query.question }],
                stream: true, // 开启流式响应
            })
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch from OpenAI');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

          // 读取流数据并转发到客户端
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = buffer + decoder.decode(value, { stream: true });
        buffer = '';
  
        // 按行分割数据，每行以 "data: " 开头，并传递给客户端
        const lines = chunkValue.split('\n').filter(line => line.trim() && line.startsWith('data: '));
        for (const line of lines) {
            const incoming = line.slice(6);
            if(incoming === '[DONE]') {
              done = true;
              break;
            }
            try {
              const data = JSON.parse(incoming);
              const delta = data.choices[0].delta.content;
              if(delta) res.write(`data: ${delta}\n\n`); // 发送数据到客户端
            } catch(ex) {
              buffer += `data: ${incoming}`;
            }
        }
      }
  
      res.write('event: end\n'); // 发送结束事件
      res.write('data: [DONE]\n\n'); // 通知客户端数据流结束
      res.end(); // 关闭连接
  
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      res.write('data: Error fetching from OpenAI\n\n');
      res.end();
    }
  });
  
  // 启动服务器
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });