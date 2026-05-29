https://juejin.cn/book/7294082310658326565/section/7295617117938778149

- useState 响应式
  { a: 1 } 这种叫做数据
  从一种数据变成另一种数据，这种就是状态（state）了。
  **状态是变化的数据。** App2.jsx
  组件的核心就是状态。
  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/919e3c8f17374ae89d2c543d4228167a~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=826&h=498&s=23145&e=png&b=ffffff)

  - 如果初始状态需要经过复杂计算得到，可以传个函数来计算初始值：
    App3.jsx 
    同步， 不支持异步
  - useState 返回一个数组，包含 state 和 setXxx 的 api，一般我们都是用解构语法取。
    - 可以直接传新的值，或者传一个函数，返回新的值，这个函数的参数是上一次的 state。

- 初次渲染的时候请求数据然后 setState 呢 useEffect 了
  - effect 被翻译为副作用
    之前的函数组件是纯函数，传入 props，返回对应的结果，再次调用，传入 props，依然返回同样的结果。
    但现在有了 effect 之后，每次执行函数，额外执行了一些逻辑，这些逻辑不就是副作用么？ 
    
    想用 async await 语法需要单独写一个函数，因为 useEffect 参数的那个函数不支持 async。

  - 想用 async await 语法需要单独写一个函数，因为 useEffect 参数的那个函数不支持 async。
  - 第二个参数为什么传空数组呢？ 这个数组叫做依赖数组
    react 是根据它有没有变来决定是否执行 effect 函数的，如果没传则每次都执行(第二个参数为空)。
    空数组， 不依赖于任何， 挂载时执行一次。 
    组件会渲染两次， 但是 useEffect 只执行一次 

    不传 deps 数组的时候也是每次都会重新执行 effect 函数：

    当 deps 数组变了，重新执行 effect 之前，会先执行清理函数，打印了 clean up。

    ，组件销毁时也会调用 cleanup 函数来进行清理。

