# useLayoutEffect 

- bad-demo
  页面第一次渲染：盒子在 左上角
  浏览器已经绘制完成
  useEffect 执行，盒子 突然跳到中间
  用户肉眼可见的“闪一下”

  为什么呢？
  useEffect 在浏览器绘制之后执行，DOM 位置被二次修改，因此会产生页面闪动问题。

## useLayoutEffect
  useLayoutEffect 是在 DOM 更新完成后、浏览器绘制之前同步执行的 Hook。
  适合的业务场景
  - 需要立即读取 DOM 尺寸
    offsetWidth / offsetHeight
    getBoundingClientRect
    根据真实高度决定布局

  - 需要计算并设置元素位置

  - 动画的初始状态设置

  注意的地方：
  
  由于它会阻塞浏览器渲染，性能成本较高，因此能用 useEffect 的地方不应使用 useLayoutEffect。
  
  它适合需要立即读取或修改 DOM 的场景，比如获取元素尺寸、计算位置、设置动画初始状态，能避免页面闪动。由于它会阻塞浏览器渲染，性能成本较高，因此能用 useEffect 的地方不应使用 useLayoutEffect。



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
  