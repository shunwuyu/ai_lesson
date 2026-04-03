## 用agent ide写一道升级版debounce。

- 手戳代码
    频繁触发 → 重置计时 → 只执行最后一次
    基础能力
    ```
    /**
    * 极简防抖函数
    * @param {Function} func - 要防抖的函数
    * @param {number} delay - 延迟时间（毫秒）
    * @returns {Function} 防抖后的新函数
    */
    function debounce(func, delay) {
        let timer = null; // 存储定时器ID

        // 返回一个新的防抖函数
        return function (...args) {
            // 1. 清除上一次的定时器（频繁触发就重置计时）
            clearTimeout(timer);
            
            // 2. 重新设置定时器，延迟执行目标函数
            timer = setTimeout(() => {
                func.apply(this, args); // 绑定this和参数，保证函数正常执行
            }, delay);
        };
    }
    <input type="text" id="input" placeholder="输入测试防抖">

    <script>
    // 1. 定义要执行的函数（比如搜索请求）
    function handleSearch(e) {
    console.log("执行搜索：", e.target.value);
    }

    // 2. 创建防抖函数（延迟500毫秒）
    const debounceSearch = debounce(handleSearch, 500);

    // 3. 绑定事件
    document.getElementById("input").addEventListener("input", debounceSearch);
    </script>
    ```

- 手戳代码升级版本
    高级能力
    debounce2.html
    - leading：是否立即执行
    - cancel()：取消
    - 返回值处理（Promise 支持）

- hooks 版本
    debounce-demo

- AI 协作能力
    会不会“用 AI 写对代码”， Prompt能力

    ```
    你是一位具有 10 年经验的 JavaScript 高级工程师，熟悉函数式编程、浏览器事件模型以及 lodash 等工具库的源码实现。

现在你需要实现一个“企业级 debounce 函数”，要求代码具备高可读性、健壮性，并接近 lodash.debounce 的能力水平。

【功能要求】
1. 支持基础防抖功能：多次调用只在最后一次执行
2. 支持 options 参数：
   - leading: 是否在首次触发时立即执行
   - trailing: 是否在停止触发后执行
3. 支持 this 绑定和参数透传（不能丢失上下文）
4. 返回值需要正确处理（多次调用返回一致的结果）
5. 提供以下附加方法：
   - cancel(): 取消当前防抖
   - flush(): 立即执行当前待触发函数
6. 需要处理边界情况：
   - 连续快速触发
   - leading 和 trailing 同时存在
   - timer 清理问题
7. 使用 TypeScript 编写，保证类型安全（泛型支持函数参数和返回值）

【代码要求】
1. 不要使用 lodash 或任何第三方库
2. 代码结构清晰，适当拆分内部函数（如 invoke）
3. 添加必要注释，说明关键逻辑（尤其是 leading / trailing 的处理）
4. 保证没有内存泄漏风险（timer 必须正确释放）

【输出要求】
1. 只输出最终代码，不要解释
2. 代码必须可以直接运行
    ```

- 角色约束
    作用：
        提升代码质量（AI 会更严谨）
        自动偏向工程实现，而不是玩具代码
- 对标对象（隐形加分）
    接近 lodash.debounce 的能力水平 直接锁定“行业标准答案”
    避免 AI 写简化版

- 明确功能边界
    你把需求拆成：
        功能
        边界条件
        API 设计

- 限制输出
    只输出最终代码，不要解释

- 强制 TypeScript,技术栈需求
    使用 TypeScript + 泛型

## git pull git fetch

- git fetch 只拉取远程更新，安全又不影响当前分支；
    本地 main  / dev 分支
    远程 origin/main、origin/dev
    fetch 只是把远程最新代码 “下载到本地仓库备份”，不合并、不覆盖、不影响你当前写的任何代码。

    接着
    1. 看本地分支 和 远程分支差多少
    git diff main origin/main
    能看到：远程改了哪些代码、你本地缺哪些更新。

    2. 看提交日志对比
    看远程比本地多了哪些提交
    git log main..origin/main

    3. 三种场景后续操作
    你本地没改代码，直接合并更新
    切到主分支
    git checkout main
    把 origin/main 的更新合并到本地main
    git merge origin/main

    4. 你本地有自己的修改 / 正在开发，不想立刻合并
    - 先暂存自己代码
    git stash 暂存

    为什么需要stash 
    Git 不允许你带着未提交的修改切换分支，像游戏存档。

    - 切主分支合并远程
    git checkout main
    git merge origin/main

    - 切回开发分支，恢复自己代码
    git checkout 你的开发分支
    git stash pop

    - 不想用 merge，想干净线性更新（rebase 常用）
    git checkout main
    git rebase origin/main


- git pull 会在 fetch 后自动 merge 或 rebase。

- 理解git rebase 准备全新测试项目
```
# 1. 新建文件夹并进入
mkdir git-test-demo && cd git-test-demo

# 2. 初始化Git仓库
git init

# 3. 创建初始文件+首次提交
echo "主线初始代码" > main.txt
git add .
git commit -m "初始化：main初始提交"

# 4. 创建开发分支 dev 并切换过去
git checkout -b dev
echo "开发分支新增功能" > dev.txt
git add .
git commit -m "dev：新增开发功能"

# 5. 切回main，模拟同事远程改了主线
git checkout main
echo "主线被远程更新修复bug" >> main.txt
git add .
git commit -m "main：修复线上BUG"
```
你执行完我前面的命令后，结构是这样的：
plaintext
main:    A(初始) → B(修复bug)
             
dev:     A(初始) → C(开发功能)
共同祖先：A
main 比 dev 多了一个 B
dev 比 main 多了一个 C

- 二、先演示：用 git merge 会出现什么问题

    - 切回 dev，执行 merge 合并 main
    git checkout dev
    把main合并到dev
    git merge main

    - 看可视化提交树
    git log --oneline --graph --all

     Merge 出现的问题（小白必懂）
    自动多出一条合并提交记录；
    提交树分叉缠绕，多人协作越多，历史越杂乱；
    后期查 bug、回滚代码极难理清脉络。

    三、重置项目：删掉 merge，重新纯净开始
    先撤回刚才 merge，回到干净状态，准备用 rease 重做：
    git reset --hard HEAD^

    四、全程实操：用 git rebase 优雅重做一遍
    步骤 1：保证 main 是最新（和前面一样）
    git checkout main

    步骤 2：切到 dev 分支执行 rebase
    git checkout dev
    核心命令：把dev所有提交，挪到main最新顶端
    git rebase main

    git log --oneline --graph --all

     Rebase 效果对比
