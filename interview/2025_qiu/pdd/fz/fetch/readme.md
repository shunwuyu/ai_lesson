# 介绍fetch请求

fetch 是浏览器原生提供的 基于 Promise 的网络请求 API，用于替代旧的 XMLHttpRequest，可以发送 GET/POST 等 HTTP 请求并处理响应数据。

- 基于 Promise，支持链式调用
- 默认不发送 cookies（可通过 credentials 配置）
  默认情况下，fetch(url) 使用的是 credentials: 'omit'，即忽略 Cookie。
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include'  // 包括跨域请求的 Cookie
  })
  credentials: 'same-origin'：同源请求时发送 Cookie。
  credentials: 'include'：始终包含 Cookie，包括跨域请求。
  credentials: 'omit'：从不发送 Cookie（默认）。


  响应对象（Response）只会 reject 网络错误，不会 reject 4xx/5xx 状态
  fetch 的 Response 对象只会在网络错误（如断网、DNS 解析失败、请求超时）时返回 reject，而当服务器返回 4xx（如 404）或 5xx（如 500）等 HTTP 错误状态码时，fetch 依然会 resolve，只是需要手动判断。
  fetch('/api/data')
  .then(response => {
    // 即使是 404 或 500，这里依然会执行
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .catch(err => {
    console.error('网络错误或 HTTP 错误:', err);
  });
支持 Request / Response 对象进行更灵活的请求控制
  // 1. 使用 Request 对象配置请求
const request = new Request('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Tom' }),
  credentials: 'include' // 携带 Cookie
});

fetch(request)
  .then(res => res.json())
  .then(data => console.log(data));