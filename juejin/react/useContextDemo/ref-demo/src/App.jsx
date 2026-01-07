import { useRef, useState } from 'react'  
// useRef 提供一个在组件整个生命周期内都稳定存在的可变容器，
// 修改它不会触发重新渲染
function App() {
  const [count, setCount] = useState(0);j
  const timerRef = useRef(null)
  console.log('---------------------');
  const start = () => {
    timerRef.current = setInterval(() => {
      console.log('tick')
    }, 1000)
  }

  const stop = () => {
    clearInterval(timerRef.current)
  }

  return (
    <>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
      <div>当前计数: {count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </>
  )
}

export default App