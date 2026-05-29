import React, { memo, useState } from 'react';

// 使用 React.memo 包裹的子组件
const UserInfo = memo(({ user, theme }) => {
  console.log('UserInfo 组件重新渲染了！'); // 用于观察是否渲染
  return (
    <div style={{ color: theme.color }}>
      <p>姓名: {user.name}</p>
      <p>年龄: {user.age}</p>
    </div>
  );
});

// 父组件
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Alice', age: 25 });
  const theme = { color: 'blue' }; // 注意：每次 App 渲染，theme 都是一个新对象

  return (
    <div>
      <h1>计数: {count}</h1>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <UserInfo user={user} theme={theme} />
    </div>
  );
}

export default App;