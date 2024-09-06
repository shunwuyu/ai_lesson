- 跨域问题 - 
    - cors中间件设置了那些请求头属性 
    101  whitelist
- ts
    - 201interface和type的区别
        相同点  都可以给对象指定类型
        区别: 
        instance 接口，只能为对象指定类型 它可以继承。
        type 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名
        定义一个函数  3.ts
- vue react 比较
    301
    - React和Vue，谈谈这两个框架
        相同点  MVVM 组件化  虚拟DOM  全家桶开发
    - 区别
        - React 使用JSX语法，这是一种JavaScript的扩展语法，允许在JavaScript中编写HTML结构。虽然学习曲线稍陡峭，但提供了强大的组件逻辑控制能力。
        - Vue 使用模板语法，更接近传统的HTML，对于HTML熟悉的开发者来说更容易上手。Vue的模板语法支持丰富的指令和表达式，提供了很好的灵活性和简洁性。
        - 状态管理 
            React  Redux
            vue   pinia/vuex
        - 组件通信
            vue  props + defineProps + defineEmits 
            react  props 解构  
        - 生命周期
            vue3 生命周期
            创建阶段
                beforeCreate  在实例初始化之后，数据观测和事件/ watcher 事件之前被调用。
                created  实例创建完成，data、props 已经被观测，但是 DOM 还没有生成。
            - 挂载阶段
                beforeMount - 在挂载开始之前被调用，相关的 render 函数首次被调用。
                mounted - el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
            - 更新阶段
                - beforeUpdate - 数据更新时调用，发生在虚拟 DOM 打补丁之前。
                - updated - 组件 DOM 更新后调用，每当响应式状态改变导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
            - 销毁阶段
                beforeUnmount - 实例销毁之前调用。在这一步，实例仍然完全可用。
                unmounted - Vue 实例被销毁后调用。
            - 错误捕获
                errorCaptured - 当捕获一个来自后代组件的错误时被调用
            vue3 取消了  
                beforeDestroy/  beforeUnmount
                destroyed      unmounted

            onBeforeMount/onMounted/onBeforeUpdate/onUpdated/onBeforeUnmount/onUnmounted 
            /onActivated/onDeactivated/onErrorCaptured
            onActivated - 如果组件是 <keep-alive> 的一部分，则在组件被激活时调用。
            onDeactivated - 如果组件是 <keep-alive> 的一部分，则在组件被停用时调用。
            onErrorCaptured - 捕获子组件树中的错误时调用。

            这些钩子与选项式 API 的钩子在功能上相似，但在使用方式和组合逻辑方面提供了更大的灵活性。Composition API 钩子在 setup() 函数中使用，而不是作为组件选项定义。

            react  useEffect

- 算法
    - 买卖股票  401
    - 01背包
        https://juejin.cn/book/6844733800300150797/section/6844733800371453965
        暴力破解  每一件物品放或者不放进背包的情况。考虑到每一种物品都面临“放”和“不放”两种选择，因此 n 个物品就对应 2^n 种情况，进而会带来高达 O(2^n)的时间复杂度。
        最值问题， 动态规划的标准对口问题
        递归自顶向下 发现问题
