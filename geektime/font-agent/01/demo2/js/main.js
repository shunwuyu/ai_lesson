const endpoint = 'https://api.coze.cn/open_api/v2/chat';

const payload = {
    bot_id: import.meta.env.VITE_BOT_ID,
    user: 'yvo',
    query: '你好',
    chat_history: [],
    stream: false,
    custom_variables: {
        prompt: "你是一个AI助手"
    }
};

const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(payload),
});

const data = await response.json();
document.getElementById('reply').textContent = data.messages[0].content;