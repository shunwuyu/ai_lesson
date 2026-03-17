# 手写zustand

zustand 算是其中最流行的一个React 状态管理。

![zustand](https://github.com/pmndrs/zustand) 点赞， fork

其实老牌React 状态管理库是Redux 

![redux](https://github.com/reduxjs/redux)

redux 经常被人诟病它的使用繁琐

- zustand 为什么会火起来呢
    - 简单
    - zustand 也有中间件，可以给它额外扩展功能
    内置
    import { persist } from 'zustand/middleware' 
    持久化

- 创建项目
    - zustand-test

- 基本理解
    
    // 用 create 函数创建一个 store，定义 state 和修改 state 的方法。
    const useXxxStore = create((set) => ({
    aaa: '',
    bbb: '',
    updateAaa: (value) => set(() => ({ aaa: value })),
    updateBbb: (value) => set(() => ({ bbb: value })),
    }))

        // 调用 create 返回的函数，取出属性或者方法在组件里用
    const updateAaa = useXxxStore((state) => state.updateAaa)
    // console.log(updateAaa);
    const aaa = useXxxStore((state) => state.aaa)

    function Ccc() {
    // 调用 create 返回的函数，取出属性或者方法在组件里用
    // 体现zustand 全局状态管理的特点 正确、共享、可追踪
    const aaa = useXxxStore((state) => state.aaa)

    useEffect(() => {
    // 订阅发布者模式
    // 订阅 store 的变化，当 store 发生变化时，调用回调函数
    useXxxStore.subscribe((state) => {
      console.log(useXxxStore.getState());
    })
    }, []);

    这就是 zustand 的全部用法了，就这么简单。

    1. Zustand 的核心思想
    2️⃣ React 如何订阅外部状态
    3️⃣ 如何实现一个简单的全局状态管
    
- 为什么需要 Zustand
    React 中组件通信怎么做？
    常见方式：
    - props 传递 层层传递
    - Context
    - Zustand

- Zustand 的核心思想
    - 保存状态
    - 修改状态
    - 订阅状态变化
    核心结构：
    store
    ├── state
    ├── setState
    ├── getState
    └── subscribe

- 实现一个最简单的 Store
- 第二步：加入订阅机制
- 第三步：支持函数更新 state
- 第四步：支持 state 合并
    Zustand 默认是 merge。
    不应该覆盖整个 state。
    state =
    typeof nextState !== "object"
        ? nextState
        : Object.assign({}, state, nextState)
- 第五步：实现 Zustand 的 create API

