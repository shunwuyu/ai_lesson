import React, { useState, useCallback, useEffect, memo } from 'react';

// 1. 基础示例：不使用useCallback导致子组件重复渲染
const ExpensiveChild = memo(({ onClick }) => {
  console.log("ExpensiveChild 重新渲染");
  return <button onClick={onClick}>点击我</button>;
});

// 2. 使用useCallback优化的子组件
const OptimizedChild = memo(({ onClick }) => {
  console.log("OptimizedChild 渲染");
  return <button onClick={onClick}>优化后的按钮</button>;
});

// 3. 依赖项示例
const DependentChild = memo(({ onClick }) => {
  console.log("DependentChild 渲染");
  return <button onClick={onClick}>依赖更新按钮</button>;
});

// 4. 闭包陷阱示例组件
const ClosurePitfall = () => {
  const [count, setCount] = useState(0);
  
  // 错误示例：useCallback内部使用了旧的count
  const wrongIncrement = useCallback(() => {
    setCount(count + 1); // 这里可能访问到旧的count值
  }, []); // 空依赖数组

  // 正确示例：使用函数式更新
  const correctIncrement = useCallback(() => {
    setCount(prev => prev + 1); // 始终使用最新的值
  }, []); // 空依赖数组是安全的

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={wrongIncrement}>错误的增加</button>
      <button onClick={correctIncrement}>正确的增加</button>
    </div>
  );
};

// 5. 事件处理和API调用示例
const ApiCallExample = () => {
  const [data, setData] = useState(null);
  const [id, setId] = useState(1);

  // API调用使用useCallback包装
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.example.com/data/${id}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [id]); // 依赖于id

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData作为依赖项

  return <div>{/* 渲染数据 */}</div>;
};

// 6. 性能优化实战示例
const PerformanceExample = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  // 优化的添加项目函数
  const addItem = useCallback(() => {
    if (!text) return;
    setItems(prevItems => [...prevItems, { id: Date.now(), text }]);
    setText('');
  }, [text]);

  // 优化的删除项目函数
  const removeItem = useCallback((itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []); // 不需要依赖项，因为使用了函数式更新

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="添加新项目"
      />
      <button onClick={addItem}>添加</button>
      <ItemList items={items} onRemove={removeItem} />
    </div>
  );
};

// 使用memo优化的列表组件
const ItemList = memo(({ items, onRemove }) => {
  console.log("ItemList 渲染");
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.text}
          <button onClick={() => onRemove(item.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 不使用useCallback的函数
  const handleClick = () => {
    console.log('按钮被点击');
  };

  // 使用useCallback的函数
  const handleClickOptimized = useCallback(() => {
    console.log('优化后的按钮被点击');
  }, []); // 空依赖数组

  // 带有依赖项的useCallback
  const handleClickWithDeps = useCallback(() => {
    console.log(`当前计数: ${count}`);
  }, [count]); // 依赖于count

  return (
    <div>
      <h1>useCallback 教学示例</h1>
      
      <section>
        <h2>1. 基础比较</h2>
        <ExpensiveChild onClick={handleClick} /> {/* 每次渲染都会重新创建函数 */}
        <OptimizedChild onClick={handleClickOptimized} /> {/* 函数被缓存 */}
      </section>

      <section>
        <h2>2. 依赖项示例</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>增加计数</button>
        <DependentChild onClick={handleClickWithDeps} />
      </section>

      <section>
        <h2>3. 闭包陷阱示例</h2>
        <ClosurePitfall />
      </section>

      <section>
        <h2>4. API调用示例</h2>
        <ApiCallExample />
      </section>

      <section>
        <h2>5. 性能优化实战</h2>
        <PerformanceExample />
      </section>
    </div>
  );
};

export default App; 