import React, { useState } from 'react';
import KeepAlive from './components/KeepAlive';

// 一个有状态的子组件
const Counter = ({ name }) => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>{name} 视图</h3>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>加 1</button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('A')}>显示 A 组件</button>
        <button onClick={() => setActiveTab('B')}>显示 B 组件</button>
      </div>

      {/* 使用 KeepAlive 包裹 */}
      <KeepAlive activeId={activeTab}>
        {activeTab === 'A' ? <Counter name="A" /> : <Counter name="B" />}
      </KeepAlive>
    </div>
  );
};

export default App;