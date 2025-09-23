import React from 'react';
import { useAppStore } from './store';

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

// ❌ 未优化：直接返回 user 对象
export function UserView() {
  console.log('UserView render'); // 观察渲染
  const user = useAppStore((s) => s.user);
  return (
    <div>
      <h2>UserView</h2>
      <p>{user.name} - {user.age}</p>
    </div>
  );
}
