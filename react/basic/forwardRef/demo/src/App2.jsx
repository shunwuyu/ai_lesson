import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import './App.css'
// 过 useRef 创建个 ref 对象，然后把 input 标签设置到 ref。
// function App() {
//   const ref = useRef(null);
//   useEffect(() => {
//     console.log('ref', ref.current)
//     ref.current?.focus();
//   }, []);
//   return (
//     <div className="App">
//       <input ref={ref} />
//     </div>
//   )
// }

// 如果是想从子组件传递 ref 到父组件，就需要 forwardRef 了，也就是把组件内的 ref 转发一下。
// 当封装自定义表单组件时，需要将内部的输入框 ref 暴露给父组件
// const Guang = (props, ref) => {
//   // console.log(ref.current, '////')
//   return <div>
//     <input ref={ref}></input>
//   </div>
// }
// forwardRef 是 React 的一个高阶组件，用于将父组件的
//  ref 传递到子组件的 DOM 节点上。

// React 组件默认不接收 ref 参数，这是因为 ref 是一个特殊的 prop。
// 只有通过 forwardRef 包装后，组件才能接收并正确转发 ref 到内部
// 的 DOM 元素。这是 React 的设计决策，用于明确 ref 的使用意图。
// 作为动词 转发
// const WrapedGuang = forwardRef(Guang);

// function App() {
//   const ref = useRef(null);
 
//   useEffect(()=> {
//     console.log('ref', ref.current)
//     ref.current?.focus()
//   }, []);

//   return (
//     <div className="App">
//       <WrapedGuang ref={ref}/>
//       {/* <Guang ref={ref}/> */}
//     </div>
//   );
// }

// 但有的时候，我不是想把原生标签暴露出去，而是暴露一些自定义内容。


// ref 不在props里
const Guang = (props, ref) => {
  const inputRef = useRef(null);
  // 用于自定义暴露给父组件的 ref 内容，
  // 让父组件可以调用子组件中的指定方法。
  // 暴露命令式方法给父组件 
  useImperativeHandle(ref, () => {
    return {
      aaa() {
        inputRef.current?.focus();
      }
    }
  }, [inputRef]);

  return <div>
    <input ref={inputRef}></input>
  </div>
}

const WrapedGuang = forwardRef(Guang);

function App() {
  const ref = useRef(null);
 
  useEffect(()=> {
    console.log('ref', ref.current)
    ref.current?.aaa();
  }, []);

  return (
    <div className="App">
      <WrapedGuang ref={ref}/>
    </div>
  );
}

export default App
