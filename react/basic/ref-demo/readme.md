[source](https://juejin.cn/book/7294082310658326565/section/7295617117938778149#heading-5)

- useRef
useRef是React中的一个钩子函数，它允许你持久化地**存储**一个可变的值或访问**DOM节点**，且不会触发组件**重新渲染**。

- 称useRef为“响应式对象”不太准确
  useRef提供对DOM节点或值的引用，但不会因值的变化而触发组件重新渲染，不具备响应式特性。

- demo1