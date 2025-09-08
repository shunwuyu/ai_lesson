'use client';

import { useState, useOptimistic } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '写项目', completed: false },
    { id: 3, text: '喝咖啡', completed: false },
  ]);

  // 🌟 useOptimistic：定义乐观更新逻辑
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, updatedTodo) => {
      return state.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...todo, completed: updatedTodo.completed }
          : todo
      );
    }
  );

  const handleToggle = async (id, currentCompleted) => {
    const updatedTodo = { id, completed: !currentCompleted };

    // 👉 1. 立刻更新 UI（乐观）
    addOptimistic(updatedTodo);

    try {
      const res = await fetch('/api/todos/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });

      const data = await res.json();

      if (data.code === 0) {
        // ✅ 成功：更新真实状态
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !currentCompleted } : t
          )
        );
      } else {
        // ❌ 失败：React 会自动回滚 optimisticTodos！
        console.log(`❌ 更新失败：${data.message}\n但 UI 已自动恢复！`);
      }
    } catch (error) {
      console.log(`❌ 请求异常：${error.message}\nUI 已自动回滚。`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🎯 useOptimistic + Vite Mock 插件演示</h2>
      <p>点击“完成”按钮，有 50% 概率失败，观察 UI 是否自动回滚👇</p>

      <ul>
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              opacity: todo.completed ? 0.6 : 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
            <button
              onClick={() => handleToggle(todo.id, todo.completed)}
              style={{
                marginLeft: '10px',
                padding: '4px 8px',
                fontSize: '12px',
              }}
            >
              {todo.completed ? '已完成' : '完成'}
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#666', fontSize: '12px', marginTop: '20px' }}>
        💡 提示：刷新页面可重置状态。打开网络面板可查看 mock 请求。
      </p>
    </div>
  );
}