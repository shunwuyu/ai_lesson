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

  ```js
  async function runRequests() {

  try {
    const res1 = await request1();
    const res2 = await request2(res1);
    const res3 = await request3(res2);
    console.log('最终结果', res3);
  } catch (err) {
    console.error('请求失败', err);
  }
  runRequests();
  ```

##

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

## 平时使用的开发框架，react的组件通信，用过哪些hooks，自己封装过哪些hoos和组件，表单和表格在封装时要注意哪些信息

### 平时使用的开发框架
- 前端的话，我主要是基于 React 技术栈在做项目
  组件库这块我用过 shadcn/ui 和 Vant，后台开发使用 阿里的Ant Design。
  - shadcn/ui 按需加载，且代码直接可定制，可维护性和个性化设计非常友好，适合中后台之外的项目或者需要深度定制 UI 的场景。
  - [Vant](https://react-vant.3lang.dev/components/flex) 我主要用在移动端项目，它的组件对触摸交互、适配等做得很好，开箱即用，开发效率很高。
  - [Ant Design](https://ant-design.antgroup.com/components/overview-cn/) 更多是在中后台场景，它的组件体系非常完整，设计规范统一，适合快速搭建企业级应用。

- 后端的话我主要使用 NestJS
  - 它是基于依赖注入和MVC模块化设计的，结构上很清晰，适合做中大型项目
  - 基于 TypeScript，类型安全
  - 生态丰富
- AI 相关我有用过 LangChain
  - 它帮我把大模型调用做了工程化封装，比如 promptTemplate 管理、chain 组合、工具调用等
  - 在做一些“AI + 业务”的功能（比如对话、文本处理）时，可以快速把逻辑串起来，而不是只停留在简单调用 API
  - 我也尝试过把它和后端服务结合，比如在 NestJS 里封装 AI 服务层
  
- 未来的计划
  移动端RN开发框架 [expo](https://docs.expo.dev/)

  桌面端开发框架 [Tauri](https://tauri.app/?spm=5176.28103460.0.0.39f27551pJK3Rt)

### react的组件通信

不要一种一种去介绍， 得有思想，逻辑和组织

- 核心思想
React 组件通信本质是基于 **单向数据流（props down, events up）**的设计。
  - 父组件通过 props 向下传数据
  - 子组件通过 回调函数向上通知
  好处是：数据流清晰、可预测，方便维护和调试（这是 React 的核心设计哲学）

- 二、父子通信
  1. 父 → 子（props）
  关键：props
  本质：单向数据流
  <Child count={count} />
  2. 子 → 父（回调函数）
  关键：函数 props
  本质：事件回传（类似观察者思想）
  <Child onChange={setCount} />
  可以顺带说一句：
  这其实是一种“轻量的发布-订阅思想”，子组件“发布”，父组件“订阅”。

- 三、兄弟组件通信（一定会问）
  本质：状态提升（lifting state up）
  3. 把共享状态放到最近的公共父组件
  再通过 props 分发
  思想：集中状态，避免数据不一致

- 四、跨层级通信（避免层层传 props）

  4. Context
  关键 API：createContext / useContext
  const value = useContext(MyContext)
  思想：
  解决“props drilling（层层传参）”问题
  但可以加一句（加分）：
  Context 适合全局/稳定数据（主题、用户信息，登陆状态），不适合高频更新（容易引发性能问题）
  鼠标实时坐标若放Context，每秒触发数十次更新，会导致全局组件疯狂重渲染。
  ```
  import { createContext, useState, useEffect } from 'react';

// 1. 创建 Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 2. 初始化状态 (优先读取 localStorage，默认为 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  // 3. 切换主题函数
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme); // 持久化
  };

  // 4. 副作用：当 theme 变化时，更新 HTML 标签的 class (配合 Tailwind 或 CSS 变量)
  useEffect(() => {
    document.documentElement.className = theme; 
    // 如果是 Tailwind: document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
  ```
  ```
  import { ThemeProvider } from './ThemeContext';
import App from './App';

// 包裹你的应用
<ThemeProvider>
  <App />
</ThemeProvider>
  ```
  ```
  import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ 
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
      padding: '20px'
    }}>
      <h1>当前模式: {theme}</h1>
      
      {/* 绑定点击事件 */}
      <button onClick={toggleTheme}>
        切换到 {theme === 'light' ? '深色' : '浅色'} 模式
      </button>
    </header>
  );
};

export default Header;
  ```
- 更复杂通信（全局状态管理）
  5. 关键：全局 store

  本质：发布-订阅模式

  👉 思想：

  状态集中管理

  组件订阅状态变化自动更新
  zustand , 更轻量简单，用 hook 就可以订阅状态

- ref 通信（面试加分点）
  父操作子组件
  6. 关键 API：useRef + forwardRef + useImperativeHandle

- 事件总线（了解即可）
  7. EventBus
  本质：发布-订阅模式
  React 官方不推荐，因为容易造成状态不可追踪, 不好管理

- 总结
  React 的通信方式本质可以归纳为三类：

  单向数据流（props + 回调）

  共享状态（Context / 状态管理）

  发布-订阅（zustand / EventBus）

### 自己封装过哪些hooks?

- 在我做的 AI fullstack 项目里，其实有自己封装过一些 hooks
  useChat（对话类核心 hook）

👉 场景：AI 对话

封装内容：

消息列表 state（useState）

发送请求（AI 接口）

loading 状态

关键 API：

useState

useEffect

👉 思想：
把“UI + 业务逻辑”拆开，组件只负责展示

- useRequest（请求封装）
场景：所有接口请求统一处理

封装：

loading / error / data

请求触发逻辑

类似 ahooks 的 useRequest

- useDebounce / useThrottle（输入优化）

- useLocalStorage（持久化）
  把浏览器 API 抽象成 hook，提高复用性

使用阿里 [ahooks](https://ahooks.js.org/zh-CN/)

## 说一下数据类型，判断数据类型的方法，如何判断是一个数组
- ES5 里一共是 6种数据类型：
  - 基本类型（5个）
  number
  string
  boolean
  null
  undefined
  - 引用类型（1个）
  object
  其实像 Array、Function、Date 本质上都是 object 的子类型。
  Object.prototype.toString.call()   [object Array]
  统一使用“堆内存引用”机制来管理复杂数据结构
  支持动态属性扩展，继承自Object原型，通过原型链共享方法，实现统一的多态与继承机制。

- ES6+ 新增的数据类型
  ES6 新增了 2种基本类型：
  Symbol（唯一值，解决属性冲突）
  BigInt（处理大整数）
  总结一句：
  JS 一共有 8种数据类型（7种基本类型 + 1种引用类型）

- 三、判断数据类型的方法（重点）

  typeof（最基础）
  typeof 123        // 'number'
typeof 'abc'      // 'string'
typeof undefined  // 'undefined'
typeof Symbol()   // 'symbol'

  ❗ 缺点（亮点一定要说）：

typeof null // 'object'  ← 历史遗留 bug
typeof []   // 'object'

只能准确判断基本类型（除了 null）

- instanceof（判断构造函数）
[] instanceof Array // true
基于原型链判断（proto） 不能判断基本类型

- Object.prototype.toString（最准确）
Object.prototype.toString.call([]) 
// "[object Array]"

[object Number]
[object String]
[object Null]
[object Undefined]
Object.prototype.toString.call(arr) === '[object Array]'
这是判断类型最标准、最通用的方法

- Array.isArray（专门判断数组）

Array.isArray([]) // true
arr instanceof Array 可以用但不推荐

专门为数组设计

- 加分亮点

判断数组本质上是在判断它的内部 [[Class]] 属性，
Object.prototype.toString 就是通过读取这个内部标签来实现的。

- 手写一个 type 判断工具函数（面试高频）给我

基础版（推荐你面试写这个）
function getType(value) {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase()
}

- 进阶版（带缓存优化，面试亮点✨）

```
const typeMap = {}
;[
  'Number',
  'String',
  'Boolean',
  'Null',
  'Undefined',
  'Array',
  'Object',
  'Function',
  'Symbol',
  'BigInt',
  'Date',
  'RegExp'
].forEach(type => {
  typeMap[`[object ${type}]`] = type.toLowerCase()
})

function getType(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeMap[typeStr] || 'unknown'
}
```

- 加一个判断是否是“plain object”
function isPlainObject(obj) {
  return getType(obj) === 'object' && obj.constructor === Object
}

## 数组去重有哪些方式

数组去重本质是：
👉 判断“元素是否已经出现过”

不同方案的区别主要在：

- 是否支持复杂类型（对象）

- 性能（时间 / 空间）

- 代码简洁性

###  常见方案（按推荐程度说）
1. Set 去重（最常用，优先说）
const result = [...new Set(arr)]

优点：

代码最简洁
性能好（O(n)）
原生支持

缺点：

不能去重对象（引用不同就不相等）
[{a:1}, {a:1}] // 去不掉

基础类型数组（最推荐）

2. filter + indexOf（经典方案）

const result = arr.filter((item, index) => {
  return arr.indexOf(item) === index
})

优点：

兼容性好（ES5）
缺点：

性能较差（O(n²)）

逻辑上有重复查找

3. includes + 新数组

const result = []
arr.forEach(item => {
  if (!result.includes(item)) {
    result.push(item)
  }
})

优点：

逻辑直观
缺点：

性能 O(n²)

- Map / 对象 key 去重（重要！）

const result = []
const map = new Map()

arr.forEach(item => {
  const key = JSON.stringify(item)
  if (!map.has(key)) {
    map.set(key, true)
    result.push(item)
  }
})

优点：

O(n) 可以去重对象

可扩展（可以自定义 key）

缺点：
JSON.stringify 有局限（key 顺序、函数、undefined）

- reduce（函数式写法，加分项）

const result = arr.reduce((prev, cur) => {
  if (!prev.includes(cur)) {
    prev.push(cur)
  }
  return prev
}, [])

优点：

函数式风格

👎 缺点：

本质还是 O(n²)

## 对es6有哪些了解， 平时会用到哪些es6新特性
ES6 对我来说不只是“语法升级”，而是让 JavaScript 具备工程化能力的一次重要演进。

可以总结为三点：

代码更优雅、简洁（声明式）

更适合大型项目（模块化、类、作用域）

提供了很多底层能力（Promise、Proxy、Symbol），可以支撑框架设计

- 日常开发中高频使用的 ES6 特性

1. let / const（块级作用域）

👉 解决：

变量提升

闭包问题（for 循环）

👉 本质：

让作用域更可控，减少副作用

2. 解构赋值

const { data, error } = res

优势：

提高可读性

减少样板代码

👉 在项目中：
API 返回值处理 / hooks 返回值特别常用

3. 箭头函数

👉 本质：

不绑定 this

👉 场景：

回调函数

React 组件内部函数

- 模板字符串
`Hello ${name}`

👉 场景：

拼接 UI 文案

生成动态内容

- 模块化（import / export）

非常关键：

支持按需加载

支持 tree-shaking

👉 对大型项目的意义：

代码拆分 + 依赖管理

- 异步方案的进化

Promise（解决回调地狱）

👉 本质：

把异步变成“链式调用”

fetch().then().catch()

👉 优点：

状态明确（pending / fulfilled / rejected）

支持链式调用

- Generator（过渡方案）

function* gen() {
  yield fetch()
}

👉 特点：

可以“暂停函数执行”

👉 但缺点：

需要手动执行器（不直观）

- async / await（最终形态）
const res = await fetch()

👉 本质：

Promise 的语法糖

👉 优势：

写法接近同步代码

可读性极强

异步方案的演进，本质是在不断提高代码可读性和可维护性

- Proxy
拦截对象的读写操作

new Proxy(obj, {
  get(target, key) {},
  set(target, key, value) {}
})

可以实现数据劫持

Proxy 是实现现代响应式系统的底层能力之一

- Symbol（源码级理解🔥）

👉 特点：

唯一值

不会冲突

1. 防止属性名冲突
const key = Symbol()
obj[key] = 'value'
✅ 2. 源码中的“内部标识”

👉 比如：

React 内部用 Symbol 标识元素类型

避免用户覆盖

✅ 3. 实现“私有属性”

👉 一种弱私有方案

Symbol 是一种“安全的唯一标识”，在框架源码中非常常见

项目中的高级用法

用解构 + 默认值优化函数
function fetchData({ url, method = 'GET' }) {}
提高 API 可用性

使用展开运算符
setState(prev => ({ ...prev, count: prev.count + 1 }))


使用 Map / Set 做数据处理

👉 比 object 更语义化，性能更好

可选链 + 空值合并（ES2020，但可以带一句）
user?.profile?.name ?? 'default'

- class 本质（一定要先讲清楚）

👉 可以直接这样说：

ES6 的 class 本质上是 构造函数 + 原型链的语法糖，并没有改变 JavaScript 的继承机制。

- 字符串的 ES6+ 常用方法
  includes / startsWith / endsWith

  str.includes('abc')
str.startsWith('hi')
str.endsWith('.js')

👉 优势：

语义更清晰（替代 indexOf）

👉 场景：

搜索、匹配、校验

'hi'.repeat(3) // 'hihihi'

'5'.padStart(2, '0') // '05'

👉 场景：

时间格式化（很真实业务）


- 数组的 ES6+ 方法

Array.from（非常重要）
Array.from('abc') // ['a','b','c']

类数组 → 数组（NodeList、arguments）

Array.from({ length: 5 }, (_, i) => i)

Array.of

Array.of(1,2,3)

👉 解决：

new Array(3) // [empty × 3]

find / findIndex
arr.find(item => item.id === 1)

👉 优势：

找到就返回（比 filter 高效）

👉 场景：

查找单个元素（非常常用）

includes（数组版）
arr.includes(1)

👉 优势：

可以判断 NaN

👉 面试加分点：

[NaN].includes(NaN) // true

flat / flatMap（进阶🔥）
[1, [2, [3]]].flat(2)
arr.flatMap(x => [x * 2])

场景：

数据拍平（接口数据处理）

for (let [index, value] of arr.entries()) {}

👉 场景：

遍历增强（更结构化）

map reduce filter 

这些方法其实也让 JavaScript 更接近函数式编程范式，这也是为什么在 React 这种框架里会特别常用。



整体来说，我对 ES6 的理解不只是语法层面，而是：

用它提升代码的可读性和表达能力

用它支撑模块化和工程化开发

同时理解它在框架中的作用，比如 Proxy 做响应式、Symbol 做内部标识

## 手写快排

- 递归思想

  快速排序的递归核心是 “分治”：选一个基准值，将数组分成 “小于基准” 和 “大于基准” 的两部分（分区）；然后对这两个子数组递归执行同样操作，直到子数组长度为 1（递归终止条件）。每轮递归都让基准归位，最终所有元素有序。递归把大问题拆解成同逻辑的小问题，逐层解决后合并，就完成了排序。

  总结
  递归核心：分治思想，把数组拆分为基准两侧的子数组；
  递归逻辑：子数组重复 “选基准 - 分区” 操作，直到子数组长度为 1；
  最终结果：每轮基准归位，递归结束后整体有序。

  分治是快排的核心思想，递归是实现分治的编程手段，递归拆解分治的子问题。
  分治：快排的策略（拆分 - 解决 - 合并）；
  递归：实现分治的技术（重复调用自身处理子问题）。

  - 快
  冒泡等O(n^2)
  快排O(nlogn)

  分治递归将数组拆 logn 层，每层遍历 n 个元素分区，总操作数 n×logn 即 O (nlogn)。

  - js代码
  ```
  /**
 * 快速排序（分治递归版）
 * @param {Array} arr - 待排序的数组
 * @returns {Array} - 排序后的新数组
 */
function quickSort(arr) {
  // 递归终止条件：数组长度≤1时直接返回（无需排序）
  if (arr.length <= 1) {
    return arr;
  }

  // 1. 选基准值（这里选数组第一个元素，也可随机选优化最坏情况）
  const pivot = arr[0];
  // 2. 分治：拆分为小于基准、大于基准的两个子数组
  const left = []; // 存放小于基准的元素
  const right = []; // 存放大于基准的元素

  // 遍历剩余元素（从第二个开始，跳过基准）
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 3. 递归处理子数组 + 合并结果（左子数组排序 + 基准 + 右子数组排序）
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 运行案例
// 案例1：普通数字数组
const arr1 = [5, 2, 9, 3, 7, 6, 1, 8, 4];
console.log("案例1原始数组：", arr1);
console.log("案例1排序结果：", quickSort(arr1)); // [1,2,3,4,5,6,7,8,9]

// 案例2：含重复元素的数组
const arr2 = [8, 4, 3, 8, 5, 9, 4, 2];
console.log("\n案例2原始数组：", arr2);
console.log("案例2排序结果：", quickSort(arr2)); // [2,3,4,4,5,8,8,9]

// 案例3：已部分有序的数组
const arr3 = [1, 3, 2, 5, 4, 7, 6, 9, 8];
console.log("\n案例3原始数组：", arr3);
console.log("案例3排序结果：", quickSort(arr3)); // [1,2,3,4,5,6,7,8,9]

// 案例4：空数组/单元素数组（测试递归终止条件）
const arr4 = [];
const arr5 = [66];
console.log("\n案例4空数组排序：", quickSort(arr4)); // []
console.log("案例5单元素数组排序：", quickSort(arr5)); // [66]
  ```


## SKILLS
- MCP 是什么？
  MCP = 让 AI 连接外部世界（工具 / API / 数据）
  例如：

  - 调 GitHub API
  - 查数据库
  - 调支付接口
  MCP 解决的是：“能做什么”

  MCP 擅长标准化地连接和调度外部工具与数据源，却无法替代人类或高级智能体所具备的复杂情境判断、创造性策略制定以及跨领域模糊问题的综合决策能力。

  比如 MCP能查股价，却无法像专家一样综合局势判断是否该现在抛售。


Skills 技能， 指智能体自主规划与决策能力。

Skills = 可复用的 AI 专业能力包（Prompt + 规则 + 工具 +资源）

Skills 是一个文件夹

里面包含：

  - 指令（prompt）
  - 脚本（可执行逻辑）
  - 资源（模板/文档）

- AI 在需要时动态加载这些能力

类比：
Prompt = 一次性对话 无状态， RAG 增强， Tool 任务
Skills = “可复用的经验 + SOP” Standard Operating Procedure
指将经验固化为可重复执行的规范步骤。

在这个基础上 ， 小龙虾， 各种工作， 每种工作的做法就是一个SKILL

### 为什么 Skills 会爆火

1. 传统 Prompt 的问题

新手很容易理解：

帮我写一个 PRD
帮我写一个 PRD（结构清晰）
帮我写一个 PRD（符合公司规范）

问题：

每次都要重复描述

不稳定（换模型就变）

不可复用

- Skills 解决什么？

  - 可复用 一次写好，多次使用 
  - 标准化 团队统一 AI 行为
  - 可组合 多个 skill 组合成 agent
  - 低成本 不需要开发服务
Skills 是“instructions + scripts + resources 的组合”

- Skills 是什么？
  Skills = 教 AI 怎么做事情

  Skills 解决的是：“怎么做更好”

3. 对比总结（讲课用这个表）
对比	MCP	Skills
本质	工具连接协议	行为/流程封装
形式	server	markdown 文件
是否需要运行环境	✅ 需要	❌ 不需要
解决问题	能力扩展	能力优化
类型	动态	静态

- Skills + MCP = 完整 AI Agent

举个真实例子：

用户：分析这个 Excel

MCP：
👉 读取 Excel 文件

Skills：
👉 按公司规则分析 + 输出报告


### 官方Skill 示例

- brand-guidelines
https://github.com/anthropics/skills/tree/main/skills/brand-guidelines

让 AI 输出“符合品牌规范的内容（颜色 + 字体 + 风格）”

比如：

UI 代码 → 自动套品牌色

PPT → 自动统一视觉风格

文档 → 自动符合设计系统

每个 Skill 都是一个独立文件夹，核心结构遵循固定规范

1. 必选核心文件：SKILL.md

这是 Skill 的「入口文件」，是 Claude 识别和使用技能的唯一必需文件，包含两部分核心内容：

（1）YAML 前置元数据（Frontmatter）
YAML 是一种配置文件
位于 SKILL.md 最顶部，是 Claude 判断「何时触发该技能」的关键，brand-guidelines 的元数据示例：
渐进式加载， 省token

---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
license: Complete terms in LICENSE.txt
---

name：技能唯一标识，必须是「小写 + 连字符」格式（如 brand-guidelines），且需与技能文件夹名一致；
description：核心是明确「技能功能 + 触发场景」，直接决定 Claude 何时调用该技能（比如用户要求「按 Anthropic 品牌规范调整文档样式」时，Claude 会匹配该描述并触发技能）；
license（可选）：技能的许可协议，brand-guidelines 指向独立的 LICENSE.txt（Apache 2.0 协议）。

（2）Markdown 主体内容
元数据下方的 Markdown 内容，是 Claude 触发技能后执行的「操作指南」，核心是：
明确技能的使用场景、核心流程（工作流）（如「如何应用品牌色值到不同类型的文档」）；
关联可选的附属资源（如下文的 references/assets）；
遵循「命令式 / 不定式」写作风格（如「To apply brand colors, use the hex values in references/color.md」，而非「你应该用...」）。

Claude Skills 的本质是「领域能力封装包」：
以 SKILL.md 为核心，通过「元数据 + 操作指南」定义技能的「触发规则 + 执行逻辑」；
以「渐进式披露」为设计核心，按需加载资源，兼顾「能力完整性」和「上下文效率」；
以 brand-guidelines 为例：该技能将「Anthropic 品牌视觉规范」封装为 Claude 可复用的能力，让 Claude 能精准、标准化地应用品牌样式，无需用户反复提供品牌规则。

一个 Skill 长什么样？

my-skill/
├── SKILL.md        # 核心（必须）
├── scripts/        # 可选（代码）
└── references/     # 可选（资料）


Skill 就是一个文件夹 + SKILL.md

最重要的认知升级

👉 Skills 的本质不是技术，而是：

把“经验”变成“可执行资产”





## 实战
cursor中执行 Please install the "brand-guidelines" skill into my project
.cursor/skills/brand-guidelines 中

Use brand-guidelines skill

Create a landing page for an AI product

Use brand-guidelines skill to restyle this component

### PDF Processor Skill
pdf-processor/
├── SKILL.md
├── scripts/
│   ├── extract_text.py
│   ├── extract_tables.py
│   └── merge_pdfs.py
└── references/
    └── FORMATS.md

目录	作用
SKILL.md	核心逻辑（AI怎么做）
scripts/	真正执行的代码
references/	文档 / 规范 / 说明


这个 skill 是干嘛的？

一句话：

处理 PDF：提取文本、表格、合并文件

官方描述：

提取 PDF 文本

提取表格

合并多个 PDF


SKILL.md（大脑）
name: pdf-processor
description: Extract text and tables from PDF files

## When to use this skill
- Needs to extract text from PDF
- Needs to process PDF data

👉 核心作用：

告诉 AI：什么时候用我

告诉 AI：怎么做

scripts/（手和脚）
scripts/
├── extract_text.py
├── extract_tables.py
└── merge_pdfs.py

Skill 不只是 prompt，还能“干活”

# extract_text.py（简化理解）
read_pdf()
extract_text()
return_text()


references/（知识库）
references/
└── FORMATS.md


定义输出格式

存复杂规则

避免 SKILL.md 太长

Use pdf-processor skill to analyze this PDF

Please install the "pdf" skill into my project

Use pdf skill to analyze this PDF， 获得他的电话号码就好