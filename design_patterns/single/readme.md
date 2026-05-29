[](https://juejin.cn/book/6844733790204461070/section/6844733790267375630)

- 何为单例
单例是一种设计模式，确保一个类只有一个实例，并提供全局访问点。
它避免资源浪费，常用于全局状态管理，模态框啥的。

- 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
