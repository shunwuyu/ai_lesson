const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    const headers = {
      // 'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Origin': 'http://localhost', // 允许的源
        'Access-Control-Allow-Methods': 'GET, PUT', // 允许的方法
        'Access-Control-Allow-Headers': 'Content-Type, X-Custom-Header', // 允许的头部
        'Access-Control-Max-Age': '86400' // 预检请求的有效期（秒）
    };

    // 处理OPTIONS预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    // 处理PUT请求
    if (req.method === 'PUT' && req.url === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 将数据块转换为字符串并拼接
        });

        req.on('end', () => {
            console.log('Received data:', body);
            res.writeHead(200, headers);
            res.end(JSON.stringify({status: 'success', message: 'Data received'}));
        });
        console.log('//////')
        // res.end(JSON.stringify({status: 'success', message: 'Data received'}));
    } else {
        res.writeHead(404, headers);
        res.end('Not Found');
    }
});

// 启动服务器
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});