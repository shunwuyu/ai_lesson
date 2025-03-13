import React from 'react';
import { createRoot } from 'react-dom/client'; // 引入createRoot

function App() {
  return React.createElement(
    'div',
    { id: 'app' },
    'Hello React 18!'
  );
}

// 获取要挂载的目标DOM节点
const container = document.getElementById('root');

// 创建一个新的根实例
const root = createRoot(container);

// 渲染App组件到指定的容器中
root.render(<App />);