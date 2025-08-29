// App.jsx
import React from 'react';
import VirtualList from './components/VirtualList';

// 生成 100,000 条测试数据
const generateData = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is item number ${i}, rendered with virtual scrolling.`,
  }));

const App = () => {
  const data = generateData(100000); // 10万条数据

  const renderItem = (item, index) => (
    <div
      style={{
        padding: '10px',
        borderBottom: '1px solid #eee',
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
      }}
    >
      <strong>[{index}]</strong> {item.name}
      <p style={{ margin: '4px 0', fontSize: '0.9em', color: '#666' }}>
        {item.description}
      </p>
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Virtual List with 100,000 Items</h1>
      <p>Smooth scrolling with virtualization ✅</p>

      <VirtualList
        data={data}
        height={window.innerHeight - 100} // 容器高度（比如留出标题空间）
        itemHeight={80} // 每项固定高度（px）
        renderItem={renderItem}
        overscan={3} // 预渲染上下各 3 个额外项
      />
    </div>
  );
};

export default App;