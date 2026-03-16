# 星物种

- 公司

1. 公司业务
AI 机器人，当前最火方向，值得加入。
2. 公司规模
20-99人， 虽然小，但是已经A轮融资，发展会很快。
3. 待遇
一周三天， 实习
150-250元/月， 杭州开销小，中等待遇。
公司在科技城， 下午茶、团建等，环境应该可以。
4. 技术栈
react + ts 
跨端是加分项
需要了解App 发布流程，（公司前端团队较弱，问有没有人带）一人搞定多端
AI编程能力 要求一般

## 浏览器的渲染机制

头脑中要有架构图

- 首先，浏览器拿到 URL 之后会发起网络请求，开始下载 HTML。HTML 是流式解析的，也就是说边下载边解析。HTML 解析器会把标签逐步解析成 DOM Tree。在解析过程中如果遇到 CSS，浏览器会发起 CSS 请求，并交给 CSS 解析器生成 CSSOM。

  如何解析流式传输中不完整的 JSON 数据？
  维护一个缓冲区来累积接收到的 JSON 片段
  当接收到新的 JSON 片段时，将其追加到缓冲区中
  检查缓冲区是否包含完整的 JSON 对象
  如果是，解析缓冲区中的 JSON 字符串
  如果不是，继续等待下一个 JSON 片段的到达

  ```
  <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>SSE 流式 JSON 接收示例</title>
    <style>
        .container {
            width: 800px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #eee;
        }
        .log-box {
            height: 400px;
            border: 1px solid #ccc;
            padding: 10px;
            overflow-y: auto;
            margin-top: 20px;
            font-family: monospace;
            font-size: 14px;
        }
        .success { color: #2ecc71; }
        .warning { color: #f39c12; }
        .error { color: #e74c3c; }
        .info { color: #3498db; }
    </style>
</head>
<body>
    <div class="container">
        <h2>SSE 流式 JSON 接收演示</h2>
        <button id="connectBtn">建立 SSE 连接</button>
        <button id="closeBtn" disabled>关闭连接</button>
        <div class="log-box" id="logBox"></div>
    </div>

    <script>
        // 获取DOM元素
        const connectBtn = document.getElementById('connectBtn');
        const closeBtn = document.getElementById('closeBtn');
        const logBox = document.getElementById('logBox');

        // 全局变量：SSE连接实例、JSON缓冲区
        let sse = null;
        let jsonBuffer = '';

        // 日志输出函数
        function log(message, type = 'info') {
            const logItem = document.createElement('div');
            logItem.className = type;
            logItem.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
            logBox.appendChild(logItem);
            // 自动滚动到底部
            logBox.scrollTop = logBox.scrollHeight;
        }

        // 解析流式JSON的核心函数
        function parseStreamingJSON(chunk) {
            // 1. 将新接收的片段拼接到缓冲区
            jsonBuffer += chunk;
            log(`接收片段并拼接缓冲区：${chunk}`, 'info');
            
            try {
                // 2. 尝试解析完整的JSON
                const completeData = JSON.parse(jsonBuffer);
                log(`✅ 解析成功！完整JSON数据：${JSON.stringify(completeData, null, 2)}`, 'success');
                // 3. 解析成功后清空缓冲区
                jsonBuffer = '';
                return completeData;
            } catch (error) {
                // 捕获JSON不完整的语法错误
                if (error instanceof SyntaxError) {
                    log(`⚠️ 当前JSON不完整：${error.message}，继续等待后续片段...`, 'warning');
                } else {
                    log(`❌ 解析异常：${error.message}`, 'error');
                }
                return null;
            }
        }

        // 建立SSE连接
        connectBtn.addEventListener('click', () => {
            // 关闭已有连接（防止重复连接）
            if (sse) {
                sse.close();
            }
            
            // 重置缓冲区
            jsonBuffer = '';
            log('开始建立SSE连接...', 'info');

            // 建立SSE连接（后端地址根据实际情况修改）
            sse = new EventSource('http://localhost:3000/sse');

            // 监听连接成功
            sse.onopen = () => {
                log('✅ SSE连接已建立', 'success');
                connectBtn.disabled = true;
                closeBtn.disabled = false;
            };

            // 监听后端推送的消息（核心：接收JSON片段）
            sse.onmessage = (event) => {
                if (event.data) {
                    // 解析接收到的JSON片段
                    parseStreamingJSON(event.data);
                }
            };

            // 监听连接错误
            sse.onerror = (error) => {
                log(`❌ SSE连接错误：${error.message}`, 'error');
                sse.close();
                connectBtn.disabled = false;
                closeBtn.disabled = true;
            };
        });

        // 关闭SSE连接
        closeBtn.addEventListener('click', () => {
            if (sse) {
                sse.close();
                log('🔌 SSE连接已关闭', 'info');
                connectBtn.disabled = false;
                closeBtn.disabled = true;
            }
        });

        // 页面关闭时自动关闭连接
        window.addEventListener('beforeunload', () => {
            if (sse) {
                sse.close();
            }
        });
    </script>
</body>
</html>
  ```
