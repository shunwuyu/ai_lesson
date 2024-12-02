- useState
  app-hook2.tsx 

- lazy useState
  app-hook3.tsx

- useEffect
  app-hook4.tsx

- 自定义组件
  use-emoji.ts
  app-hook5.tsx

- useContext
  components/app-button
  components/app-header
  App.tsx

- useContext 函数组件用法
  app-hook.tsx  app-hook.css

当一个组件被包裹在<React.StrictMode>中时，在开发环境下，React会刻意地在第一次渲染后立即重新渲染该组件一次。

显示潜在问题的工具。它本身不会改变组件的行为，但在开发模式下，它会使得React对某些行为进行双重检查，比如组件渲染和生命周期方法的调用。

