- 如何隐藏一个元素？ 
  - display: none
    元素彻底从渲染树中移除，不占任何空间。
    触发 重排（reflow） + 重绘（repaint），因为布局发生变化。
  - visibility: hidden opacity: 0
    元素仍在渲染树中，继续占位，只是不可见。
    只触发 重绘，不引起重排，因为布局未变。
    - opacity 可触发事件， visibility 不可以
  
  浏览器渲染流程：构建 DOM → 构建渲染树 → 布局（reflow）→ 绘制（repaint）→ 合成。
  display: none 会直接影响“是否参与布局”，必须重建渲染树并重新计算布局，因此引发 reflow。
  visibility: hidden 只改变“绘制阶段的可见性”，布局树保持不变，因此只需重绘。



opacity: 0：控制元素的透明度，使其完全不可见，但元素依然存在于 DOM 和渲染树中，占据空间，且可以响应事件。
transform: translateZ(0)：
这是一个经典的“hack”方式，用于在旧版浏览器中强制创建一个合成层 (composite layer)。
当元素拥有合成层时，浏览器会将其提升到单独的图层，并尽可能使用 GPU 来处理该图层的绘制和变换（包括 opacity 的变化）。
这可以显著提升动画的流畅度，避免主线程卡顿。
will-change: opacity：
这是更现代、更推荐的方式，用来提前告知浏览器该元素的 opacity 属性即将发生频繁变化。
浏览器会据此进行优化，例如提前创建合成层，从而实现 GPU 加速。

## JS 中普通函数和箭头函数有什么区别？
特性	普通函数 (function)	箭头函数 (=>)
this 绑定	动态绑定：取决于调用方式 (obj.fn() 指向 obj)	静态绑定：取决于定义位置，继承外层作用域的 this（词法绑定）
arguments	有 arguments 对象	没有 arguments，需用 剩余参数 (...args) 替代
构造函数	可作为构造函数 new Fn()	不能 new，没有 [[Construct]]
原型 (prototype)	有 prototype 属性	没有 prototype
super/new.target	在类中可用	没有自己的 super 和 new.target
提升（Hoisting）	函数声明整体提升，函数表达式不提升变量值	箭头函数是表达式，和普通变量一样只提升声明不提升值
call/apply/bind	可改变 this 指向	call/apply/bind 只能传参，无法改变 this
语法简洁	相对冗长	更简洁，适合回调和内联函数 

“普通函数的 this 是动态绑定的，谁调用就指向谁；
箭头函数的 this 是在定义时确定的，直接继承外层作用域，哪怕用 call 或 bind 也改不了。
箭头函数也没有 arguments、prototype，所以不能 new。
我平时写回调、事件监听里会优先用箭头函数避免 this 丢失，但写构造函数、需要 arguments 的场景就必须用普通函数。”

性能层面：
箭头函数没有自己的作用域对象（没有 this/arguments），调用时少一次绑定开销，适合高频小回调。

“普通函数：灵活，但 this 跟着调用走；
箭头函数：简洁，this 跟着定义走。”

- 箭头函数能通过call、bind 、apply 方法改变this指向？
  不能。箭头函数的 this 在定义时已词法绑定外层作用域，call、apply、bind 只能传参不能改变其 this，所以调用这些方法不会影响箭头函数的指向。

- 箭头函数能作为构造函数吗
  不能，箭头函数没有 prototype 属性，也不绑定 this，因此不能用 new 关键字调用，不能作为构造函数。


## 异步编程
方式	核心特性	优点	缺点 / 注意点
回调函数	通过回调参数在任务完成后执行	简单直观，早期广泛使用	容易形成回调地狱、错误难传递
Promise	链式调用 .then/.catch 管理异步流程	支持链式、错误捕获统一	链式过多可读性下降
async/await	Promise 的语法糖，用同步写法写异步逻辑	代码清晰、接近同步风格	需搭配 try/catch 捕获错误
Generator	yield 暂停执行，可与 co 库配合	控制流程灵活	写法偏复杂、主流场景被 async 取代
事件/发布订阅	事件触发后异步执行监听器	解耦模块	调试困难，状态流转不明显
Web Worker	开辟子线程执行耗时任务	真正并行，防止阻塞 UI	无法直接操作 DOM，通信需序列化

