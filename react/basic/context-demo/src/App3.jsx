import { ThemeContext } from "./ThemeContext";
import Page from './components/Page';

function App() {
  return (
    // 返回的是一个 包含 Provider 和 Consumer 的上下文对象 。
    // 上下文的 提供者组件 ，包在外面，把 value 传给所有子孙组件，让它们能读到共享数据。
    // value 覆盖默认值
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

export default App;