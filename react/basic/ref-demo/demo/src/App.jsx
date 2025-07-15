import { useState, useEffect, useRef } from "react";
// useRef 的类型参数是保存的内容的类型。

// 这里通过 ref 保存 input 元素的引用，然后在 useEffect 里调用它的 focus 方法。

// ref 的内容是保存在 current 属性上的。
// function App() {
//   const inputRef = useRef(null);
//   console.log('~~~~~~');
//   useEffect(() => {
//         inputRef.current?.focus();
//   }, []);
//   return (
//       <>
//         <input type="text" ref={inputRef}/>
//       </>
//   )
// }

// ref 其实就是一个有 current 属性的对象，除了可以保存 dom 引用，也可以放别的内容：
// function App() {
//     const numRef = useRef(0);
//   // 但它不会触发重新渲染： 不是响应式的
//     return (
//         <div>
//             <div onClick={() => {
//                 console.log('//////')
//                 numRef.current += 1
//             }}>{numRef.current}</div>
//         </div>
//     );
// }

// 如何触发重新渲染呢？
// 函数的重新渲染不会触发numRef的重新赋值吗？
// useRef 的值是“持久化”的
// useRef 返回的对象（如 numRef）在组件的整个生命周期中保持同一个引用。
function App() {
    const numRef = useRef(0);
  // 但它不会触发重新渲染： 不是响应式的
    const [, forceRender] = useState(0);

    return (
        <div>
            <div onClick={() => {
                console.log('//////')
                numRef.current += 1
                forceRender(Math.random());
            }}>{numRef.current}</div>
        </div>
    );
}


export default App
