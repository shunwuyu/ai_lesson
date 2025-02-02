- useLayoutEffect
  绝大多数情况下，你把 useEffect 换成 useLayoutEffect 也一样：
  js 执行和渲染是阻塞的 ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c88835aa7434d15ae1b60d77aff4215~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1482&h=192&s=17185&e=png&b=ffffff)
  - useEffect 的 effect 函数会在操作 dom 之后异步执行：
  - 渲染的间隔是固定的，而 js 的任务在这些渲染的间隔中执行。
  - 这样就导致有的时候页面会出现闪动，因为第一次渲染的时候的 state 是之前的值，渲染完之后执行 effect 改了 state，再次渲染就是新的值了。
  - 不想闪动那一下，就用 useLayoutEffect，它会在操作 dom 之前同步执行。
  - 超过 50ms 的任务就被称作长任务，会阻塞渲染，导致掉帧：
  - useEffect 和 useLayoutEffect 的主要区别在于执行时机：useEffect 在浏览器渲染完成后执行，不会阻塞页面绘制；而 useLayoutEffect 则在所有 DOM 变更之后、浏览器绘制之前同步执行，会阻塞页面绘制，适用于需要在视觉上同步更新 DOM 的场景。


- useReducer
  - 前面用的 setState 都是直接修改值，那如果在修改值之前需要执行一些固定的逻辑呢?
  - useReducer 的类型参数传入 Reducer<数据的类型，action 的类型>
  - 第一个参数是 reducer，第二个参数是初始数据。
  - 用 useState 比 useReducer 简洁多了 这个例子不复杂，没必要用 useReducer
  - 用 useState 需要在每个地方都写一遍这个逻辑，而用 useReducer 则是把它封装到 reducer 里，通过 action 触发就好了。