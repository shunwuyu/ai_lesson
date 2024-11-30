const http = require('http');
require('dotenv').config();
const OpenAI = require('openai');
const url = require('url');
const querystring = require('querystring');

// 现在你可以像使用普通环境变量一样使用它
const openaiApiKey = process.env.OPENAI_KEY;
console.log(openaiApiKey, '////');

const client = new OpenAI({
    // 凭证 密钥  算力收费  token
    apiKey: 'sk-DQyFVvlYDkVEcwRy1uY6WOkEz0AUhGeQRdSQ0mXKA4JgCp8M',
    baseURL: 'https://api.302.ai/v1'
})

const server = http.createServer(async(req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源访问，也可以指定具体的域名，如'http://example.com'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的请求方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // 允许的请求头
  
    if (req.method === 'OPTIONS') { // 处理预检请求
        // 预检请求不需要返回具体数据，直接结束响应即可
        res.writeHead(204); // 204 No Content
        res.end();
    } else {
        console.log(req.url.indexOf('/api'));
        if (req.url.indexOf('/api') != -1) {
            const parsedUrl = url.parse(req.url, true);
            // 从解析后的URL中直接获取查询参数对象
            const queryObj = parsedUrl.query;
            // console.log(queryObj);

            let prompt = `
                ${queryObj.data}

                请根据以上JSON数据，回答${queryObj.question}这个问题
            `
            // console.log(prompt);
            const response = await client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: prompt }],
                temperature: 0, // 控制输出的随机性，0表示更确定的输出
              });
          
            const result =  response.choices[0].message.content || '';
            let info = {
                message:result
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            res.end(JSON.stringify(info))
            return 
        }
        // 在这里处理请求和响应
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    }

    
});

server.listen(1234, () => {
    console.log('服务器正在运行在 http://localhost:1234/');
});
