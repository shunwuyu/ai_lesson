import { useState } from 'react'
import './App.css'

function ActionButton({ text, onClick }) {
  const handleClick = (event, extraData) => {
    event.preventDefault(); // 阻止默认行为
    event.stopPropagation(); // 阻止事件冒泡
    onClick(extraData); // 调用外部传入的点击处理函数并传递额外数据
  };

  return (
    <button onClick={(e) => handleClick(e, { action: 'save', data: text })}>
      {text}
    </button>
  );
}

function App() {

  return (
    <>
      <ActionButton text="Save" onClick={(data) => console.log(data)} />
    </>
  )
}

export default App
