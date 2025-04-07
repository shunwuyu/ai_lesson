# snabbdom

- 虚拟dom的作用 

    虚拟 DOM 的作用是提高性能，通过在内存中表示 DOM 结构，减少直接操作真实 DOM 的次数，从而优化渲染效率和用户体验。它允许快速比较和更新界面，提升应用的响应速度。

- vue 使用哪个库做的虚拟DOM?

    Vue 使用 snabbdom 库来实现虚拟 DOM。snabbdom 是一个轻量级的虚拟 DOM 库，提供高效的 DOM diff 算法，帮助 Vue 在更新视图时优化性能。

    - npm i snabbdom
    