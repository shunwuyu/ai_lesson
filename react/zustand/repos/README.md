# zustand

Zustand 是一个轻量级 React 状态管理库，组件直接订阅 store 里的数据，改了自动刷新，没 Provider 包裹那一套。 比 useContext 更简单。

三步走：

1. create 定义一个 store，传入 (set, get) => ({ state, actions })
2. 在组件里 useStore(selector) 按需取数据，避免全量订阅
3. 直接调 action 改状态，组件自动刷新
