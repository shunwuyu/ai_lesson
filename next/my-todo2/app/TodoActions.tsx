// app/TodoActions.tsx
'use client'
import { useState } from 'react';

type Todo = {
  id: number
  title: string
  completed: boolean
}

type Props = {
  initTodos: Todo[]
}

export default function TodoActions({ initTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [inputText, setInputText] = useState("");

  // 刷新列表
  const refreshTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  }

  // 新增todo
  const addTodo = async () => {
    if (!inputText.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: inputText })
    })
    setInputText("");
    refreshTodos();
  }

  // 切换完成状态
  const toggleTodo = async (todo: Todo) => {
    await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed })
    })
    refreshTodos();
  }

  // 删除todo
  const delTodo = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE"
    })
    refreshTodos();
  }

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入待办事项"
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={addTodo}>添加</button>
      </div>
      <ul style={{ padding: "10px 0" }}>
        {todos.map(item => (
          <li key={item.id} style={{ display: "flex", gap: 10, margin: "6px 0", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item)}
            />
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
              {item.title}
            </span>
            <button onClick={() => delTodo(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </>
  )
}