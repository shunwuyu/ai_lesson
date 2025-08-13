# 虚拟DOM

- **虚拟 DOM（VDOM）**就是在内存中用 JS 对象表示 DOM 树，React 对比（diff）旧树和新树，算出最小变更集后再去操作真实 DOM，从而减少昂贵的 DOM 操作并让 UI 更新更可控。

- demo1
     为什么需要 VDOM？
    想象你要更新页面：

    旧 VDOM：记录页面“之前”长什么样
    新 VDOM：记录页面“之后”想变成什么样
    React 比较两者（diff 算法）
    找出最小变化，只更新真实 DOM 中需要改的部分
    ✅ 好处：避免频繁操作慢速的“真实 DOM”，提升性能！

- 为什么需要 VDOM？
    减少 DOM 操作开销：直接修改真实 DOM 很慢，VDOM 先在内存计算差异，再批量/最小化更新。 
    diff 算法
    声明式编程：组件只描述 UI 应该是什么（render），不用关注如何逐步操作 DOM
    demo2

    跨平台抽象：可以在浏览器、原生（React Native）、测试环境等不同宿主上复用渲染逻辑。
    支持增量/并发渲染（Fiber 架构）：可以把渲染拆成小任务，响应优先级更灵活。
    to be continue


- 工作流程
    render -> VDOM：组件 render（或函数组件返回 JSX），生成新 VDOM（JS 对象树）。
    Diff（reconciliation）：React 比较上一次 VDOM（old）与本次（new），生成 patch（增删改）。
    Patch -> DOM：把最小必要的更改应用到真实 DOM（更新属性、插入/删除节点等）。
    Commit 阶段：执行副作用（生命周期/钩子）和 DOM 更新后清理。
（React Fiber 把 render 阶段切分为可中断的任务以支持并发。）

- React reconciliation 的关键规则（面试常问） 对账 新旧状态
    - 如果元素类型不同（<div> → <span> 或 不同组件类），React 会卸载旧节点并创建新节点（替换）。
    - 如果元素类型相同，React 会保留该 DOM 实例，更新其属性，然后递归比较子节点。
    - 列表的 key：React 用 key 来判断同层子节点的“身份”。有稳定 key 时可以 O(n) 更精确地复用节点；没有 key 或 key 不稳定，会导致错误或低效更新。
    - 组件实例的复用：相同类型的组件会复用实例（保留 state）；不同类型会卸载重建。 

- 必背面试点
    - 为什么不用直接操作 DOM？：真实 DOM 操作代价高、异构平台难以统一、 imperative（命令式） 难维护。
    - key 的作用？：标识同层元素的身份，避免不必要的删除/重建，保证 state/DOM 节点正确复用。
    - index 作为 key 有什么问题？：当列表发生插入/删除/重排序时 index 会变，导致节点错配、输入丢失或状态错乱。
    - 如何避免子组件不必要的重渲染？：React.memo  / useMemo / useCallback。记住 memo 做的是浅比较。
    demo3 浅比较

- hand_code 