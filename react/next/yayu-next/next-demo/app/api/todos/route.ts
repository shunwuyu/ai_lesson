// app/api/todos/route.ts
import type { Todo } from "../../todos/types";

// 内存临时存储
let todoList: Todo[] = [
  { id: 1, content: "学习App-Router", completed: false },
  { id: 2, content: "练习ESLint配置", completed: true },
];

// 获取全部待办
export async function GET() {
  return Response.json(todoList);
}

// 添加待办
export async function POST(request: Request) {
  const body = await request.json();
  const newTodo: Todo = {
    id: Date.now(),
    content: body.content,
    completed: false,
  };
  todoList.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}

// 修改待办状态
export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const target = todoList.find((item) => item.id === id);
  if (target) {
    target.completed = completed;
  }
  return Response.json(target);
}

// 删除待办
export async function DELETE(request: Request) {
  const { id } = await request.json();
  todoList = todoList.filter((item) => item.id !== id);
  return Response.json({ msg: "删除成功" });
}
