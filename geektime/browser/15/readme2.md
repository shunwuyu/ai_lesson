# 消息队列和事件循环：页面是怎么“活”起来的？

- 每个页面都有一个渲染进程， 渲染进程会启动主线程。它要负责哪些工作？
    - 处理 DOM
    解析 HTML 生成 DOM 树
    - 计算样式
    合并 CSS 规则与元素默认样式，确定每个 DOM 节点最终的可视化样式属性值。
    CSSOM 树
    - 还要处理布局
    文档流， 盒模型， BFC(弹性布局，浮动...)
    基于计算样式，计算 DOM 节点在屏幕的精确位置、尺寸等几何布局信息。
    - 处理 JavaScript 任务以及各种输入事件
    v8 引擎  事件系统

    V8 引擎（处理 JS 执行）和渲染引擎（如 Blink/WebKit，处理 DOM/CSS/ 布局 / 绘制）均运行在渲染进程内，共享其主线程执行核心任务。

    主线程非常繁忙， 这么多不同类型的任务在主线程中有条不紊地执行，这就需要一个系统来统筹调度这些任务，这个统筹调度系统就是我们今天要讲的消息队列和事件循环系统。

## 消息队列和事件循环系统

### 使用单线程处理安排好的任务

最简单的场景讲起，比如有如下一系列的任务
```
void MainThread(){
     int num1 = 1+2; //任务1
     int num2 = 20/5; //任务2
     int num3 = 7*8; //任务3
     print("最终计算的值为:%d,%d,%d",num1,num2,num3)； //任务4
}
```

