https://time.geekbang.org/column/article/113513

- 打开![](https://static001.geekbang.org/resource/image/ce/9e/ce7f8cfe212bec0f53360422e3b03a9e.png?wh=1142*685) 看到了什么？

- 为什么所有的分析都是基于 Chrome 浏览器的?
  - 主流
  - Chrome、微软的 Edge 以及国内的大部分主流浏览器，都是基于 Chromium 二次开发而来
    内核一致， 表现一致， 比如手机端

    safari  基于webkit 内核
    chromium 是一个开源浏览器项目， 基于webkit 内核， 2013年后，分叉 blink 

- Chrome 打开一个页面需要启动多少进程
  右上角-》更多工具-》任务管理器
  ![](https://static001.geekbang.org/resource/image/ce/9e/ce7f8cfe212bec0f53360422e3b03a9e.png?wh=1142*685)

  - 打开一个页面， 为何启动如此多进程？

  - 请分析一下任务的执行
  ```
  A = 1+2
  B = 20/5
  C = 7*8
  console.log(A, B, C)
  ```
  从上到下？ 单线层

  - 什么是并行？
    计算机中的并行处理就是同一时刻处理多个任务，
    要计算下面这三个表达式的值，并显示出结果?
  
  单线程 分四步处理 简单，慢

  多线程  并行处理， 同时处理多个任务
  第一步，使用三个线程同时执行前三个任务；第二步，再执行第四个显示任务。

  你会发现用单线程执行需要四步，而使用多线程只需要两步。因此，使用并行处理能大大提升性能。复杂， 但快

- 进程 VS 线程

  线程是不能单独存在的，它是由进程来启动和管理的。

  一个进程就是一个程序的运行实例。

  启动一个程序的时候，操作系统会为该程序创建一块内存，用来存放代码、运行中的数据和一个执行任务的主线程，我们把这样的一个运行环境叫进程。

  进程是分配资源的最小单元。

  - 线程是程序执行的最小单元。
    线程是依附于进程的，而进程中使用多线程并行处理能提升运算效率。

  - 图例
  ![](https://static001.geekbang.org/resource/image/33/da/3380f0a16c323deda5d3a300804b95da.png?wh=1142*575)

  
  - 进程和线程之间的关系有以下 4 个特点。

    - 进程中的任意一线程执行出错，都会导致整个进程的崩溃。
    ```
    A = 1+2
    B = 20/0
    C = 7*8
    ```
    由于分母为 0，线程会执行出错，这样就会导致整个进程的崩溃，当然另外两个线程执行的结果也没有了。

    - 线程之间共享进程中的数据。
      线程之间可以对进程的公共数据进行读写操作。
      ![](https://static001.geekbang.org/resource/image/d0/9e/d0efacd7f299ed99e776cb97da2a799e.png?wh=1142*789)

    - 当一个进程关闭之后，操作系统会回收进程所占用的内存。

    - 进程之间的内容相互隔离。

      正是因为进程之间的数据是严格隔离的，所以一个进程如果崩溃了，或者挂起了，是不会影响到其他进程的。如果进程之间需要进行数据的通信，这时候，就需要使用用于进程间通信（IPC）的机制了。

    
- 单进程浏览器时代
  单进程浏览器是指浏览器的所有功能模块都是运行在同一个进程里，
  - 会包含哪些功能？
    网络、插件、JavaScript 运行环境、渲染引擎和页面等
    ![](https://static001.geekbang.org/resource/image/6d/ca/6ddad2419b049b0eb2a8036f3dfff1ca.png?wh=1142*469)

  - 会有哪些问题？
    - 不稳定
    早期浏览器需要借助于插件来实现诸如 Web 视频、Web 游戏等各种强大的功能，但是插件是最容易出问题的模块，并且还运行在浏览器进程之中，所以一个插件的意外崩溃会引起整个浏览器的崩溃。比如flash 
    和插件一样，渲染引擎的崩溃也会导致整个浏览器的崩溃。 渲染出了问题
    - 不流畅
      ```js
      function freeze() {
  while (1) {
    console.log("freeze");
  }
}
freeze();
      ```
      因为这个脚本是无限循环的，所以当其执行时，它会独占整个线程，这样导致其他运行在该线程中的模块就没有机会被执行
      带来了卡顿，  JS event loop.

    - 不安全
      插件 恶意攻击电脑， 独立进程， 限制


- 多进程浏览器

  Chrome进程图
  ![](https://static001.geekbang.org/resource/image/cd/60/cdc9215e6c6377fc965b7fac8c3ec960.png?wh=1142*725)

  - IPC 全称是？
    Inter-Process Communication


  - 解决了哪些问题：

    - 解决不稳定的问题
      由于进程是相互隔离的，所以当一个页面或者插件崩溃时，影响到的仅仅是当前的页面进程或者插件进程，并不会影响到浏览器和其他页面。
    - 不流畅的问题
      同样，JavaScript 也是运行在渲染进程中的，所以即使 JavaScript 阻塞了渲染进程，影响到的也只是当前的渲染页面，而并不会影响浏览器和其他页面，因为其他页面的脚本是运行在它们自己的渲染进程中的

      对于内存泄漏的解决方法那就更简单了，因为当关闭一个页面时，整个渲染进程也会被关闭，之后该进程所占用的内存都会被系统回收，这样就轻松解决了浏览器页面的内存泄漏问题。
    - 安全问题
      安全沙箱 沙箱看成是操作系统给进程上了一把锁，

      沙箱里面的程序可以运行，但是不能在你的硬盘上写入任何数据，也不能在敏感位置读取任何数据，例如你的文档和桌面。Chrome 把插件进程和渲染进程锁在沙箱里面，这样即使在渲染进程或者插件进程里面执行了恶意程序，恶意程序也无法突破沙箱去获取系统权限。
    

- chrome 最新多进程架构

  ![](https://static001.geekbang.org/resource/image/b6/fc/b61cab529fa31301bde290813b4587fc.png?wh=1142*494)

- 解释这些进程
  - 浏览器主进程
    主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。

  - 渲染进程
  核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
  
  - GPU 进程

  GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。

  - 网络进程
  要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。


  - 插件进程。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

- 为何打开一个页面， 至少有4个进程？
  因为打开 1 个页面至少需要 1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程，共 4 个；如果打开的页面有运行插件的话，还需要再加上 1 个插件进程。

- 缺点是？

  多进程模型提升了浏览器的稳定性、流畅性和安全性，但同样不可避免地带来了一些问题：

  - 高的资源占用。因为每个进程都会包含公共基础结构的副本（如 JavaScript 运行环境），这就意味着浏览器会消耗更多的内存资源。
  - 更复杂的体系架构。浏览器各模块之间耦合性高、扩展性差等问题，会导致现在的架构已经很难适应新的需求了。

  - 服务
  