没有多余合并节点；
所有提交变成一条笔直线性历史；
dev 的提交自动 “搬运” 到 main 最新代码后面；

    把你的 D、E“摘下来”，重新接到 C 后面

    一、先用一句话讲清本质

你先这样说：

merge 是“把两条分叉的历史拼在一起”，
rebase 是“把你的提交搬到最新主线后面，让历史变成一条直线”。

二、用一个全新例子（非常关键）

假设现在有这样一个场景：

你从 main 拉了一个分支 feature
你写了 2 次提交
同时别人也在 main 提交了 2 次
🧱 初始结构（分叉了）
main:    A --- B --- C
                   \
feature:            D --- E

👉 含义：

A B C 是主分支
D E 是你写的代码
现在 main 和 feature 分叉了
三、如果用 merge（常见但不干净）

执行：

git merge origin/main

结果👇

main:    A --- B --- C
                   \ 
feature:            D --- E --- M
                      \       /
                       -------

👉 解释：

Git 创建了一个 合并节点 M（merge commit）
历史变成“网状结构”
❗ 问题

你可以这样说：

merge 会让提交历史变复杂，后期排查问题（git log）会很乱。

四、如果用 rebase（重点来了）

执行：
变基
git rebase origin/main

Git 做了什么？

👉 把你的 D、E“摘下来”，重新接到 C 后面

✨ 结果（核心对比）
main:    A --- B --- C --- D' --- E'

👉 注意：

D → D'
E → E'
（是“新的提交”，不是原来的）
五、直观对比（面试必杀图）
merge（网状 ❌）
A --- B --- C
       \     \
        D --- E --- M
rebase（直线 ✅）
A --- B --- C --- D' --- E'

👉 你可以总结一句：

rebase 的目标就是：让 Git 历史变成一条干净的时间线

- 为什么需要 rebase

    1. 提交历史更清晰

所有提交是线性的，像时间轴一样，一眼能看懂

    2. 更方便排查问题（大厂很看重）

    3. 更符合团队规范
        提交到主分支前必须 rebase，保证历史干净

- 什么时候不能用 rebase
    rebase 不适合已经 push 到远程的公共分支

- 实际开发中我更倾向用 fetch + rebase，这样更安全、可控，也能保持提交历史整洁。

## 你了解node多少

相比于Java/GO, Node.js 轻量高效生态丰富，稳居前端全栈（BFF Backend For Frontend，服务于前端的后端）与中间层主流；适合接口转发、实时通信、轻服务、AI 网关与管理后台开发。

nodejs特性是  单线程高并发（单线程不空等 IO，文件 / 网络请求阻塞时，立刻切换处理新请求， 少量线程就能扛成千上万并发连接），IO 异步不阻塞，资源开销低吞吐强。

我对核心模块是比较熟悉的， 比如：fs：文件读写、流式处理，http、
os等模块， 同时对 Node 的事件循环、异步模型（Promise / async-await）有比较深入理解。

在后端开发上，我是基于 RESTful 思想做服务设计的，熟悉 MVC 分层。

我主要使用 NestJS 来做后端开发，因为它在架构上比较清晰，天然支持模块化和依赖注入。

数据库 主要使用 MySQL 和 PostgreSQL，使用过prisma orm 开发。

我会基于 LangChain 去做接口开发，比如：封装 LLM 调用，构建工具调用（tools），实现简单的 Agent 流程。

我写了一个rag 项目， 了解文档切分、向量化、向量数据库检索，用过milvus向量数据库。

我从 Node 基础能力，到 NestJS 工程化，再到 AI 和 Agent 开发都有实践经验，我相信可以比较快地融入到公司的 AI Agent 或 openclaw 相关项目中。

## nodejs event loop

Node.js 和前端的 Event Loop 本质相同，都是基于事件驱动的异步模型，但实现细节不同。前端主要分为宏任务（script、setTimeout）和微任务（Promise），每轮循环先执行宏任务，再清空微任务队列。
Node.js 更复杂，事件循环分为多个阶段，比如 timers、poll、check 等，每个阶段处理不同类型的任务，同时也有 microtask（Promise、process.nextTick），其中 nextTick 优先级更高。

可视化理解👇
前端：

宏任务(开始) → 微任务 → 渲染 → 下一轮

Node：
node-event-loop.js

setTimeout (0) 不是真的 0ms，Node 最小会变成 1ms 延时；


timers（定时器） → poll（轮询等待 I/O, 读取文件,网络请求） → check （Poll 空闲结束后，强制进入此阶段核查执行）→ ...  
       ↘ microtasks（随阶段执行）

所以 Node 更偏“多阶段调度”，前端更偏“宏微任务模型”。





完整流程（超级清晰）
1. 同步代码
start
end

2. microtasks（优先级最高）
nextTick
promise

process.nextTick > Promise

3. timers 阶段
timeout

4. poll 阶段（I/O）
readFile

👉 执行 I/O 回调

5. check 阶段
immediate

👉 setImmediate 在这里执行

6. I/O 回调内部（重点）

在 readFile 里面：

setTimeout(...)
setImmediate(...)

👉 顺序变了：

immediate in I/O
timeout in I/O

👉 原因：

poll → check（先执行 setImmediate）
下一轮才到 timers

## 讲一下http 协议

HTTP HyperText Transfer Protocol 是基于TCP/IP 的应用层协议，是互联网数据通信与网页传输的基石，基于请求响应的简单协议，无状态，特别适合海量用户的网页访问与高并发互联网场景。

随着互联网的发展， http 也在不断的进化。

###  HTTP/0.9 是最原始雏形版本，仅支持GET 请求，无请求头与响应头；结构极简，最初只为满足科研机构简易文本互联通信而设计。

