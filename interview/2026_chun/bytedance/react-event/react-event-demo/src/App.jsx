import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react';

function EventPoolingDemo() {
  const handleClick = (e) => {
    // 1. 同步访问：此时事件对象还在手中，能正常打印
    console.log('同步访问：', e.type); // 输出: "click"

    // 2. 异步访问：事件处理函数执行完后，事件对象被回收并清空了属性
    setTimeout(() => {
      console.log('异步访问（未持久化）：', e.type); // 输出: null (因为对象被回收清空了)
    }, 100);

    // 3. 调用 persist() 将事件对象从池中“取出”，阻止被回收清空
    // This synthetic event is reused for performance reasons. 
    // If you're seeing this, you're accessing the property `type` on
    //  a released/nullified synthetic event. This is set to null. 
    //  If you must keep the original synthetic event around, use event.persist()
    // e.persist();

    // 4. 再次异步访问：因为调用了 persist，属性被保留了下来
    // setTimeout(() => {
    //   console.log('异步访问（已持久化）：', e.type); // 输出: "click"
    // }, 200);
  };

  return <button onClick={handleClick}>点击测试事件池</button>;
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EventPoolingDemo/>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
