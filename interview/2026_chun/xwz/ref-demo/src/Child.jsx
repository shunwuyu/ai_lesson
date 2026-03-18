import { forwardRef, useImperativeHandle, useRef } from "react";
// forwardRef 是 React 的一个高阶组件，用于将父组件的 ref 传递到子组件的 DOM 节点上。
// 
const Child = forwardRef((props, ref) => {
  // 1. 创建内部 ref 来绑定 input DOM 节点
  const inputRef = useRef(null);

  // 定义内部逻辑
  const focusInput = () => {
    // 2. 调用原生 DOM 的 focus 方法
    if (inputRef.current) {
      inputRef.current.focus();
      console.log('输入框已聚焦！');
    }
  };

  // 自定义暴露给父组件的内容
  // Imperative 向辅组件暴露以下方法
  // ref 是父组件传递过来的，子组件通过 useImperativeHandle 来暴露给父组件。
  useImperativeHandle(ref, () => ({
    customFocus: focusInput,
    sayHello: () => console.log('Hello from Child!')
  }));

  // 3. 将 inputRef 绑定到 input 元素上
  return <input ref={inputRef} placeholder="子组件输入框" />;
});

export default Child;