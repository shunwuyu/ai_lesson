# setTimeout是如何实现的？

- 浏览器页面是由消息队列和事件循环系统来驱动的。
- setTimeout 事件循环的应用
    它就是一个定时器，用来指定某个函数在多少毫秒之后执行。
    它会返回一个整数，表示定时器的编号，同时你还可以通过该编号来取消这个定时器。

    ```
    function showName(){
        console.log("极客时间")
    }
    var timerID = setTimeout(showName,200);
    ```
- 浏览器怎么实现 setTimeout？

我们知道渲染进程中所有运行在主线程上的任务都需要先添加到消息队列，然后事件循环系统再按照顺序执行消息队列中的任务。

典型事件

- 当接收到 HTML 文档数据，渲染引擎就会将“解析 DOM”事件添加到消息队列中，
- 当用户改变了 Web 页面的窗口大小，渲染引擎就会将“重新布局”的事件添加到消息队列中。
- 当触发了 JavaScript 引擎垃圾回收机制，渲染引擎会将“垃圾回收”任务添加到消息队列中。
    垃圾回收（GC）是 JavaScript 引擎独立执行的后台任务，不由消息队列调度，会在事件循环的空闲阶段自动触发，既不占用宏任务队列，也不占用微任务队列，不会和普通任务争抢执行时机。
    垃圾回收在事件循环空闲阶段执行，晚于微任务队列清空，早于下一轮宏任务。
- 同样，如果要执行一段异步 JavaScript 代码，也是需要将执行任务添加到消息队列中。

- 准时悖论

所以说要执行一段异步任务，需要先将任务添加到消息队列中。不过通过定时器设置回调函数有点特别，它们需要在指定的时间间隔内被调用，但消息队列中的任务是按照顺序执行的，所以为了保证回调函数能在指定时间内执行，你不能将定时器的回调函数直接添加到消息队列中。

- 如何准时？
在 Chrome 中除了正常使用的消息队列之外，还有另外一个消息队列，这个队列中维护了需要延迟执行的任务列表，包括了定时器和 Chromium 内部一些需要延迟执行的任务。
所以当通过 JavaScript 创建一个定时器时，渲染进程会将该定时器的回调任务添加到延迟队列中。

普通的宏任务队列

DOM 事件回调（click、resize、scroll、keydown 等）
网络请求回调（fetch/XHR 的 success/error 回调）
script 标签内的整体同步代码
页面加载相关事件（load、DOMContentLoaded）

- setTimeout 本质

当通过 JavaScript 调用 setTimeout 设置回调函数的时候，渲染进程将会创建一个回调任务，包含了回调函数 showName、当前发起时间、延迟执行时间：

创建好回调任务之后，再将该任务添加到延迟执行队列中；

消息循环系统是怎么触发延迟队列的？

事件循环每轮会检查延迟队列是否到期，到期则取出执行。

addEventListener 注册的事件回调进入普通宏任务队列，并非定义时入队，而是事件触发（如 click）时才添加到队列中等待执行。

- 取消
    通过 ID 查找到对应的任务，然后再将其从队列中删除掉就可以了

## 使用 setTimeout 的一些注意事项

如果当前任务执行时间过久，会影响定时器任务的执行

```
function bar() {
    console.log('bar')
}
function foo() {
    setTimeout(bar, 0);
    for (let i = 0; i < 5000; i++) {
        let i = 5+8+8+8
        console.log(i)
    }
}
foo()
```

在执行 foo 函数的时候使用 setTimeout 设置了一个 0 延时的回调任务，设置好回调任务后，foo 函数会继续执行 5000 次 for 循环。

由于当前这段代码要执行 5000 次的 for 循环，所以当前这个任务的执行时间会比较久一点。这势必会影响到下个任务的执行时间。

1.html 看performance 面板

![](https://static001.geekbang.org/resource/image/1a/4f/1adf4da8ca4315cfb565e798649bd74f.png?wh=1142*497)

执行 foo 函数所消耗的时长是 500 毫秒，这也就意味着通过 setTimeout 设置的任务会被推迟到 500 毫秒以后再去执行，而设置 setTimeout 的回调延迟时间是 0。

setTimeout 并不能准时发生

- 2. 如果 setTimeout 存在嵌套调用，那么系统会设置最短时间间隔为 4 毫秒
```
function cb() { setTimeout(cb, 0); }
setTimeout(cb, 0);
```
2.html

![](https://static001.geekbang.org/resource/image/cb/cd/cbb3b2b1ac8eb4752a585df5445412cd.png?wh=1084*398)

- 3. 未激活的页面，setTimeout 执行最小间隔是 1000 毫秒
为了优化后台页面的加载损耗以及降低耗电量。

- 延时执行时间有最大值

那就是 Chrome、Safari、Firefox 都是以 32 个 bit 来存储延时值的，32bit 最大只能存放的数字是 2147483647 毫秒，这就意味着，如果 setTimeout 设置的延迟值大于 2147483647 毫秒（大约 24.8 天）时就会溢出，那么相当于延时值被设置为 0 了，

3.html

- 使用 setTimeout 设置的回调函数中的 this 不符合直觉
- this 丢失问题
    ```
    var name= 1;
var MyObj = {
  name: 2,
  showName: function(){
    console.log(this.name);
  }
}
setTimeout(MyObj.showName,1000)
    ```

    虽然 showName 定义在 MyObj 里，但传给 setTimeout 后，它变成了一个普通的独立函数。

    ```
    //箭头函数
setTimeout(() => {
    MyObj.showName()
}, 1000);
//或者function函数
setTimeout(function() {
  MyObj.showName();
}, 1000)
    ```
第二种是使用 bind 方法，将 showName 绑定在 MyObj 上面

setTimeout(MyObj.showName.bind(MyObj), 1000)


总结好了，今天我们就介绍到这里，下面我来总结下今天的内容。首先，为了支持定时器的实现，浏览器增加了延时队列。其次，由于消息队列排队和一些系统级别的限制，通过 setTimeout 设置的回调任务并非总是可以实时地被执行，这样就不能满足一些实时性要求较高的需求了。最后，在定时器中使用过程中，还存在一些陷阱，需要你多加注意。