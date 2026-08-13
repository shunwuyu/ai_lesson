import { getTodos } from "@/lib/todos";
import TodosClient from "./todos-client";

export default function TodosPage() {
  const todos = getTodos();

  return <TodosClient initialTodos={todos} />;
}
