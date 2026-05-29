// 父组件优化
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


function App() {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({ name: 'Alice', age: 25 });
  
    // 使用 useMemo 缓存 theme 对象，只有当依赖变化时才重新创建
    // UserInfo 组件接收到新的 props：
    // user 的引用和上次一样 → 浅比较相等 ✅
    // theme 的引用和上次不一样 → 浅比较不相等 ❌
    // 结果：React.memo 判断 props 发生了变化，因此 UserInfo 会重新渲染，即使 theme 的内容其实没变
    const theme = React.useMemo(() => ({ color: 'blue' }), []);
  
    return (
      <div>
        <h1>计数: {count}</h1>
        <button onClick={() => setCount(count + 1)}>增加计数</button>
        <UserInfo user={user} theme={theme} />
      </div>
    );
  }

  export default App