![](https://juejin.cn/book/7294082310658326565/section/7295617117938778149#heading-6)


forwardRef 是 React 中用于穿透组件封装的高阶能力，它允许父组件通过 ref 直接访问子组件内部的 DOM 节点或类实例，突破默认无法透传 ref 的限制。

useImperativeHandle 是 React 的“精准暴露术”——配合 forwardRef，它让你在子组件中有选择地定制暴露给父组件的 ref 方法或属性，而非直接暴露整个 DOM。