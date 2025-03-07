import { useState, useEffect, memo, useCallback, useMemo } from 'react';

// function Child() {
//   console.log(2)
//   return (<div>2</div>)
// }

function Child(props) {
  console.log(2)
  return (<div>{props.num}</div>)
}

// function App() {
//   // setCount 函数会被调用，更新 count 状态。这会触发 App 组件的重新渲染。
//   // 在重新渲染过程中，setTimeout 函数会再次被执行，开始一个新的计时。
//   setTimeout(() => {
//     console.log(1)
//   }, 1000)
//   // 之前的 setInterval 还在。每次 count 更新组件重渲染，
//   // 都会新建 setInterval，多个定时器叠加致执行变快。
//   setInterval(() => {
//     console.log(1)
//   }, 2000)
//   // 它依赖项为空数组，仅挂载和卸载时执行，非不执行，检查是否首次渲染异常。
//   useEffect(() => {
//     console.log('--------------')
//   }, [])

//   const [count, setCount] = useState(1)
//   return (
//     <>
//       <Child />
//       <div>
//       {count}
//       </div>
//       <button onClick={() => setCount((prev) => prev + 1)}>点击</button>
//     </>
//   )
// }
const MemoChild = memo(Child)

function App() {
  // setCount 函数会被调用，更新 count 状态。这会触发 App 组件的重新渲染。
  // 在重新渲染过程中，setTimeout 函数会再次被执行，开始一个新的计时。
  // setTimeout(() => {
  //   console.log(1)
  // }, 1000)
  // 之前的 setInterval 还在。每次 count 更新组件重渲染，
  // 都会新建 setInterval，多个定时器叠加致执行变快。
  // setInterval(() => {
  //   console.log(1)
  // }, 2000)
  // 它依赖项为空数组，仅挂载和卸载时执行，非不执行，检查是否首次渲染异常。
  // useEffect(() => {
  //   console.log('--------------')
  // }, [])

  const [count, setCount] = useState(1)
  const [num, setNum] = useState(110)
  // const func = () => { console.log('haha')}
  const func = useCallback(() => { console.log('haha')}, [])
  const squaredNum = useMemo(() => {
    console.log('Calculating squared number...');
    return num * num;
  }, [num]);
  return (
    <>
      <MemoChild num={num} func={func} squaredNum={squaredNum}/>
      <div>
      {count}
      </div>
      <button onClick={() => setCount((prev) => prev + 1)}>点击</button>
    </>
  )
}

export default App