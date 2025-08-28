- Rendered fewer hooks than expected.
    React 内部为每个函数组件维护一个 Hook 链表（或数组）。这个链表的索引顺序对应着你在代码中调用 Hook 的顺序。

    首次渲染 (mount)：
        React 执行你的组件函数。
        遇到 useState(0) → 在链表索引 0 处创建一个 Hook 节点，存储 a 的状态。
        遇到 Math.random() → 计算 show。
        如果 show === true
            遇到 useState(1) → 在链表索引 1 处创建节点，存储 b 的状态。
            遇到 useState(2) → 在链表索引 2 处创建节点，存储 c 的状态
        如果 show === false：
            跳过 useState(1)。
            遇到 useState(2) → 在链表索引 1 处创建节点，存储 c 的状态。

    链表状态：
    show=true 时：[Hook0: a=0, Hook1: b=1, Hook2: c=2]
    show=false 时：[Hook0: a=0, Hook1: c=2] （b 缺失）
    
    后续渲染 (update)：

        React 再次执行组件函数。
        关键：React 不知道你的 if 条件逻辑！它只按顺序调用链表中的 Hook
        它期望每次渲染都按完全相同的顺序调用相同数量的 Hook。

        当 show 值变化时：
            期望：调用 3 次 useState。
            实际：可能只调用 2 次（当 show=false）。
    
    问题发生：
    假设上一帧 show=true，链表是 [a=0, b=1, c=2]。
    本帧 show=false，代码只执行了：
        useState() → React 从链表 Hook0 读取，得到 a=0 ✅
        if (show) 不成立，跳过。
        useState() → React 从链表 Hook1 读取，但 Hook1 存的是上一帧的 b=1！
        结果：c 的初始值错误地变成了 1（上一帧 b 的值），而 b 的状态 1 被“回收”给了 c。
        setC(c + 1) 实际上是在修改 Hook1 的状态，而这个状态在上一帧属于 b


在开发模式下，React 会进行严格检查：

计数检查：React 会记录本次渲染调用了多少次 Hook。
对比检查：将本次调用次数与上一次渲染的调用次数进行对比。
报错：如果本次调用的 Hook 数量 少于 上一次（Rendered fewer hooks than expected），或者 多于 上一次，React 会立即抛出错误，防止状态严重错乱。

正确的做法（遵守规则）
不要在条件、循环、嵌套函数中调用 Hook。
始终在组件的顶层作用域调用 Hook。
确保每次渲染的 Hook 调用顺序和数量完全一致。


因为函数组件每次渲染都重新执行，没有实例存储状态。React靠调用顺序记账，链表按位置存每个useState的状态，确保每次取到的是同一个数据。