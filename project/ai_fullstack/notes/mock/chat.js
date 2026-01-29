// mock/chat.ts
// 流式输出本质就是“边算边给”，而不是等全部结果生成完再一次性返回。
// 在 AI 场景里，模型生成文本是逐 token 产生的（模型每次基于已生
// 成的 token 序列，通过自回归方式预测下一个最可能的 token，
// 重复此过程直至结束），如果等完整结果再返回，
// 首屏延迟会非常高，用户体验差。
// 代码层面一般通过 HTTP chunked（Chunked 就是把数据切成一块一块（chunks）来传，
// 不用等全部准备好，每生成一块就发一块，接收方可以边收边处理， 垒墙的砖块啊） +
// Server-Sent Events。
//  SSE 协议 实现：后端先返回响应头，
// Transfer-Encoding: chunked  
// 不调用 res.end()
// 只要服务端不 end，TCP 连接就会一直保持。
//  保持连接不关闭，然后不断 res.write 推送数据。

// 我用 mock 服务作为中转，调用 DeepSeek 的 stream=true 接口，读取 ReadableStream，
// 解析每一段 data: 的增量内容，再按 Vercel AI SDK 的数据流协议转发给前端。

// 好处是：前端可以实时渲染内容、支持打字机效果，同时后端压力更可控，
// 这也是目前大模型交互的主流实现方式。

// 这段代码本质上是在处理 SSE 格式的数据 
// DeepSeek 的 stream=true 返回的是 SSE（text/event-stream）

import {config} from 'dotenv';
config();

export default [
  {
    url: '/api/ai/chat',
    method: 'post',
    // 使用 rawResponse 来处理流
    // 我不想让 mock 框架帮我“封装响应”，我要自己来， 
    // 让你可以直接接管原始的 req / res。
    rawResponse: async (req, res) => {
      console.log('///////////////////')
      let body = '';
      // chunk 到达就是触发data 事件
      // 1. 解析请求体 (获取 messages)
      // chunk 默认是 Buffer，不是字符串。 
      // Buffer 是 Node.js 用来处理二进制数据的内存块，就像一段原始的、可读写的字节数组。
      // JavaScript 会自动调用 chunk.toString()（默认使用 UTF-8 编码），将 Buffer
      //  转为字符串再拼接到 body 上。因此，无论来了多少个 chunk，最终 body 都是一个完整的字符串。
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', async () => {
        console.log(body, '/////////////////////////////');
        try {
          // {"messages": [{"role": "user", "content": "你好"
          // , "role": "assistant": "我是deepseek"}]}
          const { messages } = JSON.parse(body);
          console.log(messages, '--------')

          // 2. 设置响应头，告知浏览器这是一个流式响应
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          // 服务器将分块（chunk）发送响应体，而不是一次性返回完整内容。
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
            console.log(chunk);
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