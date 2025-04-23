
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                ? child
                : createTextElement(child)
            ),
        },
    }
}
    
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
        nodeValue: text,
        children: [],
        },
    }
}

function render(element, container) {
    // TODO create dom nodes
    const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)

    // const dom = document.createElement(element.type)
    const isProperty = key => key !== "children"
    
    Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

    element.props.children.forEach(child =>
        render(child, dom)
    )
    container.appendChild(dom)
}


const Didact = {
    createElement,
    render,
}


    
const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
)
// 这段代码实现了 React Fiber 架构中的工作循环机制，用于实现可中断的渲染。
let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  // 当有工作单元且不需要让出执行权时循环执行
  while (nextUnitOfWork && !shouldYield) {
    // 执行当前工作单元并获取下一个工作单元
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    // 检查剩余时间是否不足 1ms，如果是则需要让出执行权
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
// 初始启动工作循环
requestIdleCallback(workLoop)
// 处理单个工作单元的函数（尚未实现）
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

const container = document.getElementById("root")
Didact.render(element, container)