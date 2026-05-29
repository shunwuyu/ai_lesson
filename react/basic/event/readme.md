# React 事件

## React 事件 vs 原生 DOM 事件

- 原生事件：
  DOM0 级事件处理方式
  <button onclick="alert('clicked')">Click me</button>
  DOM2 级事件处理方式
  document.getElementById('btn').addEventListener('click', () => {
  alert('clicked');
  });

不存在DOM1级事件模型， DOM1级标准专注文档操作，

function App() {
  const handleClick = () => {
    alert('React clicked');
  };

  return <button onClick={handleClick}>Click Me</button>;
}

- React 事件是 小驼峰命名法（onClick），原生是全小写（onclick）
- React 不使用字符串绑定函数，而是直接传函数引用
- React 的事件绑定不是直接加到 DOM 元素上，而是通过事件委托实现
  #root 挂载点

## 事件委托

  **事件委托**就是利用事件冒泡机制，在父元素上统一处理子元素的事件，以提升性能并支持动态内容。

  性能优化：如果 <li> 很多或者是动态添加的，逐个绑定事件效率低。
  动态内容支持：即使后面新增 <li>，也能自动支持点击事件（因为事件绑定在父级）。
  内存友好：减少监听器数量，降低内存消耗。

## 事件对象 & 合成事件
SyntheticEvent
React 中的事件并不是原生 DOM 事件，而是封装了一层的 SyntheticEvent，它有统一的跨浏览器 API。 demo1

为什么要用 SyntheticEvent？
为了统一浏览器兼容性、减少内存占用、提高性能。

- 阻止冒泡 2.html

- 事件解绑

问题	解答简要
React 中事件和原生事件有什么区别？	React 使用 SyntheticEvent，统一跨浏览器行为，并做事件委托。
为什么需要事件池？	提高性能，减少频繁创建事件对象的开销。
如何阻止事件冒泡？	使用 e.stopPropagation()  e
事件对象为何会为 null？	因为被事件池回收了。使用 e.persist() 保留。
如何绑定/解绑全局事件？	在 useEffect 中添加和清除监听器。
React 事件绑定在哪里？	React 统一绑定在根元素上，如 document 或 container。

## 事件池机制（Event Pooling）
react 降低版本.....
React 的事件系统中的一个性能优化策略

React 中的事件对象是 SyntheticEvent，它并不是原生 DOM 事件，而是 React 自己封装的。

React 会复用 SyntheticEvent 实例 —— 每次事件触发后，不是销毁事件对象，而是清空它的属性，下次复用这个对象。

假设你公司有 1 个“公用报表模板”（SyntheticEvent 对象），你今天打印日报时套用这张模板，填上今天的数据（原生事件的数据），打印完成后把模板清空，方便下一个同事明天继续使用这张模板。

所以说是“复用模板”，而不是所有人同时共用一个模板内容。

