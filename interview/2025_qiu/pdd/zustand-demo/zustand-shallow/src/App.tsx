import React from 'react';
import { useAppStore } from './store';
import { shallow } from 'zustand/shallow';

export default function App() {
  const count = useAppStore((s) => s.count);
  const setCount = useAppStore((s) => s.setCount);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <UserView />
    </div>
  );
}

export function UserView() {
  console.log('UserView render'); // 观察渲染
  // ✅ 使用 shallow，只有 user 内部字段变化才渲染
  const { name, age } = useAppStore((s) => ({ name: s.user.name, age: s.user.age }), shallow);
  return (
    <div>
      <h2>UserView</h2>
      <p>{name} - {age}</p>
    </div>
  );
}
