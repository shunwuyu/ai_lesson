import React, { useState, useEffect } from 'react'
import './App.css'

function WindowResizeListener() {
  useEffect(() => {
    const handleResize = () => {
      console.log("resized, ???");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // 卸载时清除
      console.log('////')
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Resize the window</div>;
}

function App() {
  const [showResizer, setShowResizer] = useState(true);

  const handleClick = (e) => {
    console.log(e); // 是 SyntheticEvent
    console.log(e.nativeEvent); // 原生事件
  };

  const toggleResizer = () => {
    setShowResizer(!showResizer);
  }

  return (
    <>
      <button onClick={handleClick}>Click</button>
      { showResizer && <WindowResizeListener /> }
      <button onClick={toggleResizer}>toggle</button>
    </>
  )
}

export default App
