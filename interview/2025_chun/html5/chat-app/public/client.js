// public/client.js
const chatBox = document.getElementById('chat');
const input = document.getElementById('input');

// 创建 WebSocket 连接
const socket = new WebSocket(`ws://${window.location.host}`);

// 当连接成功时
socket.onopen = () => {
    console.log('Connected to the server');
};

// 当收到服务器消息时
socket.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // 自动滚动到底部
};

// 发送消息函数
function sendMessage() {
    const message = input.value.trim();
    if (message !== '') {
        socket.send(message);
        input.value = ''; // 清空输入框
    }
}

// 处理回车键发送消息
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});