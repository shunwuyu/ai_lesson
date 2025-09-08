[](https://pomb.us/build-your-own-react/)

- Step I: The createElement Function
- Step II: The render Function 
- Step III: Concurrent Mode 并发模式
- Step IV: Fibers

- Step V: Render and Commit Phases 渲染阶段 提交阶段
- Step VI: Reconciliation 协调
- Step VII: Function Components 函数组件
- Step VIII: Hooks 钩子函数


## Concurrent Mode 并发模式
把一次性深度遍历变成 可中断的工作队列。用 requestIdleCallback（教学用，React 实际使用 scheduler）把渲染分割为一小块一小块做。

- nextUnitOfWork 指向当前待处理的 fiber。
- 使用 workLoop 在空闲时间调用 performUnitOfWork，在单次空闲时间内尽量多做，时间到就 yield。

```js
// 全局变量，指向下一个要处理的单元工作（即一个 Fiber 节点）
let nextUnitOfWork = null;

// 浏览器空闲时调用，用于执行渲染任务的小单元
function workLoop(deadline) {
  let shouldYield = false; // 是否应暂停执行，让出主线程

  // 当还有任务且浏览器时间充足时，持续处理
  while (nextUnitOfWork && !shouldYield) {
    // 执行一个单元的工作，并返回下一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    
    // 如果剩余时间少于 1ms，停止执行，避免阻塞渲染
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 无论是否有剩余任务，都继续注册空闲回调，以便后续继续执行
  requestIdleCallback(workLoop);
}

// 启动 workLoop，浏览器会在空闲时调用它
requestIdleCallback(workLoop);

```


## fiber

Fiber 是一个轻量节点，包含：
    type / props（来自 element）
    dom（对应创建或复用的真实 DOM）
    指针：parent, child, sibling
    用于后续更新的 alternate（指向上一次渲染的 fiber）和 effectTag（标记增删改）
Fiber 
{
  type,          // 节点类型
  props,         // 属性
  stateNode,     // 对应的 DOM 或组件实例

  // 链表指针（实现遍历的关键）
  return,        // 指向父节点
  child,         // 指向第一个子节点
  sibling,       // 指向下一个兄弟节点

  alternate,     // 指向上一次渲染的 fiber（用于 diff）
  effectTag,     // 标记增删改
}

传统虚拟 DOM 是递归树结构：递归调用，一气呵成，不可中断。

而 Fiber 把这个结构改造成可遍历的链表：

Fiber 不是简单的树，而是用 child、sibling、return 指针把树改造成“可遍历的链表”，从而实现非阻塞、可中断的渲染。

这就是为什么说 Fiber 是链表结构 —— 它的本质是一个以链表方式组织的树形工作单元。

VDOM 是“UI描述”，Fiber 是“可执行的任务 + 增量更新的记录器”。Fiber 在 VDOM 基础上增加了链表结构、双缓存（alternate）和副作用标记，实现高性能并发更新。

###  Fiber 查找下一个工作单元（next unit of work）的流程：

Fiber 使用 链表结构 遍历，顺序：
- 有 child → 进入子节点
- 无 child 但有 sibling → 进入兄弟节点
- 无 child 和 sibling → 返回 return，找“叔叔节点”（父节点的兄弟）

看图

假设我们从 root 开始：

从 root 开始：
root 的 child 是 <div>，因此我们进入 <div>。
在 <div> 节点：
<div> 的 child 是 <h1>，因此我们进入 <h1>。
在 <h1> 节点：
<h1> 的 child 是 <p>，因此我们进入 <p>。
在 <p> 节点：
<p> 没有 child，但有 sibling <a>，因此我们进入 <a>。
在 <a> 节点：
<a> 没有 child 和 sibling，因此我们回溯到它的 parent <h1>。
回到 <h1> 节点：
<h1> 已经处理过，并且没有未处理的 child 或 sibling，因此我们继续回溯到 <div>。
回到 <div> 节点：
<div> 有一个未处理的 sibling <h2>，因此我们进入 <h2>。
在 <h2> 节点：
<h2> 没有 child 和 sibling，因此我们回溯到它的 parent <div>。
回到 <div> 节点：
<div> 已经处理完所有 child 和 sibling，因此我们继续回溯到 root。
回到 root 节点：
root 没有其他 child 或 sibling 需要处理，整个树已经遍历完毕。

通过上述步骤，我们可以看到 Fiber 树的遍历是按照深度优先、先子后兄的原则进行的。每个节点都会被访问一次，并且在没有子节点或兄弟节点时会回溯到父节点继续查找。这种遍历方式使得 React 可以高效地进行增量更新和并发渲染。


特性	虚拟 DOM (VDOM) 节点	Fiber 节点
用途	描述 UI 应该是什么样子	既是 UI 描述，也是工作单元
结构	简单树形结构（type, props, children）	链表结构（child, sibling, return）便于遍历
可中断	❌ 整体递归比对，不可中断	✅ 可分片执行，支持暂停/恢复
更新跟踪	每次重新创建，比对差异	保留 alternate 指针，记录上一版本用于 diff
副作用管理	渲染后直接提交	收集 effectTag，在提交阶段统一处理（增删改）
与 DOM 关系	间接对应 DOM	直接持有 stateNode（DOM 或组件实例）
    

```
/**
 * 执行一个工作单元：为当前 fiber 创建 DOM 和子 fiber 链，并返回下一个要处理的 fiber
 * @param {Fiber} fiber - 当前正在处理的 fiber 节点
 * @returns {Fiber|null} - 下一个要处理的 fiber，如果没有则返回 null
 */
function performUnitOfWork(fiber) {
  // STEP 1: 创建当前 fiber 对应的真实 DOM 节点（如果还没有）
  // - fiber.dom 是 fiber 指向真实 DOM 的引用
  // - 只有原生标签（如 div、h1）需要创建 DOM；函数组件或类组件暂不创建
  if (!fiber.dom) {
    fiber.dom = createDomFromFiber(fiber); // 调用 createDom 处理 type 和 props
  }

  // STEP 2: 协调（reconcile）子元素，将子 element 转换为 fiber 子节点链表
  const elements = fiber.props.children; // 当前 fiber 的虚拟 DOM 子节点数组
  let index = 0;
  let prevSibling = null; // 用于连接兄弟 fiber

  while (index < elements.length) {
    const element = elements[index]; // 当前子 element

    // 创建新的 fiber 节点
    const newFiber = {
      type: element.type,           // 节点类型（如 'div', 'span' 或 函数组件）
      props: element.props,         // 属性和 children
      parent: fiber,                // 指向父 fiber，用于回溯
      dom: null,                    // 初始无 DOM，后续创建
      child: null,                  // 初始无子 fiber
      sibling: null,                // 初始无兄弟 fiber
    };

    // 将第一个子 fiber 作为父 fiber 的 child
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      // 其余子 fiber 通过 sibling 指针连接成链表
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber; // 移动到下一个兄弟
    index++;
  }

  // STEP 3: 确定下一个要处理的工作单元（fiber）
  // 遍历顺序：child → sibling → parent.sibling（即深度优先遍历）
  if (fiber.child) {
    // 优先返回第一个子 fiber
    return fiber.child;
  }

  // 如果没有子节点，找兄弟节点
  let next = fiber;
  while (next) {
    if (next.sibling) {
      // 找到兄弟，继续处理
      return next.sibling;
    }
    // 没有兄弟，回溯到父节点，继续找父节点的兄弟（即“叔叔”节点）
    next = next.parent;
  }

  // 回溯到根节点仍无 sibling，说明整个树已遍历完成
  return null;
}

```

## Render 的两阶段：Render（构建/比对） + Commit（把改动应用到 DOM）

React 把渲染分为两阶段：

Render（可中断）—— 构建 fiber 树、决定哪些节点是新增/更新/删除（不会操作 DOM）

Commit（一次性操作 DOM）—— 把 Render 阶段的结果应用到页面（不可中断）

我们在 fiber 上设置 effectTag（"PLACEMENT" | "UPDATE" | "DELETION"）并在 commit 阶段处理。

```js
let wipRoot = null;           // Work in Progress Root（正在构建的 fiber 树根）
let currentRoot = null;       // 当前已渲染到页面上的 fiber 树根（上一次提交的根）
let deletions = [];           // 收集所有需要删除的节点，最后统一提交

function render(element, container) {
  wipRoot = {
    dom: container,                    // 根节点的 dom 是容器（如 #root）
    props: { children: [element] },   // 把要渲染的 element 包装成 children
    alternate: currentRoot            // 指向上一次的 fiber 树，用于 diff
  };
  deletions = [];                     // 清空上次的删除列表
  nextUnitOfWork = wipRoot;           // 启动并发工作循环，从根开始
}

function commitRoot() {
  deletions.forEach(commitWork);      // 先处理所有删除（必须在父节点存在时进行）
  commitWork(wipRoot.child);          // 提交新树的子节点（真正的组件树）
  currentRoot = wipRoot;              // 更新当前已提交的树
  wipRoot = null;                     // 清空工作中的树
}

function commitWork(fiber) {
  if (!fiber) return;

  // 找到离当前 fiber 最近的有 dom 的父节点（跳过函数组件等无 dom 的 fiber）
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  // 根据 effectTag 执行对应操作
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);           // 新增节点
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props); // 更新 props
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);           // 删除节点
  }

  // 递归提交子节点和兄弟节点（深度优先）
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```
