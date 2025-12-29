# useLayoutEffect 

如果用 useEffect 改 DOM，页面可能先闪一下旧内容，再跳到新内容；useLayoutEffect是 React 提供的“DOM 布局钩子”， 能在浏览器画出来之前就改好，避免这种“闪屏”问题。

- useLayoutEffect 在浏览器“绘制之前”同步执行副作用，适合读取 / 修改 DOM 布局

useLayoutEffect 的正确位置（关键理解）

render
  ↓
DOM 更新
  ↓
useLayoutEffect（同步）
  ↓
浏览器 paint
  ↓
useEffect（异步）

- 什么时候必须用 useLayoutEffect？
  读取 DOM 尺寸（width / height）
  计算元素位置
  需要避免 UI 闪动
  手写动画首帧

- 什么时候千万别用？
  数据请求
  