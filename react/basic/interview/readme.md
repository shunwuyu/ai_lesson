- 函数组件和类组件有什么本质区别？在什么场景下你会优先选择函数组件？demo1
- React 中 props 是只读的，为什么不能直接修改 props？如果需要改变父组件传下来的值该怎么办？
    在 React 中，props 被设计为只读，这意味着你不能直接修改从父组件传递给子组件的数据。这样做是为了确保数据流的单向性，即数据只能从父组件流向子组件，这有助于保持应用状态的可预测性和易于理解。
    - 保持数据一致性：如果允许子组件随意修改 props，可能会导致父组件和子组件之间的数据不一致。
    - 简化调试：单向数据流使得追踪数据变化更加容易，因为你知道数据只能来自一个方向——从父到子。
    - 优化渲染：React 使用 props 来决定是否需要重新渲染组件。如果 props 可以被随意更改，这将使这种机制变得复杂且不可靠。

    如果需要改变父组件传下来的值该怎么办？
    - 回调函数
    - 使用本地状态（Local State）：如果子组件需要修改 props 并且这个修改不需要反映回父组件，可以在子组件内部使用 useState 创建自己的状态副本。 demo2
    - 提升状态（Lifting State Up）
    当多个组件需要共享和修改相同的状态时，最好将该状态提升到它们最近的共同祖先中去管理。

- 请说明 state 的更新是同步还是异步的？是否可以依赖当前的 state 来更新下一个 state？如何正确做？
    在 React 中，setState 的更新是异步的。React 会为了性能优化，批量处理多个 setState 调用，因此状态不会立即更新。
    -  为什么是异步的？
        提高性能：避免频繁的重复渲染。
        批量更新机制：多个 setState 调用会被合并成一次更新。
        避免不一致的 UI：确保组件在状态完全更新后才重新渲染。
    - 不推荐直接依赖当前 state 更新下一个 state
        setCount(count+1)
    - 使用函数式更新（Function Update）
        setCount((prev) => prev + 1)
    - 是否可依赖当前 state 更新下个状态？ 
    可以，但必须使用函数式更新
- 事件处理与绑定
    - React 中事件处理和原生 DOM 事件处理有何不同？事件绑定背后的原理是什么？
        - 命名约定
        React: 使用小驼峰命名法（camelCase），如 onClick。
        原生 DOM: 使用全小写，如 onclick。
        - 原生 DOM: 使用全小写，通常带有连字符分隔，如 onclick。
        React: 实现了一个名为“事件委托”的技术，通过在顶层文档节点上监听所有事件，并根据 React 的虚拟DOM树来决定如何响应事件。这允许跨浏览器兼容性并简化了事件管理。
        原生 DOM: 直接在触发事件的具体元素上设置事件处理器。
        - 更新机制
        React: 当组件的状态或属性发生变化时，React 可能会重新创建相关的 DOM 节点，但会保留事件处理器，因为它们被绑定到了根节点上，而不是直接附着于具体元素。
        原生 DOM: 如果元素被移除或者替换，原有的事件处理器也会丢失，除非手动重新绑定。
        - 异步执行
        React: 在某些情况下，React 将事件处理函数排队等待执行，以便更好地控制何时以及如何更新用户界面，这有助于优化性能。
        原生 DOM: 事件处理是同步的，一旦触发立即执行。
        - 事件绑定背后的原理
        事件委托：React 利用事件委托模式，在 document 层级添加事件监听器，而不是直接在每个具体的 DOM 元素上添加。这意味着所有的事件首先由 React 的事件系统捕获，然后根据事件的目标和冒泡路径分配给相应的组件处理函数。
        - 合成事件对象：React 提供了一个跨浏览器的合成事件对象（SyntheticEvent），它封装了底层浏览器的原生事件。这个对象的行为类似于原生事件对象，但提供了更好的跨浏览器一致性。

    通过这种方式，React 能够提供一个统一且高效的事件处理系统，使得开发者可以专注于业务逻辑而非底层细节。此外，这种方法还提高了应用的性能，因为它减少了实际附加到 DOM 上的事件处理器数量。

- 如何给一个事件传递额外参数？如何阻止事件冒泡或默认行为？
    demo3

- Hooks 与生命周期
    - useEffect 中的依赖数组起什么作用？依赖项写错或漏写会造成什么问题？
    在 React 的 useEffect 钩子中，依赖数组的作用是告诉 React 当哪些值发生变化时应该重新运行副作用（effect）。依赖数组中的每一项都是一个变量或状态，React 会监视这些变量的变化。当其中任何一个变量的值改变时，useEffect 内的逻辑就会被执行；如果数组为空，则 useEffect 只会在组件挂载和卸载时执行。
    - 依赖数组的作用
        - 精确控制副作用执行时机：通过指定依赖项，你可以精确地控制什么时候需要重新执行副作用逻辑。
        - 优化性能：避免不必要的重复执行，只有在相关数据变化时才触发 effect。
        - 确保一致性：保证使用的是最新的状态或属性值。
    - 依赖项写错或漏写可能造成的问题
        遗漏必要的依赖项：如果你忘记将某个响应式变量（如 props 或 state）添加到依赖数组中，即使该变量发生了变化，你的 useEffect 也不会自动重新运行。这可能导致组件行为不符合预期，因为 effect 中使用的可能是旧的数据。

        包含非必要依赖项：如果包含了实际上不需要监听的变量作为依赖项，可能会导致不必要的重新渲染或执行，影响性能。

        错误地引用了未定义的变量：如果在依赖数组中引用了一个不存在或者拼写错误的变量，会导致代码报错或行为异常。