### HTTP/1.0
    - 支持多种方法：GET / POST/ HEAD 
    HEAD 只拿响应头不拿正文
    在下载大文件之前，客户端往往需要知道文件的详细信息，以决定是否继续下载。
    比如你要下载一个 5GB 的游戏补丁，通过 HEAD 请求先拿到文件大小，如果磁盘空间不足，就可以立刻停止，而不必开始下载。
    - 引入 Header
        Cookie 携带客户端缓存的用户会话标识
        User-Agent 标识客户端浏览器 / 设备信息
        const ua = navigator.userAgent;
        console.log(ua);
        
        Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36

        Mozilla/5.0 几乎所有现代浏览器都以此开头
        Macintosh; Intel Mac OS X 10_15_7 硬件设备、处理器架构以及操作系统版本
        

        AppleWebKit/537.36 浏览器渲染引擎版本号，用于解析网页代码并负责页面显示。

        Chrome/146.0.0.0 浏览器标识，指你正在使用谷歌 Chrome 146 版本

        Safari/537.36 兼容性标识，表明浏览器兼容 Safari 特性，不代表你正在使用 Safari。

        Content-Type 请求体数据格式
        Accept 可接收响应类型
        Authorization 身份授权认证
    - 短连接（每次请求都要 TCP 建连）


    每个请求都要：
    TCP 三次握手
    四次挥手
    👉 性能非常差

### HTTP 1.1 
    - 长连接（Keep-Alive）
    一个 TCP 连接可以复用多个请求，是为适配网页资源变多（CSS/JS/ 图片）、提升加载速度、减少 TCP 握手开销的互联网发展需求。
    - 管道化（Pipelining）
    基于长连接，可以连续发多个请求
    普通长连接：发一个请求 → 等响应回来 → 再发下一个。
    
    就算有 Keep-Alive 不用反复建连接，但还要挨个等待响应，网速还是浪费；
    管道化：不用等上一个响应，一口气连续多发好几个请求，排队发给服务器。

    但它有队头阻塞严重缺陷，实际浏览器基本都禁用了。
    同一个 TCP 连接里，响应没有编号、不标序号， 多个请求就好像排队的车队一样， 虽然可以不断发车，但是前面一个堵车，后面全车排队堵死，再快也没用

    马路不是给一个人跑的， 大家可以一起跑， 只不过要有序

    - 缓存机制
    强缓存（Cache-Control / Expires）
    浏览器压根不发请求给服务器，直接用本地缓存加载资源，速度最快。

    Expires: Wed, 31 Dec 2026 23:59:59 GMT
    Cache-Control: max-age=86400

    1. Expires：绝对过期时间（老版本 HTTP1.0）
        它使用绝对时间，依赖客户端时间比对。若设备时间不准或时区不同步，会导致缓存误判。
    2. Cache-Control: max-age = 秒数（HTTP1.1，优先级别更高）
    相对时间， 


    协商缓存（ETag / Last-Modified）

    当强缓存失效后，浏览器并不会立刻下载新资源，而是会向服务器发起一个“询问”请求，这个过程就是协商缓存。它的核心是：发请求，问服务器，资源变没变？
    如果服务器回答“没变”，则返回 304 Not Modified 状态码，浏览器继续使用本地缓存；如果回答“变了”，则返回 200 OK 和新的资源内容。

    1. Last-Modified / If-Modified-Since（比较修改时间）
    通过比较资源的最后修改时间来判断是否更新。

    Last-Modified: Tue, 20 Feb 2026 08:00:00 GMT

    2. 再次请求： 当强缓存失效，浏览器会再次请求，并在请求头中带上 If-Modified-Since，其值就是上次收到的 Last-Modified 时间。

    3. 服务器判断

    服务器比较 If-Modified-Since 的时间和资源当前的最后修改时间。
    如果时间没有变化，返回 304，浏览器使用缓存。    
    如果时间有变化，返回 200 和新资源。

    缺点：
    精度有限：时间精度只能到“秒”。如果在一秒内多次修改文件，可能无法准确判断。
    可能误判：文件内容没变，但修改时间被更新了，会导致不必要的重新下载。

   2. ETag / If-None-Match（比较内容唯一标识，更精准）
    原理：通过比较资源的唯一标识（通常是根据文件内容生成的哈希值）来判断是否更新。

    1. 首次请求：服务器在响应头中返回 ETag，作为资源的唯一“指纹”（例如：ETag: "abc123xyz"）。

    2. 再次请求：当强缓存失效，浏览器会再次请求，并在请求头中带上 If-None-Match，其值就是上次收到的 ETag

    3. 服务器判断：服务器比较 If-None-Match 的值和资源当前的 ETag。

    如果值完全相同，说明内容没变，返回 304。
    如果值不同，说明内容已更新，返回 200 和新资源。

    优点：优先级高于 Last-Modified，因为它直接基于内容，不受修改时间影响，判断更精准。
    缺点：生成 ETag 会增加服务器的计算开销。

- 分块传输（chunked）
边传边收
    响应无固定长度，用 Transfer-Encoding:chunked 分块传输，服务器边生成边发，浏览器边收边解析，无需等完整文件。
    SSE 就是借 HTTP 长连接 + chunked 实现的服务端单向流式推送。

- Host 头
    支持虚拟主机
    一台服务器只有 1 个公网 IP，却要托管几十上百个网站（虚拟主机）。没 Host 头时，IP 只能对应一个站点；
    有了Host 请求头携带域名，服务器靠它区分：同一 IP 下你要访问哪个网站，节省 IP 成本、盘活服务器资源。

    假设服务器 IP 为 1.2.3.4，它上面托管了两个网站：
    公司官网：www.example.com
    个人博客：blog.example.com

    GET / HTTP/1.1
    Host: www.example.com

    GET / HTTP/1.1
    Host: blog.example.com

    阿里云

- OPTIONS、PUT/PATCH、DELETE：HTTP/1.1 正式标准定义；
    OPTIONS 查询服务器接口支持的请求方法，用于跨域预检与权限探测校验。
    非简单请求时，浏览器会先发 OPTIONS 预检。
    请求方法：PUT/DELETE/PATCH 等非 GET/POST
    自定义请求头：加 Authorization、Token 等
    Content-Type：application/json（非表单默认值）
    满足任意一条，必发 OPTIONS 跨域预检。
    为了保护服务器和用户数据安全

    HTTP/1.1 最大问题是应用层的队头阻塞。

###  HTTP/2
解决 HTTP/1.1 的性能瓶颈

二进制分帧
HTTP2 用二进制帧拆分数据，同连接多路复用，彻底解决队头阻塞问题
帧里带流 ID，不同请求帧混传、按 ID 归类；一个流阻塞不影响其他，解决队头阻塞。就好像有车牌

HTTP/1.1 纯文本明文传输，一锅数据分不清边界、没法插队；

HTTP2 改成二进制 + 帧 + 流 ID，切小块编号混传，彻底破队头阻塞。
帧就是 HTTP2 里最小的快递小包裹