- 接着，如果在解析 HTML 的过程中遇到 JavaScript，默认情况下 JS 会阻塞 DOM 构建。原因是 JS 可能会修改 DOM 结构或者样式，比如 document.write 或者修改节点，所以浏览器必须先暂停 DOM 解析，交给 V8 引擎执行 JS，执行完之后再继续解析 HTML。

- 然后，当 DOM Tree 和 CSSOM Tree 都构建完成后，浏览器会把它们合并生成 Render Tree（渲染树）。渲染树只包含需要显示的节点，比如 display: none 的节点不会进入渲染树。

- 接着进入 Layout（回流 / 重排）阶段，浏览器会根据盒模型、位置、尺寸等信息计算每个元素在页面中的几何位置和大小，生成布局树。

- 然后是 Paint（绘制），浏览器会把每个元素的颜色、背景、阴影、边框等绘制出来。

- 最后进入 Composite（合成）阶段。浏览器会把页面拆成多个 图层（Layer），比如 transform、opacity、position: fixed 等元素可能会单独成为合成层，然后交给 GPU 做图层合并（Layer Compositing），最终显示到屏幕上。

HTML解析 → DOM → CSSOM → Render Tree → Layout → Paint → Layer → Composite。

### 持续输出
- html 优化
  - 优先用语义化标签， 有利于代码维护和SEO,  不要通篇使用div
  - 合理使用 id/class，避免重复选择器，便于样式与脚本维护
  - 懒加载非首屏 DOM / 资源，图片懒加载，降低初始渲染压力；
  - 避免频繁操作 DOM，可先缓存节点或用文档片段批量更新。 document.createFragment()

- css 优化 
  - 小图标转 base64 减少请求，大资源仍用外链避免 CSS 体积过大
  - 抽离通用样式做公共类，减少代码冗余；
  - 合理使用 CSS 变量，统一主题样式，便于维护；
  - 避免！important 滥用，按权重规范编写，增强可维护性。
  - tailwindcss原子类（如 px-4、flex）组合样式，无需写自定义 CSS
  - 样式复用性高，类名语义化，减少命名成本
  - 按需编译，体积可控，适配响应式更便捷；
  - 团队风格统一，降低样式冲突与维护成本

- script 优化
  - script 放底部或加 defer/async，避免阻塞 DOM 渲染；
  - 变量用 let/const，减少全局变量污染；
  - 频繁 DOM 操作先缓存节点，批量更新；
  - 函数拆分复用，避免冗长代码；
  - 异步逻辑用 async/await，替代回调地狱。
  
### 性能优化
- 减少 JavaScript 阻塞解析
HTML 解析时遇到 <script> 默认会阻塞 DOM 构建，因为 JS 可能修改 DOM。
<script defer src="app.js"></script>
<script async src="analytics.js"></script>
或放到底部
defer 等 HTML 解析完按序执行；async 下载完立即执行，可能阻塞解析且无序。
async 脚本一旦下载完成，会立即暂停 HTML 解析去执行脚本

- 减少回流（Layout / Reflow）
回流需要重新计算 元素几何位置和尺寸，代价非常高。

常见触发：

修改 width / height / margin / padding

修改 font-size

DOM 插入删除

读取布局属性

el.offsetHeight
el.getBoundingClientRect()
优化方式

批量修改 DOM

使用 documentFragment

避免频繁读写 DOM

// 不推荐
div.style.width = "100px"
div.style.height = "200px"

// 推荐
div.style.cssText = "width:100px;height:200px"

- 3️⃣ 减少重绘（Paint）
  重绘只改变 视觉样式，不改变布局，例如：

color

background

