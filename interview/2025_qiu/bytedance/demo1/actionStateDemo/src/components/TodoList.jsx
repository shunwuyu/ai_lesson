import { useState, useOptimistic } from 'react';

export default function TodoList() {
  // 1. 真实状态：从服务器加载的真实数据
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '写代码', completed: false },
  ]);

  // 2. 乐观状态：基于真实状态，但允许“提前更新”
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => {
      // 这个函数返回“假设操作成功”后的 UI 状态
      // state: 当前乐观状态
      // newTodo: 你传给 addOptimisticTodo 的值
      return [...state, { ...newTodo, id: Date.now() }];
    }
  );

  // 添加任务（带乐观更新）
  function handleAdd(text) {
    const newTodo = { text, completed: false };

    // 👉 1. 立刻更新乐观状态（UI 瞬间变化）
    addOptimisticTodo(newTodo);

    // 👉 2. 在后台发送真实请求
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    })
      .then(() => {
        // 请求成功：更新真实状态（此时乐观状态会自动同步）
        setTodos((prev) => [...prev, { ...newTodo, id: Date.now() }]);
      })
      .catch(() => {
        // 请求失败：React 会自动将乐观状态“回滚”到上一个真实状态
        alert('添加失败！');
      });
  }

  // 切换完成状态
  function handleToggle(id, completed) {
    // 找到要更新的任务
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // 👉 1. 乐观地更新 UI：立刻标记为 completed = !completed
    addOptimisticTodo({
      ...todo,
      completed: !completed,
    });

    // 👉 2. 发送请求
    fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        // 成功：更新真实状态
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
        );
      })
      .catch(() => {
        // 失败：React 自动回滚 UI 到之前状态！
        alert('更新失败，已恢复原状态');
      });
  }

  return (
    <div>
      <h2>Todo List（乐观更新版）</h2>

      {/* 添加新任务 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const text = formData.get('text');
          if (text) handleAdd(text);
          e.target.reset();
        }}
      >
        <input name="text" placeholder="添加新任务" />
        <button type="submit">添加</button>
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              opacity: todo.completed ? 0.6 : 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
            <button
              onClick={() => handleToggle(todo.id, todo.completed)}
              disabled={todo.completed}
            >
              {todo.completed ? '已完成' : '完成'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}