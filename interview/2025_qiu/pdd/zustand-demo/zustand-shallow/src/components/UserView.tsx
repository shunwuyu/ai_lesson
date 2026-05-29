// GoodUserView.tsx
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

export function UserView() {
  // ✅ 正确：使用 shallow，只在值变化时渲染
  const user = useStore(state => state.user);

  console.log('🟢 GoodUserView 渲染了'); // 内容不变时不打印！

  return (
    <div style={{ color: 'green' }}>
      <h3>正确示例：{user.name}, {user.age}岁</h3>
    </div>
  );
}