- 多路复用（最重要）
一个 TCP 连接中可以并发多个请求
不需要多个连接
- 服务器推送（Server Push）
    服务器主动推资源
    主动塞资源。浏览器只请求 html，服务器主动把 css/js 提前推给浏览器，不用浏览器再发请求。

- 丢一个包 → 整个 TCP 流都会卡住
TCP 通道 = 一条唯一的单行隧道
HTTP2 所有请求车流，全挤进这一条隧道
隧道里任何一辆小车丢包抛锚，整条隧道必须停下等拖车重传修复；隧道堵死，里面所有车（全部请求）全部跟着停滞卡死。

### HTTP/3

HTTP/3 = HTTP/2 + QUIC（基于 UDP）

使用 QUIC（基于 UDP）
用户数据报协议 无连接、不重传、不管顺序，快但不可靠
不再用 TCP

彻底解决队头阻塞
每个流独立
丢包只影响当前流

更快建立连接

内置 TLS（安全 + 快） 把加密做成传输协议的一部分，不是额外插件

HTTP/3 通过 QUIC 协议解决了 TCP 层的队头阻塞问题，同时降低了连接建立延迟。

QUIC（Quick UDP Internet Connections） 基于 UDP 集成 TLS，0-RTT 快速建连，丢包仅影响单流，解决 HTTP2TCP 队头阻塞

谷歌自研，基于 UDP，HTTP3 底层核心协议，集成加密 + 可靠传输。

普通 1-RTT：进门先敲门→等主人开门确认，确认完再拎东西进屋（多等一轮）。
0-RTT：老熟客带门禁钥匙，手拎东西直接推门进屋，不用等待确认，开门就传数据。

HTTP/3 彻底抛弃 TCP，全程基于 UDP + QUIC
没有 TCP 三次握手
改用 QUIC 自定义可靠传输逻辑


## 跨域 
interview/2025_chun/js/cors

## HTTPS 
interview/2025_qiu/pdd/http&https

## 多模态

如果类比传统的文本大模型（LLM），它的输入和输出都是文本，而多模态模型可以理解为支持多种“信息形式”的模型，比如文本、图像(banana)、语音（tts）甚至视频（sora,Seedance）。

文本模型是“只会读写文字的人”，而多模态模型是“能看、能听、还能说的人”。

```
{
  "model": "gpt-4o",
  "input": [
    {
      "role": "user",
      "content": [
        { "type": "input_text", "text": "这张图是什么？" },
        { "type": "input_image", "image_url": "xxx.jpg" }
      ]
    }
  ]
}
```
输入不再是单一字符串，而是一个包含多种类型内容的结构化数组（text / image / audio）

### 结合项目
https://gitee.com/shunwuyu2020/lesson_zp/tree/master/project/capture_word/vue3-ts-cameraword
在这个项目里，我用到了图像识别能力，用户通过摄像头拍照，模型会识别图片中的内容并转成单词。
火山引擎的tts 又会把生成的例句转成语音。
### 总结
多模态模型相比传统文本模型，最大的区别是支持多种输入输出形式，在接口上体现为结构化的多内容输入，在应用上可以串联图像识别和语音生成，实现更接近真实人类感知的交互方式。

## 从上传图片到tts输出完整的流程，图片怎么编码

在 OpenAI 的多模态接口中，图片一般有两种传输方式：
URL 引用 或 Base64 编码上传。

把图片转成 Base64 字符串，然后通过 data URL 的方式传给模型。

{
  "type": "input_image",
  "image_url": "data:image/jpeg;base64,xxxxxx"
}

```
const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const data = reader.result as string;
            imgPreview.value = data;
            emit('updateImage', data);
            resolve(data);
        }
        reader.onerror = (error) => {
            reject(error);
        }
```

## 讲一下embedding
- llm 除了文本、多模态等生成类模型，还有表示类模型即Embedding Model，主要用来把文本转成向量，用于检索、相似度计算等场景。

- embedding 本质是把“语义”映射到向量空间。

- embedding 模型会把一段文本编码成一个高维向量，比如 768 维、1536 维（text-embedding-ada-002）。

- 举个例子
"猫喜欢鱼" → [0.12, -0.8, ..., 0.33]
"狗喜欢骨头" → [0.10, -0.75, ..., 0.30]
每一个语义在相应维度有个数值
语义越接近 → 向量越接近

- 相似度计算
1. 余弦相似度
衡量两个向量“方向”的相似程度
[-1, 1] 1：完全相同，相似度最高 -1 完全相反
2. 欧氏距离
衡量两个向量在空间中的距离

- embedding向量存储在向量数据库 
    embedding 是高维向量，传统数据库不适合做高效相似度搜索。
    用过Milvus做RAG知识库项目，对一本书的内容做问答

- RAG 关键流程
    - 文档切分（chunk）
    - embedding 向量化
    - 存储
    - 用户提问 问题 → embedding
    - 相似度检索 + LLM 生成
        - 找最相似的 TopK 文档 检索
        - 拼接到 prompt 增强
        - 交给 LLM 生成答案 生成

    RAG 的核心是：用 embedding 做语义检索，把相关知识补充给大模型，从而减少幻觉。

    embedding 模型主要负责把文本转成向量，用于相似度计算和检索；
    在工程上通常结合向量数据库实现高效搜索；
    在 RAG 场景中，通过 embedding 检索相关知识，再交给生成模型回答，是当前企业落地大模型的主流方案。

- function call在项目中怎么用的

    function calling 是 OpenAI 提供的一种能力，本质上是让大模型不仅能“生成文本”，还能“决定调用哪个函数来执行任务”。

    有了它 LLM 从“聊天工具”升级为“任务调度器”。

    在 OpenAI 的 Chat/Responses API 中，我们可以提前定义一组函数（tools），并描述它们的参数结构（JSON Schema）。

    await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "北京现在天气怎么样？" }],
    tools: [
        {
        type: "function",
        function: {
          name: "getWeather",
          description: "查询指定城市实时天气",
          parameters: {
            type: "object",
            properties: {
              city: { type: "string", description: "城市中文名" }
            },
            required: ["city"]
          }
        }
      }
    ]

    LLM 负责“决策”，代码负责“执行”

    纯文本模型有一个问题：它只能“说”，不能“做”，比如：查数据库,调接口,执行业务逻辑
    function calling 解决了：让模型具备“调用外部系统”的能力, 后面发展为MCP。

