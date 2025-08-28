# 字节面试题

- 介绍一下闭包
    2025_qiu/js/closure

- setTimeout里的回调函数是闭包吗

从定义上说，setTimeout 的回调一般都会形成闭包。
因为它在创建的时候捕获了外层函数的变量，即使外层函数执行栈结束，变量依然能被访问，这正是闭包的特性。

但严格来说，setTimeout 的回调函数本身不是一个闭包，因为闭包的本质是‘函数 + 词法环境的绑定’。如果这个回调函数引用了外层作用域的变量，那么它就构成了一个闭包；如果没有引用，它就是一个普通函数。所以，是否是闭包，取决于函数是否捕获外部变量，而不是 setTimeout 这个 API。
```js
// 不是
setTimeout(() => {
  console.log("hello");
}, 1000);
// 是
// 闭包（Closure）：一个函数 + 它所捕获的词法环境（lexical environment）。
function outer() {
  let secret = "I'm hidden";
  return function inner() {
    console.log(secret); // inner 是闭包
  };
}
```

对“闭包”的狭义理解
闭包必须是函数返回一个内部函数。
```js
function createCounter() {
  let count = 0;
  return () => count++;
}
他们认为这才是“标准闭包”，而 setTimeout 回调只是“用了外部变量”，不算“真正”的闭包。 

这是对闭包的狭义理解

广义
你不知道的 JavaScript
只要一个函数能访问其定义时的词法作用域，即使在该作用域之外执行，它就是闭包。
```

## 闭包的概念
闭包（Closure）是指：一个函数能够访问并记住其词法作用域（lexical scope），即使这个函数在其词法作用域之外执行。

## 事件循环 

setTimeout 是一个异步 API，它将回调函数交给浏览器的 Timer 模块管理。
当定时器到期，回调函数被推入 任务队列（Task Queue）。
事件循环（Event Loop）在适当的时候将回调取出，放入调用栈执行。
此时，回调函数仍然能访问定义时的词法环境——这正是闭包的核心机制。

闭包的本质是：函数 + 词法环境的绑定，而不是“异步”或“延迟执行”。

setTimeout 只是提供了一个让函数延迟执行的场景，而闭包是由函数是否捕获外部变量决定的。

## 经典陷阱

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出 3, 3, 3
  }, 100);
}
```
var 是函数作用域, i 在全局/函数作用域中只有一个。
三个回调函数都共享同一个词法环境中的 i。
这正是闭包的体现：回调函数记住了 i 的引用，而不是值。

修复方式 使用 let（块级作用域）或立即执行函数（IIFE）创建独立闭包。

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出 0, 1, 2
  }, 100);
}


```

let 在每次迭代时创建一个新的词法环境，每个回调函数都绑定到不同的 i，形成多个独立闭包。

## 对ts的泛型如何理解
exa1
泛型是 类型的函数，就像 JS 里函数接受参数返回值，泛型则接受类型参数返回新类型。

泛型就是 在类型层面引入参数化机制。它的核心目标是 在编译期提供类型安全，同时保持代码的复用性。

相比于 any，泛型能让类型与调用方绑定，不丢失信息。

## async 和await 是什么， 如何实现的？

async/await 是 ES2017 引入的异步编程语法糖，作用是让异步代码写起来像同步。

- async 声明的函数一定返回一个 Promise。
- await 会暂停 async 函数的执行，等待右侧的 Promise 解决后再继续。

- generator
    2025_qiu/js/genco

- 核心原理

    本质上，async/await 是对 Promise + Generator 的封装。

    async 函数内部会被编译成一个状态机（类似 Generator）。

    每个 await 就像 Generator 的 yield，只不过 JS 引擎自动帮我们调用 .next()，把异步流程封装了。

    ```js
    async function foo() {
        const a = await bar();
        return a + 1;
    }
    //转换成
    function foo() {
        return new Promise((resolve, reject) => {
            bar().then(a => {
            resolve(a + 1);
            }).catch(reject);
        });
    }

    所以本质上它还是 Promise，只是写法更优雅。
    ```
