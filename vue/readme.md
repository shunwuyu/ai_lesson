[source](https://time.geekbang.org/column/article/470089)

- 响应式机制的主要功能就是，可以把普通的 JavaScript 对象封装成为响应式对象，拦截数据的获取和修改操作，实现依赖数据的自动化更新。

- Vue3 的组件之间是通过响应式机制来通知的，响应式机制可以自动收集系统中数据的依赖，并且在修改数据之后自动执行更新，极大提高开发的效率。专注业务，而不用API DOM。

相比于 Vue2 使用的 Object.defineProperty，Vue3 不需要提前递归收集依赖，初始化的速度更快；
Vue2 收集依赖的过程中会产生很多的 Dep 对象，Vue3 可以节省这部分的内存开销；
Vue2 无法监听数组、对象的动态添加、删除，需要通过 $set、$delete，增加学习成本；
Vue2 无法监听 Set、Map，只能处理普通对象。


![](https://static001.geekbang.org/resource/image/7e/9e/7e68a41ef94a39eda9cf211ed479e39e.png?wh=1920x939)

vue -> 前端 + ssr  + uniapp  响应式   组件  虚拟DOM 独立

