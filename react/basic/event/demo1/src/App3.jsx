import React, { useState, useEffect } from 'react'

function EventPoolExample() {
  // react 18 取消了 event pooling
  const handleClick = (e) => {
    console.log('立即访问:', e.type); // 正常输出：click
    // e.persist(); 
    setTimeout(() => {
      console.log('延迟访问:', e.type); // ⚠️ 报错：Cannot read properties of null
    }, 1000);
  };

  return <button onClick={handleClick}>Click Me</button>;
}

function App() {

  return <EventPoolExample/>;
}
export default App