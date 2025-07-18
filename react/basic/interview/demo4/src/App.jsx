import { useState, useEffect } from 'react'
import './App.css'

function Counter() {
  const [count, setCount] = useState(0);
  // 我们尝试每秒通过 setInterval 增加 count 的值。
  // 然而，由于 useEffect 的依赖数组为空 ([])，这意味着该
  //  effect 只会在组件首次渲染时执行一次，并且它捕获了 count 
  //  的初始值 0。因此，每次 setInterval 的回调函数被调用时，
  //  它使用的都是这个“陈旧”的 count 值 0，导致 count 永远不会超过 1。
  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setCount(count + 1); // 这里存在闭包陷阱
  //     console.log(`Count after ${count} seconds`);
  //   }, 1000);
    
  //   return () => clearInterval(timerID); // 清理定时器
  // }, []); // 空数组意味着 effect 仅在组件挂载和卸载时运行
  // 解决方案一
  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setCount(prevCount => prevCount + 1); // 使用函数更新状态
  //   }, 1000);
  
  //   return () => clearInterval(timerID);
  // }, []); // 保持依赖数组为空，因为我们不再依赖于 count
  // 解决方案二
  // 不过，第二种方法会导致定时器频繁地被清除和重新设置，通常不是最佳实践。
  // 第一种方法更优，因为它避免了不必要的副作用并确保了状态更新的一致性。
  useEffect(() => {
    const timerID = setInterval(() => {
      setCount(count + 1);
      console.log(`Count after ${count} seconds`);
    }, 1000);
  
    return () => clearInterval(timerID);
  }, [count]); // 将 count 加入依赖项，使得每次 count 变化时重新设置定时器
  return (
    <div>
      <h1>Current Count: {count}</h1>
    </div>
  );
}

function App() {
  

  return (
    <>
      <Counter/>
    </>
  )
}

export default App