- useState 是惰性初始化的吗？是否可以传函数给 useState？为什么？
    useState 钩子支持惰性初始化，并且可以传入一个函数给 useState。
    惰性初始化
    useState 支持惰性初始化，这意味着你可以提供一个初始化函数来计算初始状态，而不是直接提供初始状态值。这个特性对于初始状态计算成本较高的场景特别有用，因为它避免了在每次组件渲染时都进行复杂的计算。
    传递初始化函数：如果你传递一个函数给 useState（如 useState(() => computeExpensiveValue())），React 仅在组件首次渲染时调用此函数获取初始状态值，后续渲染不会再次调用此函数。

    ```
    function Counter() {
  // 使用普通值初始化
  const [count, setCount] = useState(0);

  // 使用函数惰性初始化
  const [expensiveState, setExpensiveState] = useState(() => {
    console.log('计算初始状态');
    return computeExpensiveValue();
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

function computeExpensiveValue() {
  // 假设这里有一些耗时的计算
  return '结果';
}
    ```
    可以向 useState 传递一个函数，这允许你延迟初始化直到组件首次渲染时才执行计算。
    这种方法有助于优化性能，特别是在初始化过程涉及复杂计算的情况下。

- 如何理解闭包陷阱（stale closure）？请举一个使用 setInterval 的例子来说明 React 中的闭包问题。
    demo4

- useRef 和 useState 有什么区别？为什么 useRef 修改值不会触发组件重新渲染？
    basic/ref-demo

- 请对比 useEffect 和类组件的 componentDidMount、componentDidUpdate、componentWillUnmount 的对应关系。 demo5
    - useEffect 是函数组件中用于处理副作用的 Hook，而类组件中则通过生命周期方法 componentDidMount、componentDidUpdate 和 componentWillUnmount 来处理类似逻辑。

- 自定义 Hook 是什么？为什么要用自定义 Hook？请描述一个你写过的自定义 Hook 的使用场景。
    自定义 Hook 是开发者自己封装的、以 use 开头的函数，可以包含状态（如 useState）、副作用（如 useEffect）和其他 Hook，用于逻辑复用。
    useFetch 改成url
    https://github.com/shunwuyu/ai_lesson/blob/ba65c01b1b36e333f8844d3c81b8826dac260baa/react/basic/callback-demo/src/hooks/useFetch.js#L4
    App上调用 一下

- 父子组件、兄弟组件、跨层级组件之间分别如何通信？你会如何选择不同的通信方式？
    - 父子组件 props
    - 子父  props 回调函数
    - 兄弟组件 通过父组件（状态提升）
    - 跨层级组件 Context API + useReducer 
        redux zustand

    选择哪种通信方式主要取决于组件之间的关系以及需要共享的数据的性质和范围。对于简单的父子组件通信，直接使用props就足够了；而对于复杂的或者跨层级的通信，则可能更适合使用Context API或状态管理库。
    大型应用开发，一般会使用redux等库， 将应用开发分成UI 组件+状态管理。

- useContext 的原理是什么？它会导致哪些性能问题？如何优化？
    - React.createContext 创建上下文对象，通过 Provider 传值，子组件使用 useContext(Context) 直接读取最近的 Provider 提供的值，实现跨层级共享，无需手动传 props。
    - 当 Context 的值发生变化时，所有使用了 useContext 订阅该 Context 的组件都会重新渲染。如果 Context 提供的数据是一个对象或数组等引用类型，即使实际内容没有改变，但由于引用地址的变化，也会导致子组件认为数据已更新并触发不必要的重渲染。
    - 分割 Context  useMemo 
    如果 Context 包含大量不同的数据，考虑将其拆分为多个更小、更专注的 Contexts。这样可以确保只有依赖特定部分数据的组件才会重新渲染。
        redux

- React 中何时需要使用状态管理工具（如 Redux、Zustand、Recoil 等）而不是只用本地状态？
    redux

- React 中的虚拟 DOM 是什么？它和真实 DOM 有什么区别？它如何帮助性能优化？
- 什么是组件的“重新渲染”？在什么情况下组件会重新渲染？如何避免不必要的渲染？
- 请解释 React.memo、useMemo 和 useCallback 的异同，它们分别适用于什么场景？






