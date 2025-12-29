- bad example
useMemo 缓存的是什么？
缓存的是“返回值”，不是函数

## 什么情况下不该用 useMemo？
- 计算不重
- 依赖频繁变化
- 为了看起来高级

useMemo 通过依赖数组缓存计算结果，避免无意义的重复计算，是 React 性能优化中最常用也最容易被滥用的 Hook

## useCallback

count 改变

App 重新 render

handleClick 是一个“新函数”

Child 收到的新 props → 重新 render

👉 函数在 React 中是“引用类型”

- useCallback 用来缓存函数引用，避免在依赖不变时生成新的函数

  关键词（必须说）：

  缓存

  函数引用

  依赖数组

useCallback 用来缓存函数引用，避免在依赖不变时生成新的函数
缓存

函数引用

依赖数组

React.memo 用于缓存组件，避免 props 不变时重复渲染；
useCallback 用于缓存函数引用，避免在组件重新渲染时创建新函数，从而防止因函数引用变化导致子组件不必要的重渲染