import { useRef, useEffect } from "react";
// 存储可变值，更新不触发重渲染，常用于保存 DOM 或状态。
// 父组件通过 useRef 获取子组件实例，直接调用其暴露的方法。
import Child from "./Child";
// 2. 父组件：创建 ref 并调用
export default function Parent() {
    const childRef = useRef(null);
  
    const handleClick = () => {
      // 调用子组件暴露的方法
    //   childRef.current.customFocus(); 
      childRef.current.sayHello();
    };

    useEffect(() => {
      childRef.current.customFocus();
    }, []);
  
    return (
      <div>
        <Child ref={childRef} />
        <button onClick={handleClick}>调用子组件方法</button>
      </div>
    );
  }