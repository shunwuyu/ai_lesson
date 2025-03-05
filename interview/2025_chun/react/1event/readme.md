<div onClick={this.handleClick.bind(this)}>点我</div>

React并不是将click事件绑定到了div的真实DOM上，而是在document处监听了所有的事件，当事件发生并且冒泡到document处的时候，React将事件内容封装并交由真正的处理函数运行。这样的方式不仅仅减少了内存的消耗，还能在组件挂载销毁时统一订阅和移除事件。

除此之外，冒泡到document上的事件也不是原生的浏览器事件，而是由react自己实现的合成事件（SyntheticEvent）。因此如果不想要是事件冒泡的话应该调用event.preventDefault()方法，而不是调用event.stopProppagation()方法。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e969caa9fc647cf8985c4c841a01f60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

实现合成事件的目的如下：

合成事件首先抹平了浏览器之间的兼容问题，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象。


<!-- 多个事件共用一个event对象? -->

```
假设有两个事件处理函数 handleClick1 和 handleClick2，当点击事件触发时，React 会从事件池中取出一个事件对象 event，将点击事件的信息填充到 event 中，然后依次传递给 handleClick1 和 handleClick2。在这两个函数执行完毕后，event 对象的属性会被清除，等待下一次事件触发时再次使用。
function handleClick1(event) {
    // 使用 event 对象处理事件
}

function handleClick2(event) {
    // 使用 event 对象处理事件
}

// 在 React 组件中绑定事件
<div onClick={handleClick1} onDoubleClick={handleClick2}>Click me</div>


```

