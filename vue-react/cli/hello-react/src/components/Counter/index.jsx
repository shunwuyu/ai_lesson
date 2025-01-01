// Counter.js

import React, { useState } from 'react';
import './index.css'; // 引入本地样式文件

function Counter() {
  // 定义响应式数据
  const [count, setCount] = useState(0);

  // 定义方法
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      {/* 显示 count 的值 */}
      <p>Count: {count}</p>
      {/* 按钮，点击后调用 increment 方法 */}
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default Counter;