JavaScript 是单线程的，异步是为了解决阻塞。
从早期的回调，到 Promise，再到 async/await，核心都是基于事件循环和任务队列，让长耗时任务放入异步队列，主线程继续执行。
我更倾向用 async/await，语义清晰又能优雅处理错误。”

- async await await 在等啥

await 等的本质是一个表达式的结果，通常是一个 Promise：
如果是 Promise，JS 会暂停当前 async 函数的执行，把后续代码放入微任务队列，直到该 Promise resolve/reject 后再继续。
如果是 非 Promise 值，会被 Promise.resolve() 包装成已完成的 Promise，立即继续执行。

“await 会等待右侧表达式转成 Promise 并 settle（resolve 或 reject）后，异步返回结果，再恢复 async 函数的执行。”

- await 后面必须是Promise对象吗？直接 await 1 可以吗？
await 后面不必须是 Promise，它会把任何值用 Promise.resolve() 包装：

如果是 Promise，会真正等待其 settle 后再继续。

如果是普通值，会立即转成一个已完成的 Promise，几乎同步返回。
  等价于 await Promise.resolve(1)

- promise 状态有哪些状态如何流转？

  状态	说明	变化条件	可流转方向
pending	初始状态，进行中	调用 resolve 或 reject	→ fulfilled 或 → rejected
fulfilled	已成功	resolve(value) 被调用	终态，不可再变
rejected	已失败	reject(reason) 被调用	终态，不可再变

“Promise 只有 pending、fulfilled、rejected 三种状态，
只会从 pending 单向流转到 fulfilled 或 rejected，且一旦 settle 就不可逆。”

- react hooks 为何不能放在条件循环中使用 
  - 函数组件每次渲染不会保留局部变量，React 只能在一次次调用之间自己保存 state/effect。
  - 它的做法是：给每个 Hook 在链表/数组里排位置（slot），比如第 1 个 slot 是 useState，第 2 个 slot 是 useEffect。
  - 下一次渲染时，React 不靠名字、也不靠你写的变量，只按调用顺序一个一个取：

    第 1 个调用 → 读/写 slot1
    第 2 个调用 → 读/写 slot2
    …依次对应。

- 如何理解React的合成事件？React是怎么进行事件绑定的？

  “React 的事件都是合成事件（SyntheticEvent），它是对浏览器原生事件的跨浏览器封装。
  我们在组件里写 onClick={handleClick}，并不是直接给 DOM 元素绑的原生事件，而是 React 在根节点 document上统一绑定了一个事件代理，等事件触发时，React 会创建一个 SyntheticEvent，沿组件树按虚拟 DOM 派发。”

  - 事件代理：React 不会给每个 DOM 绑定事件，而是统一绑在 document/root，节省内存，提高性能。
  - 跨浏览器：SyntheticEvent 屏蔽了各浏览器差异。
  - 自动池化：事件对象会被复用（需要异步访问要 event.persist()）。
  ```
  function Button() {
  const handleClick = (event) => {
    console.log(event.type);  // SyntheticEvent
    console.log(event.nativeEvent); // 浏览器原生事件
  };

  return <button onClick={handleClick}>Click me</button>;
}
  ```

  幕后过程：

  React 在渲染时收集组件的 onClick。

  把事件映射到内部事件池。

  在 document 根节点只绑一个 click 事件。

  点击按钮时，原生事件触发，React 捕获并合成 SyntheticEvent。

  React 根据虚拟 DOM 沿组件树冒泡，调用对应 handler。

  每个 DOM 都绑一次事件，React 只绑一次 document，节省性能。

  “React 的事件系统是代理 + 合成事件：组件里写的事件并不直接绑 DOM，而是统一代理在 document 根节点，触发时生成 SyntheticEvent，按虚拟 DOM 冒泡，这样既跨浏览器，又节省内存。