visibility

虽然比回流轻，但大量重绘仍然会影响性能。

优化方式

避免频繁修改样式：

// 不推荐
el.style.background = "red"
el.style.color = "white"

// 推荐
el.classList.add("active")

让 CSS 控制样式变化。

- 使用 GPU 合成层（减少 Layout / Paint）
浏览器最终是通过 Layer → GPU 合成（Composite） 渲染页面。

如果元素成为 独立合成层，动画只需要 GPU 合成，不需要重新布局和绘制。

推荐使用的属性

transform: translateX(100px);
opacity: 0.5;

而不是：

left: 100px;   /* 会触发 layout */
top: 100px;

## 2. GET 和 POST 的区别，以及一次 HTTP 请求包含哪些信息

1. GET 和 POST 的核心区别。

从 Restful HTTP 语义上来说，
GET 是获取资源，POST 是提交数据新增资源。

GET /api/user?id=1 获取用户信息
POST /api/user POST：创建用户

2. 它们在数据传输方式上有区别。

GET 的参数一般放在 URL QueryString 里：

/api/user?id=1&name=andrew
长度一般在2kb-8kb 左右, 看浏览器

POST 的数据一般放在 Request Body：

{
  "id": 1,
  "name": "andrew"
}

其实 HTTP 协议本身并没有强制 GET 不能有 body，只是浏览器和服务器约定俗成不用。

3. 缓存
GET /api/article/1 请求 10 次结果是一样的（幂等）。 可以缓存起来，减少请求次数。 无状态协议
POST 请求：默认 不缓存 POST /api/order 如果请求两次可能生成两个订单（非幂等）。

4. 安全性
  GET 参数在 URL 中可见
  POST 在 body 中

  POST 比 GET 安全，其实这是个误区。 
  HTTP 本身都是明文传输，真正的安全来自：
  HTTPS（TLS 加密）

  POST 只是“相对不暴露”，不是更安全。

- HTTP 请求包含信息
  一次完整的 HTTP 请求主要包括三部分：
  - 请求行（Request Line）
  GET /api/user?id=1 HTTP/1.1
    请求方法、请求路径、HTTP 版本
  - 请求头（Headers）
  Host: api.example.com
  User-Agent: Chrome
  Content-Type: application/json
  Authorization: Bearer token
  Cookie: sessionId=xxx
  - 请求体（Body）
  一般出现在 POST / PUT / PATCH 请求：

- 为什么 TCP 要三次握手

  首先客户端发送 SYN 报文，请求建立连接；
  接着服务器返回 SYN + ACK，表示收到请求并同意连接；
  最后客户端再发送 ACK 确认。

  三次握手的目的，是确认双方收发能力正常，并防止历史失效连接建立。

## fetch 和xhr 区别

- 首先说历史背景。
  早期浏览器如果想请求服务器数据，只能 整页刷新，重走一次服务器，体验不好。
  后来浏览器推出了 XHR（XMLHttpRequest），这就是 AJAX 的核心技术。

  页面可以在 不刷新整个页面的情况下向服务器请求数据并更新局部 DOM。

  ```
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "/api/user", true)
  xhr.onload = () => {
    console.log(xhr.responseText)
  }
  xhr.send()
  第三个参数是 async 默认值：true（异步）。 false (同步)： 
  发送请求后，浏览器会卡住（阻塞），直到服务器返回结果才继续执行后续代码。
  缺点：会导致页面“假死”，用户无法操作，体验极差
  ```
  - 不过 XHR 设计比较早（2000 年左右），存在一些问题：
    - API 事件驱动，写法复杂
    - 回调地狱
    - 不支持 Promise
    - 流式处理能力弱
