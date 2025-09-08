// didact.js （开头）
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...(props || {}),
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      )
    }
  };
}
// 为原始文本创建 TEXT_ELEMENT 方便统一处理。
// 统一文本节点能让后面渲染逻辑更简单。
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: String(text),
      children: []
    }
  };
}