如果想访问原生事件，可用 event.nativeEvent，或者用 event.persist() 避免被池化回收。”

react 17后 已经移除了事件池化（event pooling）机制，因此不再需要使用 event.persist()。

- 如何在react 中使用原生事件
  React 的事件是合成事件，要直接绑原生事件需用 ref 拿到 DOM，再 add/removeEventListener，适合处理非 React 管控或全局事件。

  ```
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const handler = () => console.log('原生事件');
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, []);
  return <div ref={ref}>Click me</div>;

  ```

- react. 中key 的作用是什么。

  在 React 中，key 用来标识列表中每个元素的唯一身份。当组件重新渲染时，React 会用 Diff 算法 对比新旧虚拟 DOM。
如果没有 key，React 会用索引顺序对比，新增或删除元素可能会引起不必要的重渲染或状态错乱；
有了 key，React 能快速找到对应节点，只更新真正变化的部分，从而最小化 DOM 操作，提升性能。

- 有了解过fiber 吗？ Fiber具体结构是怎么样的
  Fiber 是 React 16 引入的新架构，本质上是一个可中断、可优先调度的虚拟 DOM 单元链表。
  它把渲染工作拆成小块（unit of work），支持增量渲染和任务调度，让 React 不再阻塞主线程，提高响应速度和用户体验。

  一个 Fiber 节点大致包含这些关键属性：

  属性	说明
  type	节点类型（元素类型或组件类型）
  key	唯一标识，用于列表 diff
  stateNode	对应的 DOM 节点或 class 组件实例
  return	指向父 Fiber
  child	指向第一个子 Fiber
  sibling	指向下一个兄弟 Fiber
  pendingProps	新的 props
  memoizedProps	上一次 props，用于比较
  memoizedState	上一次 state，用于比较
  effectTag	副作用标记（新增/删除/更新）
  nextEffect	链表指向下一个有副作用的 Fiber

  可以理解成一颗树 + 链表混合结构：树形表示组件层级，链表方便遍历和调度。


- 进程和线程的区别是什么？
  进程 是操作系统进行资源分配和调度的基本单位。它是一个程序的执行实例，拥有独立的内存空间（堆、栈、代码段等），比如你打开一个 Chrome 浏览器，它就是一个进程。
  线程 是 CPU 调度和执行的基本单位，是进程内的一个执行流。一个进程可以包含多个线程，这些线程共享进程的内存空间，但拥有各自的调用栈。

  核心区别可以总结为三点

  资源开销：进程之间是相互独立的，切换开销大；线程属于同一进程，共享资源，切换开销小。

  内存隔离：进程有独立的地址空间，一个进程崩溃通常不会影响其他进程；线程共享进程内存，一个线程出错可能影响整个进程。

  通信方式：进程间通信（IPC）较复杂，如管道、消息队列；线程间可以直接通过共享变量通信，但也需要同步机制（如锁）避免冲突。

  现代浏览器采用多进程架构。比如 Chrome 中，每个标签页、插件、GPU 都可能运行在独立进程中，保证一个页面崩溃不会导致整个浏览器崩溃。

  而在单个页面内，JavaScript 是单线程执行的，这避免了复杂的多线程同步问题。但为了不阻塞主线程，我们通过事件循环（Event Loop）、Web Workers 等机制实现异步和并行处理。Web Workers 本质上是启动了新的线程来执行耗时任务，与主线程通信。

  所以，简单说：进程是‘工厂’，线程是‘工人’。一个工厂（进程）可以有多个工人（线程）协同工作，但每个工厂是相互隔离的。”

- 什么情况下会出现死锁
  线程属于同一个进程，可以访问进程的共享内存，所以能通过读写同一变量来通信。但正因为多个线程能同时操作这些变量，就容易引发数据冲突或不一致。比如一个线程正在改数据，另一个也来改，结果可能出错。所以必须用锁等同步机制控制访问顺序，保证安全。
  死锁就像两个人互相堵住对方的路，谁也不让，结果都动不了。

  两个线程都需要两把锁（A和B）。线程1拿到了A，等着B；线程2拿到了B，等着A。它们都在等对方先放手，但谁都不肯放，结果就卡住了，程序“死”了。这就是死锁。  


  JS执行和页面渲染（布局、绘制等）共用主线程，无法同时进行。JS运行时会阻塞渲染，导致页面卡顿；渲染时JS也得暂停。二者互斥，需合理安排任务避免阻塞。

