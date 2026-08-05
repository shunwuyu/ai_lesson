// app/page.tsx
// 这里禁止添加 'use client'，纯服务器组件，利于SEO

import TodoActions from "./TodoActions";
import { getTodos as loadTodos } from "../lib/todos-data";

// 服务端直接从共享数据层拿 todos，避免走 HTTP 相对路径
// 服务端组件运行在 Node 里，没有浏览器的 location 上下文，
// 用相对路径 fetch('/api/todos') 会报 Invalid URL。
function getTodos() {
  return loadTodos();
}

export default function Home() {
  const todos = getTodos();

  return (
    <main style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h1>Todo 清单 Next.js App Router</h1>
      {/* 表单、点击操作全部交给客户端组件 */}
      <TodoActions 
        initTodos={todos} 
      />
    </main>
  );
}