- 使用langchain 来封装
    在 LangChain 中，LLM 被当作 Agent，它可以根据用户输入，自动决定调用哪个 Tool，并组合多步操作完成复杂任务。

    LangChain 在 function calling 之上做了一层“业务编排”。

###  总结

function calling 是 OpenAI 提供的接口能力，允许模型根据用户输入决定调用哪个函数，并生成参数，实际执行由后端完成；
在 LangChain 中被抽象为 Tool 和 Agent，LLM 负责决策，Tool 负责执行；
在项目中常用于调用外部 API，比如查天气、查订单，也可以结合业务实现自动化流程，是构建 AI Agent 的核心能力。

## 最近公共祖先
[二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/)

LCA 全称是 Lowest Common Ancestor，中文翻译为 最近公共祖先。

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

深度 从根节点走到当前节点，经过的层数（根深度 = 1）

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1

- 丛上到下， 丛左到右， 用数组存二叉树的节点，包括null 
- 左孩子索引 = 父节点索引 * 2 + 1
- 右孩子索引 = 父节点索引 * 2 + 2

root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
3
节点 5 和节点 1 的最近公共祖先是节点 3 。

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)
root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4

### 思路
就是看 p 和 q 是不是分布在当前节点的左右子树，如果是，那当前节点就是 LCA。
本质是一个“后序遍历（先左子树，再右子树，最后访问根节点遍历二叉树。）”的过程，每个节点都会根据左右子树的返回结果来判断自己是不是答案。
这题的核心就是用递归在左右子树中查找 p 和 q，通过返回值判断当前节点是不是它们的最近公共祖先。

### 假设这棵树：
        3
       / \
      5   1
     / \ / \
    6  2 0  8
      / \
     7   4

    我们要找：
    p = 5
    q = 1

    我们从根节点 3 开始递归，整个过程可以理解为：
每个节点都在问左右子树：你们有没有找到 p 或 q？

    从根节点 3 开始
    去左子树（5）
    去右子树（1）
    看左子树（节点 5）

👉 发现：

当前节点就是 p（5）
    返回 5

    看右子树（节点 1）
    发现：

当前节点就是 q（1）

所以返回：

    返回 1

    回到根节点 3（关键点🔥）
    左边返回：5（说明找到了 p）
    右边返回：1（说明找到了 q）

    左右子树都返回了非空，说明 p 和 q 分别在当前节点的两边，所以当前节点 3 就是最近公共祖先。

    再换一个例子（更体现细节）

👉 如果：
    p = 5
    q = 4

    在节点 5：
发现自己是 p → 返回 5
继续往下找，在子树中找到 4

👉 此时：

左子树返回 null
右子树返回 4

在节点 5：

一边是自己（p）
一边找到了 q

👉 所以：

节点 5 就已经是 LCA，不会再往上变

总结整个“递归逻辑”（面试一定要讲清）

你可以用这段总结👇

每个节点会从左右子树拿到两个结果：

如果左右都有值，说明 p 和 q 分别在两边，当前节点就是 LCA；
如果只有一边有值，就把这个值继续往上返回；
如果都没有，就返回 null。

所以这个过程本质是一个“自底向上汇报”的过程，LCA 就是第一个同时接收到 p 和 q 的节点。

```
function lowestCommonAncestor(root, p, q) {
  // 1. 终止条件
  if (root === null || root === p || root === q) {
    return root
  }

  // 2. 去左右子树找
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  // 3. 根据返回值判断
  if (left && right) {
    return root // p 和 q 分别在两边
  }

  // 4. 只在一边找到
  return left || right
}
```

## 讲一下死锁

- 操作系统的核心概念， 是并发和多线程场景下的特有现象。
- 就像两个人过独木桥，谁也不肯退让，结果谁也过不去。在程序里，就是多个线程互相等着对方手里的资源，最后全卡住不动了。

- 多线程就像给程序开了多个“分身”，让它们同时处理不同任务。比如在下载文件时，程序还能流畅响应你的点击操作，互不耽误。
    js 单线程的， 但其他语言很多是多线程的

- 本质是 资源竞争 + 错误的资源获取顺序
    - 线程 A 持有资源 X，等待资源 Y 
    - 线程 B 持有资源 Y，等待资源 X

- 形成条件

    1. 互斥条件
        资源（进程分配资源）一次只能被一个线程占用
    2. 请求与保持
        已拿到资源的线程，还在请求新资源
    3. 不可剥夺
        资源不能被强制抢走
    4. 循环等待（最关键）
        线程之间形成资源等待环

- 怎么解决

    大家都按个顺序排队拿，或者等急了就松手（过期时间），别互相干耗着。

    A 的习惯：先拿 1，再拿 2。
    B 的习惯：先拿 2，再拿 1。

    A 想干活：先拿 1，再拿 2。
    B 想干活：虽然它原本想先拿 2，但规则不允许，它也必须先拿 1

    如果是 A 抢到了 1，B 就得等着。A 随后拿走 2，干完活，把 1 和 2 都释放了。B 才能拿到 1。
    如果是 B 抢到了 1，A 就得等着。B 随后拿走 2，干完活，释放资源。

## 栈和堆

1. 首先我想结合JS 内存模型来回答

    - 栈主要用于存储执行上下文、基本类型和函数调用，由系统自动管理；
    - 堆主要用于存储对象、数组、函数等引用的复杂数据，由开发者（new 申请内存 delete 释放内存）或 GC（Garbage Collection 垃圾回收） 管理。

    栈里存的是 值 or 引用地址

    堆里存的是 真实数据

    栈：函数执行完自动释放（快） 
    堆：需要 GC（标记清除、引用计数等）

    标记清除 就像大扫除，先给还在用的东西贴条，没贴条的当垃圾直接扔掉。
    有人用就+1：每多一个地方引用它，数字就加一。
    不用了就-1：引用失效，数字就减一。
    归零即回收：数字变0，说明没人要了，立马释放内存。

    优点：反应快，不用等，没人用就马上清理。
    缺点：怕“循环引用”（A指着B，B指着A，数字永远不为0），容易漏收垃圾。

- 性能差异
    栈快（只需挪指针），堆慢

    栈	堆
连续内存	非连续
LIFO（后进先出）	随机分配
无需 GC	需要 GC

- 闭包的关系
    本该在栈释放的数据，被引用到了堆中

### 总结

