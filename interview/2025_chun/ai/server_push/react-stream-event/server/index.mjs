import dotenv from 'dotenv';
import http from 'http';
import { OpenAI } from "openai";
dotenv.config();

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.302.ai/v1'
});

// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/stream') {
    console.log('---------------')
    // res.end('///')
    // 设置 HTTP 响应头，开启长连接，适用于 SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

  //   // 发送数据
  //   const sendChunk = (chunk) => {
  //     res.write(`data: ${chunk}\n\n`);
  //   };

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "写一首关于流星的诗" }],
        stream: true, // 启用流式输出
      });
      // console.log(response)
      // res.write(`data: 11\n\n`);
      for await (const chunk of response) {
        res.write(`data: ${chunk.choices[0]?.delta?.content || ""}\n\n`);
        // console.log(chunk.choices[0]?.delta?.content || "");
      }
    } catch(err) {
      console.log(err);
    }
   
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// 启动服务器监听端口 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
