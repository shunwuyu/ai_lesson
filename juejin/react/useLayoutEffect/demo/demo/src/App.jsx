import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
// function App() {
//   const boxRef = React.useRef(null)
//   const [left, setLeft] = React.useState(0)

//   React.useEffect(() => {
//     const width = boxRef.current.offsetWidth
//     // setLeft((window.innerWidth - width) / 2)
//     setTimeout(() => {
//       setLeft((window.innerWidth - width) / 2)
//     }, 1000)
//   }, [])

//   return (
//     <div
//       ref={boxRef}
//       style={{
//         position: 'absolute',
//         left,
//         top: 100,
//         width: 500,
//         height: 500,
//         background: 'skyblue'
//       }}
//     >
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//       BoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBoxBox
//     </div>
//   )
// }

function App() {
  const boxRef = React.useRef(null)
  const [left, setLeft] = React.useState(0)

  React.useLayoutEffect(() => {
    const width = boxRef.current.offsetWidth
    setLeft((window.innerWidth - width) / 2)
  }, [])

  return (
    <div
      ref={boxRef}
      style={{
        position: 'absolute',
        left,
        top: 100,
        width: 200,
        height: 100,
        background: 'skyblue'
      }}
    >
      Box
      <BoxAnimation/>
    </div>
  )
}



function BoxAnimation() {
  const boxRef = useRef(null);
  // DOM 更新 → useLayoutEffect →   浏览器绘制
// 👉 用户永远只看到动画后的状态
  // useLayoutEffect(() => {
    // DOM 更新 → 浏览器绘制（初始位置） → 执行 effect → 再绘制
    // 会看到“先在原地，再跳动”
  useEffect(() => {
    const box = boxRef.current;
    let start = null;
    const duration = 1000; // 1s
    const distance = 300; // px

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      // 计算当前位移
      const x = Math.min((progress / duration) * distance, distance);
      box.style.transform = `translateX(${x}px)`;

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <div
        ref={boxRef}
        style={{
          width: 80,
          height: 80,
          background: "#3b82f6",
          borderRadius: 8,
        }}
      />
    </div>
  );
}


export default App