栈和堆的核心区别在于存储内容和管理方式。
栈主要用于存储执行上下文和基本类型数据，由系统自动分配和释放，效率很高；
堆主要用于存储对象等引用类型数据，由垃圾回收机制管理。

在 JS 中，变量本身在栈中，而对象实际存储在堆中，栈里存的是指向堆的引用地址。

栈的特点是内存连续、后进先出，所以访问速度快；而堆是动态分配的，可能产生碎片，访问相对慢。

从生命周期来看，栈中的数据随着函数执行结束自动释放，而堆中的数据只要还有引用就不会被回收，这也是垃圾回收机制判断的依据。

实际开发中，这也会影响到浅拷贝、闭包以及内存泄漏等问题。

### 怎么判断对象可回收？

对象是否可回收，本质取决于：是否还能被访问（是否可达）。
```
function fn() {
  let obj = { a: 1 };
}
fn();
```

fn 执行完 → 栈清空
obj 没有任何引用 ❌
👉 不可达 → 会被回收

```
let globalObj;

function fn() {
  let obj = { a: 1 };
  globalObj = obj;
}

fn();
```

obj 被 globalObj 引用
👉 从 Root（全局）可以访问到

👉 可达 → 不会回收
经典“循环引用”
```
let a = {};
let b = {};

a.x = b;
b.y = a;
```

两个对象互相引用
但如果没有 Root 指向它们：

a = null;
b = null;

虽然互相引用
但整体“不可达”

👉 ✅ 仍然会被回收


闭包场景（面试很爱问）

```
function outer() {
  let obj = { a: 1 };

  return function inner() {
    console.log(obj);
  };
}

let fn = outer();
```

outer 执行完
obj 本该释放 ❌
但 inner 还引用它

👉 obj 仍然“可达”

👉 ❗ 不会被回收

### 什么是内存泄漏？
本应被回收的内存，因被意外引用而无法释放，导致占用持续增长，最终引发页面卡顿甚至崩溃。

- 全局变量 / 意外挂载到全局
    忘记用 let / const
    挂在 window 上
    被全局对象持有 → 永远是 Root 可达

- 闭包导致的引用未释放

    内部函数引用外部变量
    外部函数执行完，但变量仍被持有（堆）

    变量被闭包“延长生命周期”

- 定时器未清理

    定时器回调一直持有作用域引用
    即使组件销毁，对象仍然可达

- 事件监听未移除

    addEventListener 后没有 removeEventListener
    SPA 页面切换

    DOM 或全局对象持有回调函数引用

- DOM 引用未释放

    JS 变量持有 DOM
    DOM 已从页面移除
    let el = document.getElementById('app');
    document.body.removeChild(el);

    JS → DOM 仍有引用 → 无法回收

- 缓存 / Map / Set 使用不当
    无限缓存
    Map 一直 set 不 delete
    const cache = new Map();
    key 可以是对象 
    WeakMap ✅ 可被回收

- 未清理的第三方库 / 订阅

    发布订阅机制持有回调

    不取消订阅 → 一直引用

- React / Vue 组件卸载不彻底

    组件卸载但：
    定时器没清
    事件没解绑
    请求没取消

- Promise / 异步任务未结束

    未 resolve / reject
    async 请求未取消

    回调闭包一直存在

- 控制台 / 调试工具引用

    console.log(obj)
    DevTools 保留对象
    调试工具持有引用

## 响应式瀑布流

### 面试官心态

CSS布局功底（flex、Grid、适配）、性能优化（懒加载、虚拟滚动）、组件化思维（好用、扩展性、高性能的组件）

### 瀑布流
瀑布流是一种基于多列布局的内容排列方式，元素按照高度自适应依次填充到当前高度最小的列中，从而形成类似“瀑布下落”的视觉效果。其核心在于动态计算列高并进行最优分配，以减少留白并提升空间利用率。响应式瀑布流则结合断点或容器尺寸变化，动态调整列数与布局策略，从而在不同屏幕尺寸下保持良好的展示效果与用户体验，是经典前端布局方案。

https://huaban.com/boards/43240549

https://github.com/DrssXpro/virtualwaterfall-demo/tree/main

### 需求拆解

一. 最基本需求

1. 多列布局
    支持指定列数（如 2 / 3 / 4 列）
2. 元素按最短列填充
    每次将新元素插入当前高度最小的列（核心算法）
3. 数据渲染 
    支持数组数据驱动渲染（列表渲染）
4. 基础间距控制
    列间距、行间距可配置
5. 图片加载适配
    图片加载完成后重新计算布局（避免高度错误）

二、 升级需求
1. 适配PC和移动端
2. 滚动加载更多
3. 图片懒加载

## ts的联合类型和交叉类型

- 联合类型（Union Type）：表示“或”的关系，一个值可以是多种类型之一
- 交叉类型（Intersection Type）：表示“且”的关系，一个值必须同时满足多个类型

```
let value: string | number
value = 'hello'
value = 123

function print(value: string | number) {
    value.length
}
```

案例1：接口返回数据（真实业务）

```
type Success = {
  code: 200
  data: string
}

type ErrorRes = {
  code: 500
  message: string
}

type Response = Success | ErrorRes

function handle(res: Response) {
  if (res.code === 200) {
    console.log(res.data) // ✅
  } else {
    console.log(res.message) // ✅
  }
}

```
案例2：前端组件 props

```
type Props =
  | { type: 'text'; value: string }
  | { type: 'number'; value: number }

function Input(props: Props) {
  if (props.type === 'text') {
    props.value // string
  } else {
    props.value // number
  }
}
```

### 交叉类型

```
type A = { name: string }
type B = { age: number }

type C = A & B
// => { name: string; age: number }
```

案例1：组合对象

```
type User = {
  id: number
  name: string
}

type WithTimestamp = {
  createdAt: string
}

type UserWithTime = User & WithTimestamp
```

案例2：React Props 复用

```
type BaseProps = {
  className?: string
}

type ButtonProps = BaseProps & {
  onClick: () => void
}
```

函数返回增强

```
function withLoading<T>(data: T): T & { loading: boolean } {
  return {
    ...data,
    loading: false
  }
}
```
用交叉类型实现“能力增强”

联合类型 = 取一个（OR）
交叉类型 = 全都要（AND）

交叉类型冲突怎么办？

```
type A = { a: string }
type B = { a: number }

type C = A & B // => a: never ❗
```

