import type { Todo } from "@/app/todos/types";

// 内存临时存储
let todoList: Todo[] = [
  { id: 1, content: "学习App-Router", completed: false },
  { id: 2, content: "练习ESLint配置", completed: true },
];

export function getTodos(): Todo[] {
  return todoList;
}

export function addTodo(content: string): Todo {
  const newTodo: Todo = {
    id: Date.now(),
    content,
    completed: false,
  };
  todoList.push(newTodo);
  return newTodo;
}

export function updateTodo(id: number, completed: boolean): Todo | undefined {
  const target = todoList.find((item) => item.id === id);
  if (target) {
    target.completed = completed;
  }
  return target;
}

export function deleteTodo(id: number): void {
  todoList = todoList.filter((item) => item.id !== id);
}
