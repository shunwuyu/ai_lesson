- https://time.geekbang.org/column/article/470089
- ![](https://static001.geekbang.org/resource/image/7e/9e/7e68a41ef94a39eda9cf211ed479e39e.png?wh=1920x939)

响应式机制的主要功能就是，可以把普通的 JavaScript 对象封装成为响应式对象，拦截数据的获取和修改操作，实现依赖数据的自动化更新。

一个最简单的响应式模型，我们可以通过 reactive 或者 ref 函数，把数据包裹成响应式对象，并且通过 effect 函数注册回调函数，然后在数据修改之后，响应式地通知 effect 去执行回调函数即可。

![](https://static001.geekbang.org/resource/image/0a/d0/0a3f06629751988996e1f863e0973cd0.jpg?wh=2012x796)