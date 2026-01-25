// mock/chat.ts
import IncomingMessage from 'http';
import ServerResponse from 'http';
import {config} from 'dotenv';
config();

export default [
  {
    url: '/api/ai/chat',
    method: 'post',
    // 使用 rawResponse 来处理流
    rawResponse: async (req, res) => {
      console.log('///////////////////')
      let body = '';
      
      // 1. 解析请求体 (获取 messages)
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', async () => {
        try {
          const { messages } = JSON.parse(body);
          console.log(messages, '--------')

          // 2. 设置响应头，告知浏览器这是一个流式响应
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Transfer-Encoding', 'chunked');
          res.setHeader('x-vercel-ai-data-stream', 'v1'); // 适配 Vercel AI SDK 协议
          // console.log(process.env.VITE_DEEPSEEK_API_KEY, '???');
          // 3. 调用真正的 DeepSeek API
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}` // 确保环境变量中有 Key
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: messages,
              stream: true, // 开启流式
            }),
          });

          console.log(response, '/////')

          if (!response.body) throw new Error('No response body');

          // 4. 将 DeepSeek 的流 转换为 Vercel AI SDK 格式并转发
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            // 解析 OpenAI 格式的 SSE 数据
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6));
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    // 按照 Vercel AI SDK 协议格式写入：0:"内容"\n
                    res.write(`0:${JSON.stringify(content)}\n`);
                  }
                } catch (e) {
                  // 忽略部分解析错误
                }
              }
            }
          }

          res.end();
        } catch (error) {
          console.error('Mock Proxy Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch DeepSeek' }));
        }
      });
    },
  },
] ;