# react portals

React Portals 是 ReactDOM 提供的一个功能，允许你将子组件渲染到父组件 DOM 层次结构之外的 DOM 节点中。这在创建模态框、弹出窗口等需要"逃离"父组件 CSS 限制的场景中特别有用。

Vue中类似React Portal的是Teleport组件

- 子组件是一个portal， 发生点击事件能冒泡到父组件吗？
不能。React Portal 虽然将子组件渲染到 DOM 树的不同位置，但事件冒泡遵循实际 DOM 结构而非 React 组件层次结构。Portal 内部的事件会冒泡到 Portal 所在的 DOM 容器，而不是 React 父组件。