- 和事件循环的关系
    await 会让出线程，把后续逻辑放到 微任务队列 中。
    ```
    async function test() {
    console.log(1);
    await null;
    console.log(2);
    }
    test();
    console.log(3);
    执行顺序是 1 → 3 → 2，这就是 await 本质上是 Promise.then 微任务 的体现。
    ```

## 业务场景

- API 请求串行
```
//代码清晰，比 .then() 链式更可读。
async function getUserInfo() {
  const user = await fetch("/api/user").then(r => r.json());
  const orders = await fetch(`/api/orders?uid=${user.id}`).then(r => r.json());
  return { user, orders };
}
async function getData() {
  const [user, orders] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/orders").then(r => r.json())
  ]);
  return { user, orders };
}
//说明你知道 await 不能乱用，否则会变成串行请求，性能差。
```

### 常见坑 & 最佳实践

- await 只能在 async 函数里用（ES2022 才有顶层 await）。
- 使用 await 时要注意 错误处理，推荐 try/catch 或 Promise.allSettled。
- 过多的 await 会阻塞 async 函数内部的并发，可以结合 Promise.all 优化。


## async await 错误处理
```
async function getUserData() {
  try {
    const user = await fetch("/api/user").then(r => r.json());
    console.log("用户数据：", user);

    // 如果上一行失败，下面不会继续执行
    const orders = await fetch(`/api/orders?uid=${user.id}`).then(r => r.json());
    console.log("订单数据：", orders);

    return { user, orders };
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return null;
  }
}

getUserData();
适合 任务依赖性强 的场景（例如必须先拿用户信息，才能请求订单）。
```

```
async function getDashboardData() {
  const results = await Promise.allSettled([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/orders").then(r => r.json()),
    fetch("/api/notifications").then(r => r.json())
  ]);

  // 分类处理成功/失败
  const [userRes, ordersRes, notifRes] = results;

  if (userRes.status === "fulfilled") {
    console.log("用户数据：", userRes.value);
  } else {
    console.error("用户请求失败：", userRes.reason);
  }

  if (ordersRes.status === "fulfilled") {
    console.log("订单数据：", ordersRes.value);
  }

  if (notifRes.status === "rejected") {
    console.error("通知请求失败：", notifRes.reason);
  }
}

getDashboardData();
即使部分请求失败，其他请求也能返回结果，不会因为一个错误导致整体失败。

适合 并发请求、允许部分失败 的场景，比如 仪表盘、聚合页面、推荐位 等。
```

## Flex shrink & grow 

- flex: 1 是什么
flex 是缩写：flex: <grow> <shrink> <basis>。
grow 剩余空间分配权重
flex-shrink：是否允许缩小
flex-basis：初始主轴尺寸
flex: 1 等价于 flex: 1 1 0%
basis: 0% 让初始尺寸视为 0，后续完全按 grow 比例平分。
flex: auto 等价于 flex: 1 1 auto：先按内容/width定个“起跑线”，再在剩余空间里按 grow 分。

属性	等价写法	行为说明
flex: 1	flex: 1 1 0%	增长权重1，允许缩小，初始大小为0% → 强行从0开始拉伸
flex: auto	flex: 1 1 auto	增长权重1，允许缩小，初始大小为内容大小 → 在内容基础上拉伸
flex: 1 和 flex: auto 的核心区别在于 flex-basis。
flex: 1 相当于 flex-basis: 0%，意味着放弃内容尺寸，从零开始均分空间；
lex: auto 是 flex-basis: auto，先尊重内容本身大小，再分配剩余空间。
exa2

## 假如你正在面大厂前端实习岗 router 有几种模式， history 和 hash 各自有什么缺点？ 怎么回答， 由浅入深， 案例驱动，让面试官眼前一亮

