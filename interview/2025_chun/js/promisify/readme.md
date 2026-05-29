- 原生请求 axios
    Axios 是基于 XMLHttpRequest（XHR）实现的，不是基于 fetch。它封装了 XHR，提供了更友好的 Promise API 和丰富的功能，如拦截器、取消请求等。
    兼容性更好
    功能更丰富
    易于配置
- 如何使用xhr实现一个请求，支持promise调用
    1.js

- -个普通函数如何支持promise调用
    可以用 Promise.resolve 包装普通函数的返回值，让其支持 Promise 调用。示例：

- xhrm原生方法
    1. open(method, url, async, user, password)
初始化请求参数（请求方法、URL、是否异步、用户名、密码）。
示例：xhr.open('GET', '/api', true);
    2. send(body)
发送请求。body 可选，用于 POST/PUT 等方法传递数据。
示例：xhr.send(); 或 xhr.send(JSON.stringify(data));
    3. 3. setRequestHeader(header, value)
设置 HTTP 请求头。必须在 open 之后、send 之前调用。
示例：xhr.setRequestHeader('Content-Type', 'application/json');
    4. abort()
终止当前请求。
示例：xhr.abort();
    5. getAllResponseHeaders()
获取所有响应头，返回字符串。
示例：xhr.getAllResponseHeaders();
    6. onreadystatechange

- 监听请求状态的变化

    判断 xhr.readyState 的变化，常在 readyState === 4 时处理响应，实现对请求状态的追踪和响应处理。
    0：UNSENT（未初始化）
    1：OPENED（已打开）
    2：HEADERS_RECEIVED（已接收响应头）
    3：LOADING（正在接收响应体）
    4：DONE（请求完成）