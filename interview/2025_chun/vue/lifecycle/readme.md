# 生命周期

- 三个阶段
    - 挂载前后 mount
    - 更新前后 update
    - 卸载前后 unmount

- vue3 composition api 
- onBeforeMount
    - 组件挂载之前（还没插入 DOM）
    - 进行初始化逻辑，比如配置非响应式数据，但此时 DOM 尚未可用。
- onMounted
    - 组件挂载完成，DOM 已可用
    - 常用于访问 DOM、发起请求、初始化第三方库（如图表、Swiper 等）
- onBeforeUpdate
    - 响应式数据变更，组件即将重新渲染
    - 可以记录旧值或清理一些即将被更新的状态

- onUpdated
    - 组件完成更新，DOM 已更新
    - 用于依赖新 DOM 状态的逻辑，如重新计算 DOM 高度

- onBeforeUnmount
    - 组件即将卸载
    - 清理副作用，如定时器、事件监听（访问组件）、取消网络请求

- onUnmounted
    - 组件完全卸载
    - 彻底清理资源，避免内存泄漏

- 其他常见钩子
    - onActivated / onDeactivated
    keep-alive 中有效
    - onErrorCaptured
    捕获子组件的运行时错误，类似于 try-catch 的全局版

- vue2 选项式api
    - beforeCreate 用于组件实例化前，无法访问数据和方法，适合进行初始配置。
    - created 阶段在组件实例化后调用，此时可以访问数据和方法，适合进行数据初始化和设置。
    - beforeMount
    - mounted
    - beforeUpdate
    - updated
    - activated 
    - deactivated
    - beforeDestroy
    - destroyed
    - errorCaptured

- 对比
    Vue 3 中使用 Composition API 的生命周期钩子可以更细粒度地控制组件的行为，整体结构清晰，适合逻辑拆分和复用，比 Options API 更灵活。

- Vue 2 发请求用 created 是因为数据已可用且不依赖 DOM，Vue 3 推迟到 onMounted 是为了规避 SSR 副作用并确保逻辑仅在客户端执行。

- React 生命周期分为挂载（mount）、更新（update）和卸载（unmount）三个阶段。常用钩子如 useEffect 替代了类组件的 componentDidMount、componentDidUpdate、componentWillUnmount，用于处理副作用、监听数据变化和清理资源，使函数组件也具备声明式的生命周期能力。
    [] mount
    [a] update
    return () => {}   delete