import React from 'react';
export default function App() {
  const boxRef = React.useRef(null)

  // React.useEffect(() => {
  //   const box = boxRef.current
  //   const left = (window.innerWidth - box.offsetWidth) / 2
  //   box.style.transform = `translateX(${left}px)`
  // }, [])
  // 修改后
  React.useLayoutEffect(() => {
    const box = boxRef.current
    const left = (window.innerWidth - box.offsetWidth) / 2
    box.style.transform = `translateX(${left}px)`
  }, [])

  return (
    <div ref={boxRef} style={{ width: 200,backgroundColor:'blue', height:200 }}>
      我是盒子
    </div>
  )
}
