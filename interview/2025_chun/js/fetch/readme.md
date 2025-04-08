# 介绍fetch请求

fetch 是一个现代的 JavaScript API，用于发起网络请求，替代了传统的 XMLHttpRequest。它基于 Promise，提供了更简洁和灵活的方式来处理异步请求。

- 基于promise, 使用链式调用，易于阅读和维护，好上手
- 支持多种请求方法：可以轻松发起 GET、POST、PUT、DELETE 等请求，支持自定义请求头和请求体。
- 处理响应：fetch 返回一个 Response 对象，提供多种方法（如 .json()、.text()、.blob()）来处理响应数据。

- 跨域请求：支持 CORS（跨源资源共享），可以通过设置请求头来处理跨域请求。
```
async function fetchDataWithCORS(url) {
    try {
        const response = await fetch(url, {
            method: 'GET', // 请求方法
            headers: {
                'Content-Type': 'application/json', // 设置请求头
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // 示例：添加授权头
            },
            mode: 'cors', // 设置 CORS 模式
            credentials: 'include' // 发送 cookies，适用于需要身份验证的请求
        });

        // 检查响应是否成功
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // 解析 JSON 数据
        console.log('Fetched data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 使用示例
fetchDataWithCORS('https://api.example.com/data');
```

- 流式处理：支持读取响应体的流式数据，适合处理大文件下载或实时数据流。
```
async function fetchStreamedData(url) {
    try {
        const response = await fetch(url);

        // 检查响应是否成功
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 获取可读流
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';

        // 逐块读取数据
        while (true) {
            const { done, value } = await reader.read();
            if (done) break; // 读取完成

            // 解码并处理数据块
            result += decoder.decode(value, { stream: true });
            console.log('Received chunk:', result);
        }

        // 完成后处理最终数据
        console.log('Final data:', result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 使用示例
fetchStreamedData('https://example.com/large-file.txt');
```

## 使用场景：
- API 调用：在单页应用中，使用 fetch 进行 RESTful API 调用，获取和提交数据。
- 文件上传：结合 FormData 对象，使用 fetch 实现文件上传功能。
- 数据获取：在组件生命周期中使用 fetch 获取数据并更新 UI。

## 手写fetch 
