// src/App.jsx

import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 在组件挂载后执行
    console.log('Component did mount');

    // 清理函数，在组件卸载前执行
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 传入空数组意味着这个effect只会在组件挂载和卸载时执行一次

  useEffect(() => {
    // 当count改变时执行
    console.log(`Count changed to ${count}`);
  }, [count]); // 只有当count变化时才重新执行

  return (
    <div className="App">
      <h1>Hello, Vite + React!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle visibility
      </button>
      {isVisible && <div>I am visible!</div>}
    </div>
  );
}

export default App;