- Hash（#）、History（HTML5 pushState）
    Hash 模式使用 URL 的 #（#fragment）来表示路由，优点是无需服务器配置、兼容旧环境；缺点是 URL 不漂亮、对 SEO不友好。
    History 模式使用 HTML5 History API（pushState/replaceState），URL 干净且适合 SEO（配合 SSR/prerender），缺点是需要服务端做 fallback/rewrite，否则刷新或直接访问会 404。

    - 服务器配置的理解
        Hash 路由的 # 后面部分不会发送给服务器，只在浏览器内处理

        而 History 路由的路径是真实 URL，服务器必须返回 index.html，否则会 404。

        用户访问：http://example.com/#/user/profile
        GET / HTTP/1.1
        Host: example.com

        history
        用户可能直接访问 example.com/user/profile
        此时浏览器会向服务器请求 /user/profile
        如果服务器没有配置，就会返回 404 Not Found
        正确做法：服务器要配置 “兜底路由”（fallback），把所有前端路由请求都指向 index.html

        ```js
        location / {
            try_files $uri $uri/ /index.html;
        }
        定义一个 location 块，匹配所有请求（/ 是根路径，最宽松的匹配）
        所有进入 Nginx 的请求都会先进入这个块（除非有更精确的匹配）
        $uri 是 Nginx 变量，表示当前请求的路径（不带参数）
        尝试：是否存在一个叫 /user/profile 的文件？
        如果不存在，进入下一个尝试。
        $uri/
        尝试把这个路径当作目录
        /user/profile/
        是否存在一个叫 /user/profile/ 的目录
        Nginx 会尝试返回该目录下的默认文件（如 index.html）
        /index.html
        这是最后一个兜底选项
        ```

    - hash
    # + hashChange
    - history
    history.pushState(state, title, url)
    history.replaceState(state, title, url)
    window.onpopstate

    - 搜索引擎通常不索引#后内容，且hash路由无独立URL，不利于页面抓取和排名。


    特性	Hash 路由	History 路由
URL 示例	/#/user	/user
是否发送到服务器	❌ 不会	✅ 会
是否需要服务器配置	❌ 不需要	✅ 需要（兜底返回 index.html）
SEO 友好	❌ 差	✅ 好
URL 美观	❌ 有 #	✅ 干净
刷新页面是否 404	❌ 不会（服务器只收 /）	✅ 会（如果服务器没配置）
使用 API	window.location.hash	history.pushState()
适用场景	内部系统、快速原型	正式产品、SEO 要求高

- 缺点
    - Hash 模式
    URL 可读性与美观差：https://site.com/#/users/1，不利于分享/品牌感。

    SEO 与社交抓取：虽然现在大多数搜索引擎能执行 JS，但历史上 # fragment 不会作为请求路径，某些爬虫/预览服务可能不处理，影响索引/预览（若 SEO 很关键需 SSR/prerender）。

    锚点冲突 & 用户预期：# 本来用于页面锚点，复杂 fragment 可能导致语义混淆或难以使用原生 “跳转到锚点” 功能。

    双层 hash 情况：如果还需要页面 fragment（如 #/path#anchor），会变得混乱。

- History 模式（工作原理）
    - 需要服务器端配置 fallback（最核心问题）：
    - 浏览器兼容与退化策略
    - 浏览器兼容与退化策略：极少数旧浏览器不支持 History API，需要做回退或 polyfill。

## setState 是异步还是同步的， setState 的同步更新是怎么实现的？

- setState 本身不是 async 函数，但 状态更新是被调度（queued）并且通常会被批处理（batched），因此看起来像“异步”。要强制“同步生效”可用 flushSync。

- “异步”是什么意思
    当你调用 setState / setXxx，React 把这次更新放进内部的更新队列，并安排一次 render/commit。多个更新在同一次调度周期会合并成一次渲染（这就是 batching，能减少重渲染，提升性能）。这就是通常说的“看起来是异步”的原因：调用后立刻去读 state 可能还是老值。

