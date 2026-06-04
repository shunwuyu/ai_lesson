// console.log(import.meta.env.VITE_DEEPSEEK_API_KEY);
const endpoint = 'https://api.deepseek.com/chat/completions';
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
};

const payload = {
    model: 'deepseek-v4-flash',
    // model: 'deepseek-v4-pro',
    messages: [
        {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: "你好 Deepseek"}
    ],
    stream: false, // 是否开启流式返回
};


try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    document.getElementById('reply').textContent = data.choices[0].message.content;
} catch (err) {
    console.error('请求出错:', err);
    document.getElementById('reply').textContent = '请求失败: ' + err.message;
}