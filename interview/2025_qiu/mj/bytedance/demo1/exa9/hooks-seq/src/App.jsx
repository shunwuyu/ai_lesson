import React, { useState } from 'react';

function BadComponent() {
  const [a, setA] = useState(0); // Hook #1: 状态 a，初始值 0
  console.log('Hook #1 (a) called with value:', a);

  const show = Math.random() > 0.5; // ❌ 问题根源：每次渲染都重新计算，值会变
  console.log('Current render: show =', show);

  let b = undefined;
  if (show) {
    const [bState, setB] = useState(1); // Hook #2: 状态 b，初始值 1
    b = bState;
    console.log('Hook #2 (b) called with value:', b);
  }

  const [c, setC] = useState(2); // Hook #3 (当 show=false 时，它错位成了 Hook #2)
  console.log('Hook #3 (c) called with value:', c);

  return (
    <div style={{ padding: 20, border: '1px solid red', margin: 10 }}>
      <h3 style={{ color: 'red' }}>❌ 错误示例：违反 Hook 规则</h3>
      <p><strong>a:</strong> {a} <button onClick={() => setA(a + 1)}>+1 a</button></p>
      {show && <p><strong>b:</strong> {b} <button onClick={() => setB(b + 1)}>+1 b</button></p>}
      <p><strong>c:</strong> {c} <button onClick={() => setC(c + 1)}>+1 c</button></p>
      <p><strong>当前 show 值:</strong> {String(show)} (随机生成)</p>
      <p style={{ color: 'red' }}>
        <strong>警告:</strong> 每次渲染都随机生成 show，破坏了 Hook 调用顺序！
      </p>
    </div>
  );
}

// ✅ 正确的对比示例
function GoodComponent() {
  const [a, setA] = useState(0); // Hook #1
  const [show, setShow] = useState(false); // Hook #2: 使用 useState 管理 show 状态
  const [b, setB] = useState(1);   // Hook #3: b 状态始终存在
  const [c, setC] = useState(2);   // Hook #4

  return (
    <div style={{ padding: 20, border: '1px solid green', margin: 10 }}>
      <h3 style={{ color: 'green' }}>✅ 正确示例：遵守 Hook 规则</h3>
      <button onClick={() => setShow(!show)}>
        切换显示 b (当前: {String(show)})
      </button>

      <p><strong>a:</strong> {a} <button onClick={() => setA(a + 1)}>+1 a</button></p>
      {show && <p><strong>b:</strong> {b} <button onClick={() => setB(b + 1)}>+1 b</button></p>}
      <p><strong>c:</strong> {c} <button onClick={() => setC(c + 1)}>+1 c</button></p>
    </div>
  );
}

// 根组件
export default function App() {
  return (
    <div>
      <BadComponent />
      <GoodComponent />
    </div>
  );
}