- 随着 ES6 和 Promise 普及，浏览器推出了 Fetch API，目的是：
  用 Promise + 更现代的接口 重新设计网络请求。

  ```
  fetch("/api/user")
  .then(res => res.json())
  .then(data => console.log(data))
  ```
  ### 区别

  - XHR 是 事件驱动模型：
  - Fetch 是 Promise 模型：
  - 第二，数据处理方式不同
    xhr.responseText XHR 返回数据是一次性读取：
  - Fetch 基于 Stream（ReadableStream）：
    所以 Fetch 可以 流式读取数据，在大文件下载或视频流场景更有优势。
  - 第三，错误处理机制不同
    XHR：
    HTTP 404 / 500 也会进入 onload
    Fetch：
    只有网络错误才会 reject 

  - 第四，请求能力
    Fetch 支持很多现代 Web 能力： 
    Request / Response 对象
    流式数据
    Service Worker
    更好地支持 CORS

    XHR 是早期 AJAX 的核心实现，让网页可以异步请求数据而不用整页刷新；Fetch 是现代浏览器推出的新 API，用 Promise 和 Stream 重构了网络请求模型，使代码更简洁，也支持更强的流式处理能力和现代 Web 架构。

    - 为什么 axios 还在用 XHR，而不是 fetch

    axios 使用 XHR 主要因为历史浏览器兼容性更好，同时 XHR 原生支持上传下载进度监听，并且 axios 需要同时兼容 浏览器和 Node 环境，实现更稳定统一的 HTTP 请求封装。
    Node.js 18 之前原生不支持 fetch 需安装 node-fetch 

    ```
    const xhr = new XMLHttpRequest();
const url = "/api/upload";
const formData = new FormData();
formData.append("file", fileInput.files[0]); // 假设有一个文件输入框

xhr.open("POST", url);

// 1. 监听上传进度 (注意是 xhr.upload)
xhr.upload.onprogress = (e) => {
  if (e.lengthComputable) {
    const percent = ((e.loaded / e.total) * 100).toFixed(2);
    console.log(`上传进度: ${percent}%`);
    // 这里可以更新 UI 进度条
  }
};

// 2. 监听下载进度 (注意是 xhr 本身，通常用于大文件下载)
xhr.onprogress = (e) => {
  if (e.lengthComputable) {
    const percent = ((e.loaded / e.total) * 100).toFixed(2);
    console.log(`下载进度: ${percent}%`);
  }
};

xhr.onload = () => {
  if (xhr.status === 200) {
    console.log("完成:", xhr.responseText);
  }
};

xhr.onerror = () => console.error("请求失败");

xhr.send(formData);
    ```

## 知道重绘重排吗

- 重排（Reflow 旧称 / Layout 标准术语）：浏览器需要重新计算元素的 位置和尺寸
- 重绘（Repaint）：元素 外观改变但不影响布局，只重新绘制样式

**重排一定会触发重绘，但重绘不一定触发重排。**

举个例子
div.style.width = "200px" 
浏览器需要重新计算布局，所以会触发 重排 + 重绘。

但如果只是改颜色：

div.style.color = "red"
布局没变，只会触发 重绘。

性能坑的例子。

如果代码频繁 读写 DOM 布局信息：
div.style.width = "100px"
console.log(div.offsetHeight)
div.style.width = "200px"

offsetHeight 会强制浏览器 立即计算布局，可能触发 多次重排，这就是常见的 layout thrashing。

三点优化：

第一，减少 DOM 操作

div.style.cssText = "width:100px;height:200px"

第二，用 transform 代替位置变化

不推荐：

left: 100px;

推荐：

transform: translateX(100px);

因为 transform 只会触发合成（Composite），不会触发重排。

第三，批量操作 DOM

const fragment = document.createDocumentFragment()

先在内存中构建 DOM，再一次插入。

- 比如为什么 display:none 比 visibility:hidden 性能更好？
display:none 移除渲染树，不占空间；visibility:hidden 仍占位且可能触发重绘。

- 为什么 transform 不触发 reflow
  transform 仅影响合成层，由 GPU 处理，不改变文档流几何布局。

- 什么操作会触发 重排（Reflow / Layout）？
  核心点：重排是浏览器重新计算元素几何属性（如宽高、位置）

常见触发操作：

修改元素几何属性：width、height、margin、padding、border

DOM 结构变化：appendChild、removeChild、innerHTML

字体、内容变化：改变文本、textContent

浏览器必须知道尺寸的读取操作：offsetWidth、clientHeight、getComputedStyle()

## 全面深入讲一下 Promise，连续三条请求该如何处理

- Promise 是什么：
Promise 是 ES6 提供的异步编程解决方案，用于表示一个可能当前完成或失败的异步操作及其结果。

状态：

pending（等待）

fulfilled（成功）

rejected（失败）

特点：

可以链式调用 .then()，避免回调地狱

错误可集中捕获 .catch()

可以通过 Promise.all / Promise.race/ Promise.allSettled/ Promise.any（） 处理多个异步

