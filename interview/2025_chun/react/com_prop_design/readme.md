# 举个复用的组件，会传入什么参数进行使用?

- props 
    在 React 中 props 是单向数据流，父组件控制状态，子组件负责展示，保证了组件的可控性和可预测性。
- children 
    为了增强定制性，组件会接收 children，使得父组件可以灵活插入内容
- 事件
    我会配合 useCallback 对事件处理函数进行缓存，避免因父组件重渲染导致不必要的更新，提升性能。
- ref
    我会通过 forwardRef 和 useImperativeHandle 向父组件暴露这些方法。