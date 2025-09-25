import { useState } from 'react'
import './App.css'

function Demo() {
  const [text, setText] = useState("");

  const handleClick = (event) => {
    // 异步访问 event
    setTimeout(() => {
      console.log(event.type); // ❌ 没用 persist 会报 null，事件对象已被池化
    }, 1000);

    // 正确写法：
    event.persist(); // 保留事件对象，不被复用
    setTimeout(() => {
      console.log(event.type); // ✅ 'click'
    }, 1000);
  };

  return <button onClick={handleClick}>Click me</button>;
}


function App() {

  return (
    <>
      <Demo />
    </>
  )
}

export default App