![](https://static001.geekbang.org/resource/image/72/bc/72726678ac6604116c1d5dad160780bc.png?wh=1142*488)

线程执行时，这些任务会按照顺序在线程中依次被执行；等所有任务执行完成之后，线程会自动退出。

### 在线程运行过程中处理新任务

并不是所有的任务都是在执行之前统一安排好的, 比如在线程执行过程中，又接收到了一个新的任务要求

**要想在线程运行过程中，能接收并执行新的任务，就需要采用事件循环机制**

```
//GetInput
//等待用户从键盘输入一个数字，并返回该输入的数字
int GetInput(){
    int input_number = 0;
    cout<<"请输入一个数:"; // 会让主线程一直阻塞在输入等待状态
    cin>>input_number;
    return input_number;
}

//主线程(Main Thread)
void MainThread(){
     for(;;){
          int first_num = GetInput()；
          int second_num = GetInput()；
          result_num = first_num + second_num;
          print("最终计算的值为:%d",result_num)；
      }
}
```

相较于第一版的线程，这一版的线程做了两点改进。

第一点引入了循环机制，具体实现方式是在线程语句最后添加了一个 for 循环语句，线程会一直循环执行。

第二点是引入了事件，可以在线程运行过程中，等待用户输入的数字，等待过程中线程处于暂停状态，一旦接收到用户输入的信息，那么线程会被激活，然后执行相加运算，最后输出结果。

引入事件循环机制，就可以让该线程“活”起来了，我们每次输入两个数字，都会打印出两数字相加的结果

![](https://static001.geekbang.org/resource/image/9e/e3/9e0f595324fbd5b7cd1c1ae1140f7de3.png?wh=1142*673)

### 处理其他线程发送过来的任务

我们改进了线程的执行方式，引入了事件循环机制，可以让其在执行过程中接受新的任务。

不过在第二版的线程模型中，所有的任务都是来自于线程内部的，如果另外一个线程想让主线程执行一个任务，利用第二版的线程模型是无法做到的。

![](https://static001.geekbang.org/resource/image/2e/05/2eb6a8ecb7cb528da4663573d74eb305.png?wh=1142*661)

渲染主线程会频繁接收到来自于 IO 线程的一些任务，接收到这些任务之后，渲染进程就需要着手处理，比如接收到资源加载完成的消息后，渲染进程就要着手进行 DOM 解析了；接收到鼠标点击的消息后，渲染主线程就要开始执行相应的 JavaScript 脚本来处理该点击事件。

- 如何设计好一个线程模型，能让其能够接收其他线程发送的消息呢？

    **消息队列** 

    ![](https://static001.geekbang.org/resource/image/6d/5e/6d141ec0925590d83d97a37cce8e6f5e.png?wh=1142*316)

    消息队列是一种数据结构，可以存放要执行的任务。

    先进先出

    要添加任务的话，添加到队列的尾部；要取出任务的话，从队列头部去取。

    ![](https://static001.geekbang.org/resource/image/2a/ab/2ac6bc0361cb4690c5cc83d8abad22ab.png?wh=1142*692)

    改造可以分为下面三个步骤

    - 添加一个消息队列；
    - IO 线程中产生的新任务添加进消息队列尾部；
    - 渲染主线程会循环地从消息队列头部中读取任务，执行任务。

    按步骤使用代码来实现第三版的线程模型。

    首先，构造一个队列。

    ```
    class TaskQueue{
        public:
        Task takeTask(); //取出队列头部的一个任务
        void pushTask(Task task); //添加一个任务到队列尾部
    };
    ```
    接下来，改造主线程，让主线程从队列中读取任务：

    ```
    TaskQueue task_queue；
    void ProcessTask();
    void MainThread(){
    for(;;){
        Task task = task_queue.takeTask();
        ProcessTask(task);
    }
    }
    ```

    我们添加了一个消息队列的对象，然后在主线程的 for 循环代码块中，从消息队列中读取一个任务，然后执行该任务，主线程就这样一直循环往下执行，因此只要消息队列中有任务，主线程就会去执行。

    主线程执行的任务都全部从消息队列中获取。所以如果有其他线程想要发送任务让主线程去执行，只需要将任务添加到该消息队列中就可以了，

    ```
    Task clickTask;
    task_queue.pushTask(clickTask)
    ```

## 处理其他进程发送过来的任务

通过使用消息队列，我们实现了线程之间的消息通信。

跨进程之间的任务也是频繁发生的，那么如何处理其他进程发送过来的任务？

![](https://static001.geekbang.org/resource/image/e2/c6/e2582e980632fd2df5043f81a11461c6.png?wh=1142*834)

渲染进程专门有一个 IO 线程用来接收其他进程传进来的消息，接收到消息之后，会将这些消息组装成任务发送给渲染主线程。

## 设计线程模型

如何设计好一个线程模型，能让其能够接收其他线程发送的消息呢？

**消息队列**

![消息队列](https://static001.geekbang.org/resource/image/6d/5e/6d141ec0925590d83d97a37cce8e6f5e.png?wh=1142*316)


消息队列是一种数据结构，可以存放要执行的任务。它符合队列“先进先出”的特点，也就是说要添加任务的话，添加到队列的尾部；要取出任务的话，从队列头部去取。

有了队列之后，我们就可以继续改造线程模型了

![](https://static001.geekbang.org/resource/image/2a/ab/2ac6bc0361cb4690c5cc83d8abad22ab.png?wh=1142*692)

1. 添加一个消息队列；
2. IO 线程中产生的新任务添加进消息队列尾部；
3. 渲染主线程会循环地从消息队列头部中读取任务，执行任务。

## 处理其他进程发送过来的任务

通过使用消息队列，我们实现了线程之间的消息通信。

在 Chrome 中，跨进程之间的任务也是频繁发生的，那么如何处理其他进程发送过来的任务？

渲染进程专门有一个 IO 线程用来接收其他进程传进来的消息，接收到消息之后，会将这些消息组装成任务发送给渲染主线程，


## 消息队列中的任务类型

消息队列中的任务类型有哪些。

输入事件（鼠标滚动、点击、移动）、微任务、文件读写、WebSocket、JavaScript 定时器等等。

除此之外，消息队列中还包含了很多与页面相关的事件，如 JavaScript 执行、解析 DOM、样式计算、布局计算、CSS 动画等。

以上这些事件都是在主线程中执行的，所以在编写 Web 应用时，你还需要衡量这些事件所占用的时长，并想办法解决单个任务占用主线程过久的问题。

### 宏任务
- JavaScript 执行 (同步代码)
  初始脚本执行或宏任务中的同步代码块。
- JavaScript 定时器 (setTimeout, setInterval)
  定时器到期后，其回调函数会被放入宏任务队列。
- 输入事件 (鼠标滚动、点击、移动)
  UI 交互事件回调属于宏任务。
- 网络请求回调 (WebSocket onmessage, fetch/XHR 完成)
  虽然网络 IO 在其他线程，但通知主线程的回调是宏任务。
- 文件读写回调 (FileReader onload)
  文件读取完成后，触发的主线程回调是宏任务。

### 微任务
当前宏任务结束后，会立即清空所有微任务。
- Promise .then/catch
- MutationObserver
- process.nextTick 优先级高于 Promise 的微任务。
- queueMicrotask
  显式添加微任务的标准 API。

### 非任务队列
- UI 渲染 (DOM 解析、样式计算、布局、绘制)
  这些通常在宏任务执行完毕且微任务清空后，由渲染引擎同步执行（下一帧之前）。它们不直接进队列，但占用主线程时间。
- CSS 动画 (帧更新)
  在每帧刷新时触发，不属于 JS 任务队列。
- 当触发了 JavaScript 引擎垃圾回收机制，渲染引擎会将“垃圾回收”任务添加到消息队列中。

执行顺序

执行一个宏任务 -> 执行完所有微任务 -> (可选：渲染/UI 更新) -> 取下一个宏任务。





- 做题
```
console.log('同步代码 1');

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('setTimeout 1 内部微任务');
  });
}, 0);

const promise1 = new Promise((resolve) => {
  console.log('Promise 构造函数');
  resolve();
  console.log('Promise 构造函数内 resolve 后');
});

promise1.then(() => {
  console.log('Promise.then 1');
  setTimeout(() => {
    console.log('Promise.then 1 内部 setTimeout');
  }, 0);
});

async function asyncFn() {
  console.log('async 函数同步部分');
  await Promise.resolve();
  console.log('await 后微任务');
}

asyncFn();

console.log('同步代码 2');

queueMicrotask(() => {
  console.log('queueMicrotask 微任务');
});

// 额外增加 DOM 监听类微任务（前端特有）
const observer = new MutationObserver(() => {
  console.log('MutationObserver 微任务');
});
const div = document.createElement('div');
observer.observe(div, { attributes: true });
div.setAttribute('data-test', '1'); // 触发 MutationObserver
```

Event Loop 核心规则（前端）：
先执行同步代码（属于最外层宏任务 script）；
同步代码执行完后，清空所有微任务队列（按添加顺序执行）；
微任务清空后，执行下一个宏任务；
每个宏任务执行完后，再次清空所有微任务队列，循环往复。
第一步：执行同步代码（最外层 script 宏任务）
逐行执行同步代码，标记异步任务到对应队列：
console.log('同步代码 1') → 输出：同步代码 1；
遇到 setTimeout 1 → 加入宏任务队列（等待执行）；
执行 new Promise 构造函数：
console.log('Promise 构造函数') → 输出：Promise 构造函数；
resolve() → 标记 promise1.then 为微任务（加入微任务队列）；
console.log('Promise 构造函数内 resolve 后') → 输出：Promise 构造函数内 resolve 后；
执行 asyncFn() 函数：
console.log('async 函数同步部分') → 输出：async 函数同步部分；
await Promise.resolve() → await 后代码（console.log('await 后微任务')）加入微任务队列；
console.log('同步代码 2') → 输出：同步代码 2；
queueMicrotask(...) → 回调加入微任务队列；
MutationObserver 监听并修改属性 → 回调加入微任务队列。
同步代码执行完的输出（前 5 个）：
plaintext
同步代码 1
Promise 构造函数
Promise 构造函数内 resolve 后
async 函数同步部分
同步代码 2
此时队列状态：
宏任务队列：setTimeout 1；
微任务队列（按添加顺序）：
Promise.then 1
await 后微任务
queueMicrotask 微任务
MutationObserver 微任务
第二步：清空微任务队列（同步代码执行完后）
按顺序执行所有微任务：
执行 Promise.then 1 → 输出：Promise.then 1；
内部 setTimeout → 加入宏任务队列（此时宏任务队列：setTimeout 1 → Promise.then 1 内部 setTimeout）；
执行 await 后微任务 → 输出：await 后微任务；
执行 queueMicrotask 微任务 → 输出：queueMicrotask 微任务；
执行 MutationObserver 微任务 → 输出：MutationObserver 微任务。
微任务执行完的输出（新增 4 个）：
plaintext
Promise.then 1
await 后微任务
queueMicrotask 微任务
MutationObserver 微任务
第三步：执行下一个宏任务（setTimeout 1）
微任务清空后，取宏任务队列第一个任务执行：
执行 setTimeout 1 → 输出：setTimeout 1；
内部 Promise.resolve().then → 加入微任务队列；
该宏任务执行完，立即清空微任务队列：
执行 setTimeout 1 内部微任务 → 输出：setTimeout 1 内部微任务。
此步骤输出（新增 2 个）：
plaintext
setTimeout 1
setTimeout 1 内部微任务
第四步：执行最后一个宏任务（Promise.then 1 内部 setTimeout）
前一个宏任务的微任务清空后，取宏任务队列下一个任务：
执行 Promise.then 1 内部 setTimeout → 输出：Promise.then 1 内部 setTimeout；
无内部微任务，执行完毕。
此步骤输出（最后 1 个）：
plaintext
Promise.then 1 内部 setTimeout

```
同步代码 1
Promise 构造函数
Promise 构造函数内 resolve 后
async 函数同步部分
同步代码 2
Promise.then 1
await 后微任务
queueMicrotask 微任务
MutationObserver 微任务
setTimeout 1
setTimeout 1 内部微任务
Promise.then 1 内部 setTimeout
```

### 例子二 process.nextTick

console.log('1. 开始 (宏任务)');

// 1. 注册一个微任务 (Promise)
Promise.resolve().then(() => {
  console.log('3. Promise.then (微任务)');
});

// 2. 注册一个 nextTick 任务
process.nextTick(() => {
  console.log('2. process.nextTick (更高优先级的微任务)');
});

console.log('4. 结束 (宏任务)');

