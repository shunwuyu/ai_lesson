// app/todos/layout.tsx
import type { ReactNode } from "react";

export default function TodosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="todos-wrap" style={{ padding: "2rem" }}>
      <h2>Todos - 待办事项管理专区</h2>
      <hr />
      {children}
    </div>
  );
}