- HTTP属于计算机网络的哪一层？
  HTTP 属于应用层协议。

- 常见的HTTP 状态码有哪些？

  状态码	含义	前端场景说明
200 OK	请求成功	最常见，接口正常返回数据
201 Created	资源创建成功	POST 请求成功创建了资源
204 No Content	成功但无返回体	DELETE 成功或无需返回数据
301 Moved Permanently	永久重定向	SEO 优化，旧 URL 永久跳转新地址
302 Found	临时重定向	临时跳转，浏览器可能将 POST 改为 GET
304 Not Modified	资源未修改（缓存生效）	协商缓存命中，节省带宽
307 Temporary Redirect	临时重定向（方法不变）	临时跳转，且请求方法和主体保持不变
308 Permanent Redirect	永久重定向（方法不变）	永久跳转，且请求方法和主体保持不变
400 Bad Request	请求语法错误	参数格式错误，前端需校验
401 Unauthorized	未认证	用户未登录或 token 失效
403 Forbidden	无权限访问	登录了但无操作权限
404 Not Found	资源不存在	URL 错误或资源被删除
429 Too Many Requests	请求过于频繁	接口限流，需降频或排队
500 Internal Server Error	服务器内部错误	后端代码异常，需排查
502 Bad Gateway	网关错误	反向代理（如 Nginx）后端服务异常
503 Service Unavailable	服务不可用	服务器维护或过载，可重试

- 传输层常见的协议有哪些？ TCP和UDP 有啥区别？
  传输层常见协议：TCP（传输控制协议）和 UDP（用户数据报协议）。

  区别：TCP 是面向连接、可靠的，保证数据顺序和完整性，适用于网页、文件传输；UDP 是无连接、不可靠的，速度快但不保证送达，适用于视频通话、直播、DNS 查询。TCP 有拥塞控制，UDP 没有。

- 常见的数据结构有哪些？

  常见的数据结构包括：数组、链表、栈、队列、哈希表、树（如二叉树、BST）、图等。数组支持随机访问，链表增删高效；栈和队列是受限的线性结构，分别遵循后进先出和先进先出；哈希表查找接近 O(1)，常用于去重和映射；树适合层级和搜索场景，如 DOM 树；图用于复杂关系建模。掌握这些结构的特点和适用场景，能帮助我们写出更高效、可维护的代码，是解决算法和工程问题的基础。

- 在列表中查找一个元素的时间复杂度是多少，插入元素呢？
  - 顺序表（数组）和链表
  ## 顺序表
  - 查找元素 O(n)
    如果是无序数组，需要遍历整个数组；有序数组可以用二分查找，O(log n)

  - 插入元素O(n)
    在末尾插入通常是 O(1)，但在中间或开头插入需要移动后续元素，O(n)

  ## 链表
  链表（单链表/双链表）
  查找元素O(n)
  链表没有索引，需要从头遍历
  插入元素O(1)已知插入位置节点时，修改指针即可；但如果需要先查找位置，则仍需 O(n)


  JS 的数组是顺序表，push 是 O(1) 均摊，unshift 或 splice 插入中间是 O(n)
  对于大数据量插入，链表可能更高效

- 大文件上传
  大文件上传采用分片上传策略，将文件切分为多个小块并行上传，提升稳定性和效率。上传前通过Web Worker或File API计算文件整体及分片的Hash值，向服务端校验，若文件已存在则直接秒传。前端记录上传进度和已成功分片，支持断点续传，避免重复传输。服务端按序接收分片，存储后进行合并，并校验最终文件完整性。结合唯一标识和分片索引，确保上传可靠。整个过程配合进度条和错误重试机制，提升用户体验与系统健壮性。
  