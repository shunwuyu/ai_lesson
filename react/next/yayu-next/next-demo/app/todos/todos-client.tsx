'use client'

import { useState } from "react";
import type { Todo } from "./types";

export default function TodosClient({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data: Todo[] = await res.json();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    setText("");
    await fetchTodos();
  };

  const toggleTodo = async (item: Todo) => {
    await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, completed: !item.completed }),
    });
    await fetchTodos();
  };

  const delTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchTodos();
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入新的待办任务"
      />
      <button onClick={handleAdd} style={{ marginLeft: "8px" }}>添加</button>
      <ul style={{ paddingLeft: "0", listStyle: "none" }}>
        {todos.map((item) => (
          <li key={item.id} style={{ margin: "8px 0", display: "flex", gap: "10px" }}>
            <span
              onClick={() => toggleTodo(item)}
              style={{ textDecoration: item.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {item.content}
            </span>
            <button onClick={() => delTodo(item.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
