const WebSocket = require('ws');
const http = require('http');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Server Running\n');
});

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    // 发送欢迎消息
    ws.send('Welcome to the WebSocket server!');
});

// 监听端口
server.listen(8080, () => {
    console.log('Listening on http://localhost:8080');
});