- 在 React 17 及以前，批处理主要发生在 React 的事件处理器内部（浏览器原生异步边界如 setTimeout 里不会被自动合并）。
- 从 React 18 起，引入了 automatic batching：现在 React 会在更多异步边界（如 setTimeout、promise 回调）也自动合并多次状态更新，从而进一步减少渲染次数。

```js
class Counter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // 仍然打印旧值（如 0）
  };

  render() { return <button onClick={this.handleClick}>{this.state.count}</button>; }
}
两次 setState({count: this.state.count + 1}) 在同一次调度周期里读取到相同的旧 state，合并后相当于只 +1。

改进：使用函数式 updater，确保每次都使用当前最新的 prev state

this.setState(prev => ({ count: prev.count + 1 }));
this.setState(prev => ({ count: prev.count + 1 }));

函数式 updater 是官方推荐的避免“竞态读旧值”的方式）

function Counter() {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count); // 还是旧值
  };
  // 正确写法：
  // setCount(c => c + 1);
  // setCount(c => c + 1);
}

```

setTimeout / promise / React 18 的自动合并（面试点）
```js
// 在 React 17（或旧行为）：
setTimeout(() => {
  setA(a => a + 1); // 会触发一次 render
  setB(b => b + 1); // 再次触发一次 render（没有被合并）
}, 0);

// 在 React 18（automatic batching）：
setTimeout(() => {
  setA(a => a + 1);
  setB(b => b + 1);
  // 这两次会被自动合并为一次 render（更高效）
}, 0);

```
如果真的需要“同步”更新——flushSync
```js
import { flushSync } from 'react-dom';

function onAddItem() {
  flushSync(() => {
    setItems(prev => [...prev, newItem]);
  });
  // 此时 DOM 已提交，可以安全读 scrollHeight
  listRef.current.scrollTop = listRef.current.scrollHeight;
}
flushSync 会破坏批处理带来的性能优势，应尽量少用（官方也有提醒）

setState 将更新包装成“更新对象”并放入对应 fiber 的更新队列 → React 调度器收到更新后决定何时执行（同步/异步/并发优先级）→ render（调和/比较）→ commit（DOM 更新）
```

## hook 为什么只能写在第一层， hook 为什么会顺序执行？
exa3

- demo1
切换 颜色
Rendered fewer hooks than expected. This may be caused by an accidental early return statement.

- 首次渲染
    color = 'red' → 进入 if 块
    执行 useState(0) → count = 0

- 点击“切换颜色”变成 blue：
    color = 'blue' → 跳过 if 块
    useState(0) 不执行
    下一个 useState('small') 执行

- 再切回 red：
    color = 'red' → 进入 if 块
    执行 useState(0)
    但 React 内部 Hook 链表已错位！
    

## 后端写了没？

在实习和学习项目中，我主要专注于前端架构和功能实现。为了高效开发和解耦，我使用 Mock.js 独立模拟了完整的后端接口（包括数据格式、延迟、随机值等），这让我能深入理解 API 设计、Restful开发风格和前后端协作规范。同时，我完全掌握跨域原理（如 CORS）和前后端联调流程，熟悉如何对接真实后端服务。虽然项目未涉及后端开发，但我清楚接口契约的重要性，能确保前端代码无缝对接真实 API。我具备独立完成前端闭环开发和高效协作的能力。最近在写的next.js 项目， 结合了mysql, prisma在做全栈的ssr。

## 大模型的role 有哪一些？

system       系统角色        用来设定整体对话的行为、身份或风格，
                            例如：“你是一个乐于助人的老师”。

user         用户角色        表示真实用户的输入或问题。
assistant    助手角色        表示模型的回复内容。
function->tool 工具/函数角色  当使用 function calling 或工具调用时，模型可以生成对工具的调用，返回结果时通常以这个角色。

