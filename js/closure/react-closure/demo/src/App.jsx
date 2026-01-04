import { useState, useEffect, useRef } from 'react'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // React 组件中，闭包陷阱（Closure Trap）
//     // 事件处理函数或异步回调中捕获了过时的 state 或 props 值。
//     // 即使点击按钮增加 count，定时器里始终输出 0。
//     // 原因 useEffect 只在组件挂载时运行一次（因依赖为 []）。
//     // 回调函数 () => console.log(count) 在创建时捕获了 初始闭包中的 count（值为 0）。
//     // 后续 count 更新不会影响该闭包，形成“过时闭包”（stale closure）。
//     // 解决方案（面试标准答法） 
//     // 修正依赖数组 
//     const timer = setInterval(() => {
//       console.log('Current count:', count); // 总是打印 0！
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []); // 依赖数组为空！

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </div>
//   );
// }

// 解决方法一：修正依赖数组后的版本
// function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // React 组件中，闭包陷阱（Closure Trap）
//     // 事件处理函数或异步回调中捕获了过时的 state 或 props 值。
//     // 即使点击按钮增加 count，定时器里始终输出 0。
//     // 原因 useEffect 只在组件挂载时运行一次（因依赖为 []）。
//     // 回调函数 () => console.log(count) 在创建时捕获了 初始闭包中的 count（值为 0）。
//     // 后续 count 更新不会影响该闭包，形成“过时闭包”（stale closure）。
//     // 解决方案（面试标准答法） 
//     // 修正依赖数组 
//     const timer = setInterval(() => {
//       console.log('Current count:', count); // 总是打印 0！
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []); // 依赖数组为空！

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//     </div>
//   );
// }

// 解决方法二：使用useRef 同步最新值
// function App() {
//   const [count, setCount] = useState(0);
//   const count_ref = useRef(count);

//   // 同步 ref 与 state
//   useEffect(() => {
//     count_ref.current = count;
//   }, [count]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       console.log('Current count:', count_ref.current); // 正确拿到最新值
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []); // 依赖仍为空，但通过 ref 获取最新值

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(c => c + 1)}>+1</button>
//     </div>
//   );
// }

// 方案一：使用函数式更新 

function App() {
  const [count, setCount] = useState(0);

 
  const handleClickBad = () => {
    setTimeout(() => {
      setCount(count + 1); // 闭包， 旧值计算
      setCount(count + 1); 
    }, 1000);
  };

  // ✅ 正确写法：使用函数式更新
  const handleClickGood = () => {
    setTimeout(() => {
      setCount(prev => prev + 1); // 基于最新状态计算
      setCount(prev => prev + 1); // 链式更新，结果正确为 +2
    }, 1000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClickBad}>错误更新（+1）</button>
      <button onClick={handleClickGood}>正确更新（+2）</button>
    </div>
  );
}

export default App