TS 会推导为 never，因为类型冲突无法同时满足

总结：

在实际项目中，联合类型更多用于描述多种可能状态（如接口返回、组件 props），而交叉类型更多用于组合和扩展类型（如复用、增强能力）。
两者结合可以构建非常灵活且安全的类型系统。

## 手撕对象扁平化

### 不是数组扁平化
```
const nestedArr = [1, [2, [3, 4]], 5];
扁平后
const flatArr = [1, 2, 3, 4, 5];
1. 使用 ES6 原生 API flat() (最推荐)
这是现代 JavaScript 中最简单、最高效的方法。

const arr = [1, [2, [3, 4]], 5];
// 完全扁平化
const result = arr.flat(Infinity); 
console.log(result); // [1, 2, 3, 4, 5]

2. 递归法
这是面试中考察最多的“手写”方法，主要考察对递归逻辑的理解。
遍历数组，如果元素是数组，就递归调用函数继续展开；如果不是，就加入结果集。
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      // 如果是数组，递归展开并合并
      result = result.concat(flatten(item));
    } else {
      // 如果不是数组，直接加入
      result.push(item);
    }
  }
  return result;
}

3. 使用 reduce + 递归 (函数式写法)
利用 reduce 的累加器特性，代码更简洁，显得更“高级”一点。
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

4. 字符串转换法
只能处理数字或字符串等简单类型，且效率较低。
arr.toString().split(',').map(Number);

```

```
{
  a: {
    b: 1
  }
}
扁平化
{
  "a.b": 1
}

const nestedObj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};

扁平后
const flatObj = {
  a: 1,
  'b.c': 2,
  'b.d.e': 3
};
```

对象扁平化的本质是：把嵌套结构转换成 key-path 的映射关系。
核心思路是 DFS（深度优先遍历）对象，在遍历过程中记录路径，然后把值挂到结果对象上。

ES6 + 递归

```
/**
 * 对象扁平化函数
 * @param {Object} obj - 需要被扁平化的源对象
 * @param {String} prefix - 当前层级的键名前缀（用于递归拼接，如 'a.b'）
 * @param {Object} res - 存储结果的容器对象
 * @returns {Object} - 扁平化后的新对象
 */
function flatten(obj, prefix = '', res = {}) {
  // 遍历对象的所有可枚举属性
  for (const key in obj) {
    // 1. 安全性检查：确保属性是对象自身的，而不是从原型链继承来的
    if (!obj.hasOwnProperty(key)) continue

    // 2. 键名拼接逻辑：
    // 如果前缀存在（说明不是第一层），则用 "前缀.当前键"；否则直接使用 "当前键"
    // 例如：prefix='a', key='b' -> newKey='a.b'
    const newKey = prefix ? `${prefix}.${key}` : key
    
    // 获取当前属性的值
    const value = obj[key]

    // 3. 递归判断：
    // 如果值是对象（且不为 null，因为 typeof null 也是 'object'），则继续递归
    if (typeof value === 'object' && value !== null) {
      // 递归调用：将当前拼接好的 newKey 作为下一层的 prefix 传入
      flatten(value, newKey, res)
    } else {
      // 4. 赋值逻辑：
      // 如果值是基本类型（如数字、字符串、布尔值等），直接存入结果对象
      res[newKey] = value
    }
  }

  // 返回最终累积的结果对象
  return res
}
```

- 用 prefix 记录路径
- 每次递归拼接 key
- 遇到基础类型就写入结果

有什么没解决的地方？数组怎么办？

```
function flatten(obj, prefix = '', res = {}) {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue

    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        flatten(item, `${newKey}[${index}]`, res)
      })
    } else if (typeof value === 'object' && value !== null) {
      flatten(value, newKey, res)
    } else {
      res[newKey] = value
    }
  }

  return res
}
```
用栈代替递归
```
/**
 * 扁平化嵌套对象（迭代/栈实现，非递归）
 * 功能：将多层嵌套的对象，展平为单层对象，key 用 . 连接层级
 * 示例：{a: {b: 1}} => { 'a.b': 1 }
 * @param {Object} obj - 待扁平化的嵌套对象
 * @returns {Object} 扁平化后的单层对象
 */
function flatten(obj) {
  // 存储最终扁平化结果的单层对象
  const res = {}

  /**
   * 栈结构：存储【待处理的子对象 + 对应的前缀key】
   * 栈元素格式：{ obj: 待处理对象, prefix: 当前层级的key前缀 }
   * 初始：把传入的根对象、空前缀入栈
   */
  const stack = [{ obj, prefix: '' }]

  // 栈不为空，就持续处理（核心：迭代循环，而非递归调用）
  while (stack.length) {
    // 出栈：取出最后入栈的元素（后进先出，栈的特性）
    // 解构出 当前要处理的对象 + 当前key前缀
    const { obj, prefix } = stack.pop()

    // 遍历当前对象的所有可枚举属性
    for (const key in obj) {
      // 安全校验：只处理对象自身拥有的属性，跳过原型链上的属性
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue

      // 获取当前属性的值
      const value = obj[key]
      // 拼接新的key：有前缀就用 前缀.属性名，无前缀直接用属性名
      const newKey = prefix ? `${prefix}.${key}` : key

      /**
       * 判断值类型：
       * 1. 如果是【对象/数组】且不为null → 嵌套结构，需要继续扁平化
       * 2. 否则 → 基础类型（字符串/数字/布尔等），直接赋值到结果
       */
      if (typeof value === 'object' && value !== null) {
        // 嵌套对象：压入栈中，等待后续循环处理
        stack.push({ obj: value, prefix: newKey })
      } else {
        // 基础类型：直接存入结果对象，完成该属性的扁平化
        res[newKey] = value
      }
    }
  }

  // 所有嵌套结构处理完毕，返回单层结果
  return res
}
```

- 避免了「调用栈溢出」
迭代版：使用手动维护的栈（数组），不受引擎调用栈限制，嵌套再深都不会崩溃。

- 内存开销更小
递归：每递归一层，都会创建函数执行上下文（存储变量、作用域、返回地址等），大量嵌套会占用大量内存。
迭代：全程只有一个循环，只使用一个栈数组存储待处理数据，内存复用率极高。

## 如何设计prompt解决幻觉问题