## chat memory
- 丢失记忆
- 简单拼接
- 总结
exa4

## LRU 缓存

https://leetcode.cn/problems/lru-cache/description/

实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

exa5
ES2015 (ES6) 开始，Map 对象明确保证了其元素的顺序
插入顺序 (Insertion Order)：Map 会严格按照键值对被添加（set）到 Map 中的顺序来进行迭代。
更新不改变位置：当你使用 map.set(key, value) 更新一个已经存在的 key 的值时，这个键值对在 Map 内部的顺序位置不会改变。它仍然保持在最初插入时的位置。
删除与重新插入会改变位置：如果你先 map.delete(key) 删除一个键，然后再 map.set(key, newValue) 重新插入同一个键，那么这个键值对会被添加到 Map 的末尾，因为它被视为一个新的插入操作。

get(key) 操作：当访问一个已存在的键时，为了将其标记为“最近使用”，我们需要把它移到“新”的位置（末尾）。我们通过 delete + set 实现：
this.cache.delete(key); // 移除旧的（位置不变）
this.cache.set(key, value); // 重新插入，放在末尾（成为最新的）

put(key, value) 操作：
如果是新键：直接 set 会将其添加到末尾。
如果是更新旧键：先 delete 再 set，也会将其移到末尾。

淘汰策略：由于 Map 保证了插入顺序，那么最久未使用的项（即 LRU 项）必然位于 Map 的开头。当需要淘汰时，获取 this.cache.keys().next().value 就能得到第一个（最旧的）键。

## 大模型调优的手段
  ollama 
  
## Prompt 写死会有什么问题？
将 Prompt 模板（PromptTemplate）完全写死（硬编码）会导致灵活性差和维护困难。当需要调整角色、任务或变量时，必须修改代码本身，无法动态注入内容，违背了模板“动态填充”的设计初衷，降低了可复用性和适应性。
## Prompt 规范
- 结构化：把提示分成角色、任务、约束、输出格式四个部分，并用清晰分隔符；
coze 用了这个
```
### 角色 (Role)
[明确指定模型需要扮演的身份或专业角色]

### 任务 (Task)
[清晰、具体地描述需要模型完成的核心工作]

### 约束 (Constraints)
- [限制条件 1，例如：字数、避免的内容、特定视角等]
- [限制条件 2]
- [限制条件 3]
- ...

### 输出格式 (Output Format)
[明确指定期望的输出结构，例如：JSON、Markdown 列表、特定标题等]
```
- 简洁明确：避免冗长和歧义，确保模型能唯一理解任务；
- 可维护：把 Prompt 模板化、抽离成配置文件，并支持版本管理和动态拼接；
  工程化
- 安全性：通过系统级 Prompt 锁定角色，避免用户注入攻击；

- 可评估：在规范里定义如何量化效果，比如自动评测+人工评审。

### PromptTemplate
PromptTemplate 就是把 Prompt（提示词）抽象成一个带变量的模板，可以在运行时填充不同参数，从而生成动态 Prompt。

exa6

## MCP 是什么？

MCP（Model Context Protocol）是Anthropic提出的一种开放协议，旨在标准化大模型（LLM）与外部工具、数据源之间的交互。它允许模型安全、结构化地请求和使用实时信息（如天气、数据库），突破自身知识库限制，提升回答的准确性和实用性，是构建强大AI代理（Agent）的关键技术。

高德地图接入MCP后，大模型可直接、安全地调用其实时、权威的地理信息服务。用户无需跳转，即可在对话中获取精准的实时路况、最优路线规划、周边POI搜索等动态信息，极大提升了智能助手在出行场景下的实用性、准确性和用户体验，实现“对话即服务”。

## 虚拟DOM
/react/vdom/hand_code

## 合并区间

- 中等难度
- 贪心算法
  贪心算法在每步选择中都采取当前最优解，希望通过一系列局部最优选择达到全局最优。
