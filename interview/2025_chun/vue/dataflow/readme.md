# vue和react数据流的区别

- vue
    vuex  Vue 2 的状态管理库  使用单一状态树和不可变数据，支持中间件。mutation action data getters 比较复杂
    pinia 新一代状态管理库，轻量、易用，全面hooks 编程

- react
    redux 流行的状态管理库，使用单一状态树和不可变数据，支持中间件。
    MobX 基于可观察数据的状态管理库，提供简单的 API 和自动依赖追踪。
    zustand 轻量级状态管理库，使用 hooks，简单易用。

Vue 通过响应式系统自动追踪数据依赖，组件在数据变化时自动更新，数据流较为直观；React 则采用单向数据流，依赖 useState、useReducer 等手动管理状态，需显式更新组件，逻辑更灵活但复杂度略高。