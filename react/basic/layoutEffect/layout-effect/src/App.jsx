import { useEffect, useRef, useState, useLayoutEffect } from "react";

// 先useLayoutEffect 再 useEffect
// function App() {
//   const boxRef = useRef();
//   // 两个都能拿到高度；
//   useEffect(() => {
//     console.log('useEffect height:', boxRef.current.offsetHeight);
//   }, []);

//   useLayoutEffect(() => {
//     console.log('useLayoutEffect height:', boxRef.current.offsetHeight);
//   }, []);

//   return <div ref={boxRef} style={{ height: 100 }}>Hello</div>;
// }

// 页面会先显示 50px，然后跳成 200px —— 用户会看到跳变。
// function App() {
//   const ref = useRef();

//   useEffect(() => {
//     // 动态改变高度
//     ref.current.style.height = '200px';
//   }, []);

//   return <div ref={ref} style={{ height: '50px', background: 'lightblue' }}>内容</div>;
// }
// 页面直接显示最终高度，无闪动。
// 
// function App() {
//   const ref = useRef();

//   useLayoutEffect(() => {
//     ref.current.style.height = '200px';
//   }, []);

//   return <div ref={ref} style={{ height: '50px', background: 'lightblue' }}>内容</div>;
// }

function Modal() {
  const ref = useRef();
  useLayoutEffect(() => {
    const height = ref.current.offsetHeight;
    ref.current.style.marginTop = `${(window.innerHeight - height) / 2}px`;
  }, []);

  return <div ref={ref} style={{ position: 'absolute', width: '200px' }}>我是弹窗</div>;
}

function App() {
  return (
    <>
      <Modal />
    </>
  )
}

export default App;