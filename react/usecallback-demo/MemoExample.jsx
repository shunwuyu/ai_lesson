import React, { useState, memo } from 'react';

// 未使用 memo 的组件 - 父组件状态变化时会重新渲染
const RegularChild = ({ name }) => {
  console.log('RegularChild 渲染了');
  return <div>Hello, {name}</div>;
};

// 使用 memo 的组件 - 只有当 name 改变时才会重新渲染
const MemoizedChild = memo(({ name }) => {
  console.log('MemoizedChild 渲染了');
  return <div>Hello, {name}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        点击计数: {count}
      </button>
      <RegularChild name={name} />
      <MemoizedChild name={name} />
    </div>
  );
};

export default Parent; 