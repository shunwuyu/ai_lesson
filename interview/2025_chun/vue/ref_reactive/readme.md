# 万能的面试题，怎么手写响应式系统

- 带你进入 Vue 框架的内部世界
  Vue 框架的原理
  ![](https://static001.geekbang.org/resource/image/7e/9e/7e68a41ef94a39eda9cf211ed479e39e.png?wh=1920x939)
  通过上图了解到什么？
  Vue3 的组件之间是通过响应式机制来通知的
  响应式机制可以自动收集系统中数据的依赖， 非dom
  并且在修改数据之后自动执行更新，极大提高开发的效率。

- 响应式机制的主要功能
  响应式机制的主要功能就是，可以把普通的 JavaScript 对象封装成为响应式对象，拦截数据的获取和修改操作，实现依赖数据的自动化更新。

  一个最简单的响应式模型，我们可以通过 **reactive** 或者 **ref** 函数，把数据包裹成**响应式对象**，并且通过 **effect** 函数注册**回调函数**，然后在数据修改之后，**响应式地通知effect**去执行回调函数即可。

  独立于平台

- 在 node 环境中使用 Vue 响应  demo1
- effect 内部的函数式如何知道 count 已经变化了呢?
  响应式整体的流程图
  - 在 effect 中获取 counter.num1 和 counter.num2 的时候 
    就会触发 counter 的 get 拦截函数；get 函数，会把当前的 effect 函数注册到一个全局的依赖地图中去。
  - 这样 counter.num1 在修改的时候，就会触发 set 拦截函数，去依赖地图中找到注册的 effect 函数，然后执行
  ![](https://static001.geekbang.org/resource/image/0a/d0/0a3f06629751988996e1f863e0973cd0.jpg?wh=2012x796)

reactiveMap 存对象响应式代理避免重复创建，targetMap 存对象属性与副作用函数依赖关系。