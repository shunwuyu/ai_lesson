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