- Promise.any(iterable)
  行为：只要有一个 Promise 成功，就立即返回该成功结果。
返回值：第一个成功的 Promise 的值。
失败条件：只有当所有 Promise 都失败时，它才会被 reject，并抛出一个 AggregateError（聚合错误）。
  特点：适合“竞速”场景，只要有一个源可用即可（例如：从多个 CDN 镜像加载资源，谁快用谁）。

- Promise.allSettled(iterable) 多生孩子
行为：等待所有 Promise 完成（无论成功还是失败）。
返回值：一个数组，包含每个 Promise 的结果对象。
成功：{ status: 'fulfilled', value: ... }
失败：{ status: 'rejected', reason: ... }
特点：永远不会被 reject。适合需要知道每个任务最终状态的场景（例如：一次性请求多个接口，部分失败也要展示成功的数据）。

- Promise.all 

  all	全部成功	任意一个失败	成功值数组	依赖所有数据的页面初始化

- Promise.race 
  race	任意一个完成 (成功/失败)	同左	第一个完成的结果	超时控制、快速响应

  ![手写](https://juejin.cn/post/7069805387490263047?searchId=20260316110731FEA05A60D5E915C17C64)

- Promise 的链式调用

每个 .then() 会返回一个新的 Promise，可以连续处理多个异步操作：
  ```
  fetch('/api/1')
  .then(res1 => fetch(`/api/2?param=${res1.id}`))
  .then(res2 => fetch(`/api/3?param=${res2.id}`))
  .then(res3 => console.log('最终结果', res3))
  .catch(err => console.error('出错了', err));
  ```
  上一步的结果会传递给下一步

  如果某一步失败，链条会跳到最近的 .catch()

- 连续三条请求的处理方法
  方法一：链式 Promise（顺序依赖）
  ```
  function request1() { return fetch('/api/1'); }
function request2(res1) { return fetch(`/api/2?id=${res1.id}`); }
function request3(res2) { return fetch(`/api/3?id=${res2.id}`); }

request1()
  .then(res1 => request2(res1))
  .then(res2 => request3(res2))
  .then(res3 => console.log('结果', res3))
  .catch(err => console.error('请求失败', err));
  ```
- 方法二：async/await（语法糖，更清晰）
  ```
  async function runRequests() {
  try {
    const res1 = await request1();
    const res2 = await request2(res1);
    const res3 = await request3(res2);
    console.log('最终结果', res3);
  } catch (err) {
    console.error('请求失败', err);
  }
}
runRequests();
  ```
- 并行请求（无顺序依赖）
  ```
  Promise.all([request1(), request2(), request3()])
  .then(([res1, res2, res3]) => {
    console.log('三个结果同时返回', res1, res2, res3);
  })
  .catch(err => console.error('至少有一个请求失败', err));
  ```

- Promise.all 并不是多线程并发，而是“异步并发”，本质上 JS 仍是单线程执行。它会同时发起多个异步操作（如网络请求、定时器、I/O），主线程不会阻塞，但回调通过 事件循环排队执行。面试回答可说：Promise.all 并发是逻辑上同时发起异步任务，实际执行仍依赖单线程事件循环管理，保证非阻塞性。

## Async/Await 

async/await 是基于 Promise 的语法糖，用同步写法处理异步逻辑。

async 保证函数返回 Promise；

await 暂停函数执行，等待 Promise 结果，再继续后续代码。

本质不是多线程，仍然是 单线程 + 事件循环（Event Loop）。
await 暂停当前 async 函数，但不阻塞主线程，其背后通过 Promise.then 注册后续流程。

✅ 重点理解（简洁表达）

语法糖：比 .then/.catch 更清晰、更像同步代码。

错误捕获：支持传统 try/catch。

并发注意：连续 await 是顺序；要并发请用 Promise.all。

✅ 手写简化版 async/await 实现
function myAsync(fn) {
  return function(...args) {
    const gen = fn.apply(this, args);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let result;
        try {
          result = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        if (result.done) {
          return resolve(result.value);
        }
        Promise.resolve(result.value).then(
          val => step("next", val),
          err => step("throw", err)
        );
      }
      step("next");
    });
  };
}

// 使用示例
const foo = myAsync(function* () {
  const a = yield Promise.resolve(1);
  const b = yield Promise.resolve(2);
  return a + b;
});

foo().then(console.log); // 3