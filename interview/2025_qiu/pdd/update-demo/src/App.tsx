import React, { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';

export default function App() {
  const [count, setCount] = useState(0);

  // 只有 count 更新时才执行，初次渲染不会触发
  useUpdateEffect(() => {
    console.log('🔄 count changed:', count);
    // 这里也可以执行副作用，比如发请求
    return () => console.log('cleanup for count:', count);
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <h1>useUpdateEffect Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