我会通过约束上下文 + 明确输出边界 + 可验证机制来降低幻觉。首先在 prompt 中提供权威上下文（如 schema、接口定义），避免模型凭空生成；其次要求只基于给定信息回答，不允许编造；再通过结构化输出（如 JSON / 类型约束）限制自由发挥；最后加入自检步骤（如“如果不确定请返回 unknown”）。本质是把 prompt 从“提问”变成“带规则的执行指令”。

比如：

帮我写一个登录接口的前端代码

没有 API 定义 → 可能乱编字段
没有限制技术栈 → 可能不用 React / axios
没有约束返回结构 → token 字段可能乱写
没有错误处理规范

AI 很容易“编接口”、“编字段”，出现幻觉


你是一个前端工程师，请基于以下约束实现登录功能：

【技术栈】
- React + axios + zustand

【接口定义】
POST /auth/login
request:
{
  "username": string,
  "password": string
}
response:
{
  "access_token": string
}

【要求】
1. 封装 login API（axios）
2. 登录成功后将 access_token 存入 zustand（使用 persist）
3. 不允许编造接口字段，必须严格使用给定结构
4. 如果信息不足，请返回 "unknown"
5. 输出 TypeScript 代码

【输出格式】
- api.ts
- store.ts
- login.tsx


bad prompt 的问题是缺乏上下文和约束，模型容易自由发挥；优化后的 prompt 通过提供接口契约、限制输出结构、禁止编造、增加兜底策略，把生成过程变成“受控执行”，从而显著降低幻觉。


## harness 

现在Harness已是AI业界的热词

Harness 是 AI 智能体（Agent）的“马具”或“控制系统”，是继提示词工程(Prompt Engineering)、上下文工程(rag，mcp)后的新一代技术范式。它通过构建任务规划、工具调度、安全护栏、持久化记忆等外围系统，解决 AI 智能体不可控、易出错的问题，将其从“实验室玩具”转变为稳定可靠的企业级生产力工具。

把 Harness 比作 AI 的“马具”，那安全护栏就是这套马具里的缰绳和嚼子。

可以理解为：LLM 是员工，Harness 是主管。

正常用 LLM 是这样：

👉 你问一句 → 模型回一句
问题是：

容易胡说（幻觉）
不稳定（同一个问题结果不一样）
不知道对不对

Harness 做了什么？

👉 它帮你在模型外面“加了一层控制系统”：

1️⃣ 多次调用（不信一次结果）

同一个问题问多次 → 选最靠谱的答案

👉 类似：

“多找几个人问，再取共识”

2️⃣ 自动评测（让 AI 给 AI 打分）

一个模型生成，另一个模型来判断对不对

👉 类似：

“写完作业，让另一个人帮你检查”

3️⃣ 加规则（防止乱来）

强制要求输出格式、必须基于上下文、不允许编造

👉 类似：

“不给你瞎写的空间”

4️⃣ 记录和对比（可观测性）

每次结果都记录下来，可以对比哪个 prompt 更好

👉 类似：

“做 A/B 测试优化答案质量”


一句话总结（面试必杀）

Harness 本质是在 LLM 外层加了一套“评估 + 控制 + 反馈”的机制，把一次性、不可靠的生成过程，变成一个可验证、可优化、可迭代的系统。


## 去重

- 双循环去重

双重for（或while）循环是比较笨拙的方法 因为它的时间复杂度是O(n^2)

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    let res = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        let flag = true
        for (let j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) {
                flag = false;
                break
            }
        }
        if (flag) {
            res.push(arr[i])
        }
    }
    return res
}
不能处理多维数组，甚至连对象、引用类型都去不了重
```

- indexOf方法去重

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }
    return res
}

```

- indexOf方法去重2

利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return Array.prototype.filter.call(arr, function(item, index){
        return arr.indexOf(item) === index;
    });
}

```

- 相邻元素去重

这种方法首先调用了数组的排序方法sort()，然后根据排序后的结果进行遍历及相邻元素比对，如果相等则跳过改元素，直到遍历结束

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    arr = arr.sort()
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            res.push(arr[i])
        }
    }
    return res
}

```

- 利用对象属性去重

创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值1，每出现一次，对应的属性值增加1，这样，属性值对应的就是该元素出现的次数了

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    let res = [],
        obj = {}
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return res
}

```

- set与解构赋值去重

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return [...new Set(arr)]
}

```

```
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return Array.from(new Set(arr))
}

```

```
递归扁平化 + 去重
/**
 * 递归扁平化数组并去重
 * @param {Array} arr 多维数组
 * @param {Array} result 内部递归存储结果
 * @returns {Array} 扁平化且去重后的一维数组
 */
function flattenUnique(arr, result = []) {
  // 遍历每一项
  for (const item of arr) {
    // 如果是数组，递归处理
    if (Array.isArray(item)) {
      flattenUnique(item, result);
    } else {
      // 不是数组，判断是否已存在，不存在才 push
      if (!result.includes(item)) {
        result.push(item);
    }
  }
  return result;
}
```

## SKILLS 和 MCP

- Skills（技能）
就是把一段能力封装成一个“可复用模块”，让 LLM 在合适的时候调用
告诉模型“可以做什么”
登录逻辑、数据处理、UI 生成

- MCP（Model Context Protocol）
是一种标准协议，让 LLM 能连接外部系统（数据库 / API / 本地工具）
告诉模型“怎么接外部世界”
查数据库、调 API、读本地文件

Skills 和 MCP 是互补关系：
MCP 解决“模型如何接入外部能力”，Skills 解决“模型如何使用这些能力”。
在实际系统中，通常是 MCP 提供数据通道，Skills 做能力编排。

### frontend-design

最常被推荐的前端 UI Skill 之一

专门解决：AI 写 UI 太“模板化”的问题
会强制：
先做设计（配色 / typography / layout）
再写代码
输出更像“设计师级 UI”，而不是默认紫色渐变那种

社区评价（总结）：

没这个 skill，AI 做 UI 很普通；有了之后设计质量明显提升


它到底帮你做什么？

👉 普通 Claude：

写一个登录页面

👉 结果：

千篇一律 UI 😅

👉 加了这个 skill 后：

Claude 会自动：

先做设计方案（颜色 / spacing / 字体）
定 UI 结构（layout）
再生成代码（React / HTML）

👉 本质：

从“写代码” → 升级为“设计 + 代码”


npx skills-installer install anthropics/claude-code/frontend-design --client claude-code

claude

/skills

使用 frontend-design 帮我生成一个现代风格的个人主页，包含导航、简介、项目展示和联系表单
