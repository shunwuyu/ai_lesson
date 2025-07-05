# useState
- 何为hook?
    是让函数组件能够使用状态和其他 React 特性的特殊函数，比如 useState 管理状态，useEffect 处理副作用。

- 简单介绍一下 React 中的 useState 是做什么的吗
    useState 是 React 的一个 Hook，用来在函数组件中添加“状态”。
    它会返回一个数组，第一个是当前状态值，第二个是更新状态的函数。
    ```js
    const [count, setCount] = useState(0);
    ```

- 那这个 setCount 是立即更新状态的吗？
    不是。setCount 是异步的，React 会在 下一次渲染之前 批量处理所有 setState/setXXX 更新。状态的更新不会立即反映在当前的渲染中。
    demo1
    连续多次调用 setCount
    -  如果是同步更新：
    每次 setCount 都立即执行并触发重新渲染。
    会导致组件渲染三次，但实际上我们只需要最终值为 count + 3。
    多个状态更新合并为一次渲染，避免频繁的 UI 更新。
    收集过程
    页面更流畅，不会因频繁刷新而卡顿。
    浏览器可以在一次事件循环中完成所有 DOM 更新，避免反复布局和绘制。
    - 异步 & 批量更新
    React 将三个 setCount 收集起来，合并成一次更新。
    最终只触发一次重新渲染。
    上面的例子实际上只会加 1，而不是加 3，因为每次读取的都是初始的 count 值。

    这是因为你在使用函数式更新时没有使用 函数式更新语法（updater function）。
- 正确做法：
    使用函数式更新来确保获取最新值
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    保证每个更新都基于上一个最新的值，即使它们被合并成一次更新。

- useState 异步行为与陷阱 闭包
- 状态合并 vs 替换
- Part 5：懒初始化 & 性能优化
- useState 与非 primitive 值（数组/对象）的常见问题