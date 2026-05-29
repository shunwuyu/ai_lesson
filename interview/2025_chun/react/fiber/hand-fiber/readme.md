# react fible机制以及源码 

- 什么是fiber
    React Fiber 是 React 16 引入的重构版协调算法，将更新任务拆成可中断的单元，支持异步渲染、优先级调度和时间切片，解决同步递归阻塞 UI 的问题。

主要考察： 调度、异步渲染、更新过程和源码架构的理解。

- Fiber 是什么？
    - Fiber 是 React 中每个组件对应的一个数据结构（JS 对象），它是工作单元，也是组件的状态节点。
    - Fiber 树替代了原来的递归虚拟 DOM 树，允许在构建过程中暂停、恢复或重做。
    一个JavaScript 对象，代表 React 中每个组件或元素的状态单元，字段包括类型、key、props、状态、effect 等。
    虚拟 DOM 是 React 的描述结构，用于描述 UI 长什么样；
    Fiber 是虚拟 DOM 的执行结构，用于调度和更新 UI。

- 为什么需要 Fiber？
    - 原先的递归 diff 是同步的，不能中断，页面复杂时会卡顿。
    - Fiber 支持可中断渲染、任务分片，配合 requestIdleCallback 或 scheduler，实现流畅的响应式 UI。
- 工作过程简述（双缓冲）
    有两棵 Fiber 树：current（旧） 和 workInProgress（新）
    Render 阶段（可中断）：构建 workInProgress 树，进行 diff 和副作用收集（通过 Fiber）
    Commit 阶段（不可中断）：统一执行 DOM 更新、副作用（生命周期等）
- 调度机制（react-reconciler）
    - React 会根据任务优先级（如用户输入 > 数据加载）调度更新。
    - 使用 scheduler 实现任务队列，分配时间片。
- 有了fiber 还有虚拟DOM 吗？
    有，Fiber 本质上是对虚拟 DOM 的重构，使其支持异步更新和调度，但虚拟 DOM 概念仍保留。
- 调度
    React 调度机制通过优先级（用户输入和动画）调度和时间切片，优化更新过程，确保高优先级任务优先执行，提高用户界面的响应性和流畅性。
    requestidCallback
    requestIdleCallback 是一个浏览器 API，用于在主线程空闲时执行回调函数，优化性能和用户体验。
    ```
    requestIdleCallback((deadline) => {
        while (deadline.timeRemaining() > 0 && tasks.length > 0) {
            // 执行任务
            doSomeWork(tasks.shift());
        }
    });
    ```
- 那么有了fiber 树之后，  但是还回去独立于fiber 树创建吗？ 
    不会，虚拟 DOM 不再单独创建，而是直接通过 JSX 构建 Fiber 树，不再生成独立的 vDOM 树结构。

- todoList
    - <App>
  <TodoList>
    <TodoItem text="Learn Fiber" />
  </TodoList>
</App>

    ```vdom
    {
  type: 'App',
  props: {
    children: {
      type: 'TodoList',
      props: {
        children: {
          type: 'TodoItem',
          props: { text: 'Learn Fiber' }
        }
      }
    }
  }
}

    ```
    ```fiber 
    Fiber(App)
        ├─ child → Fiber(TodoList)
             ├─ child → Fiber(TodoItem)

    {
  type: 'TodoItem',        // 组件类型
  key: null,               // diff key
  child: ...,              // 第一个子 Fiber
  sibling: ...,            // 右兄弟 Fiber
  return: ...,             // 父节点 Fiber
  stateNode: DOM节点/实例, // 对应真实 DOM 或类实例
  pendingProps: ...,       // 新的 props
  memoizedProps: ...,      // 上次渲染的 props
  memoizedState: ...,      // 当前组件的 state
  alternate: ...,          // 指向 current/workInProgress 对应节点
  effectTag: ...,          // 副作用类型（如更新/删除）
  flags: ...,              // 替代 effectTag 的更新标记
  ...
}

    ```