- 合并区间为什么用的是贪心
  因为合并区间时，按起点排序后，每次将当前区间与已合并的最后一个区间尝试合并，这个“能合并就合并”的局部最优选择，最终能得到最少数量的不重叠区间（全局最优），符合贪心思想。

- 怎么排序？
  - 保证顺序性  排序后，我们能确保在遍历过程中，前面的区间起点不会晚于后面的区间起点。
  - 简化合并判断 这是应用贪心策略的基础。当我们按顺序处理区间时，只需要判断当前区间是否与“已合并结果”中的最后一个区间重叠即可。判断重叠的条件非常简单：当前区间的起点 <= 已合并最后一个区间的终点
  - 避免遗漏： 如果不排序，一个起点很晚但终点很长的区间可能会与前面多个未合并的区间重叠，导致逻辑复杂且容易出错。排序后，重叠关系变得线性且可预测。

  exa7

## 二叉平衡树 数据结构特点
- 树
  相比于链表和栈的线性结构，一种非线性的层次化数据结构。
- 二叉树 
  递归定义：由一个根节点，左子树和右子树组成，而每个子树本身也是一棵二叉树。
- 满二叉树： 除了叶子节点外，每个节点都有两个子节点，且所有叶子节点都在同一层。
- 完全二叉树： 
  完全二叉树就像一排排坐满人的座位，除了最后一排，前面每排都坐满了人，并且最后一排的人也是从最左边开始连续坐着，中间不能有空位。
  ![](https://i-blog.csdnimg.cn/blog_migrate/5063615c5551e569d35d6dbdd515f53f.jpeg)
- 二叉搜索树 Binary Search Tree 对于任意节点，其左子树所有节点值小于该节点值，右子树所有节点值大于该节点值。
  高效查找、插入、删除有序数据
- 二叉平衡树
  二叉平衡树是通过约束左右子树高度差来保持树高平衡的二叉搜索树。
  二叉搜索树（BST）在极端情况下会退化成链表 
     升序序列 [1, 2, 3, 4, 5]

  1
    2
      3
        4
          5

  最终的树只有右子树，没有左子树。每个节点最多只有一个孩子（右孩子），这与单向链表的结构完全一致。
  O(n), 而不是 O(log n)

  理想 BST 性能： 在一个平衡的 BST 中，树的高度约为 log₂(n)。查找、插入、删除操作的时间复杂度是 O(log n)。对于 n=5，理想高度是 log₂(5) ≈ 2.3，操作最多需要 3 步

  退化 BST 性能： 在这个退化的例子中，树的高度等于节点数量 n。查找、插入、删除操作的时间复杂度退化为 O(n)。要查找 5，需要 5 步。

  结论： 当输入数据有序时，普通 BST 会失去其“二分查找”的优势，性能从高效的 O(log n) 恶化为与线性搜索（链表）相当的 O(n)。

  平衡的意义：通过限制“左右子树高度差 ≤ 1（或其他定义）”，使得树的高度接近 log n。

  好处：常见操作（查找、插入、删除）都能在 O(log n) 时间完成，而不是最坏的 O(n)。

  - AVL树
  假设有一棵 AVL 树，依次插入 [10, 20, 30]
  10      根
    20    变成 10 的右子
      30  树变成链表结构（不平衡，右高左低差 2）
    
  解决：右旋或左旋
  这种情况叫 右右失衡
  通过 左旋，把 20 提上来：
     20
  10    30
  插入后恢复平衡，查询依然是 O(log n)。
  严格定义平衡因子（左右子树高度差≤1），并在插入/删除后立即通过旋转（如左旋、右旋） 来强制恢复平衡的机制

- 红黑树
- B+树


## hash冲突如何解决
- 静态资源 强缓存，如果要提前更新呢？hash 直接新文件
  exa8
  内容修改，就会改hash
  内容没改，不会改