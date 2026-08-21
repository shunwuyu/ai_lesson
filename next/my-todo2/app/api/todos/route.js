// app/api/todos/route.js
import { getTodos, addTodo, toggleTodo, deleteTodo } from "../../../lib/todos-data";

// GET 获取全部todo
export async function GET() {
  return Response.json(getTodos());
}

// POST 新增todo
export async function POST(request) {
  const body = await request.json();
  const newTodo = addTodo(body.title);
  return Response.json(newTodo, { status: 201 });
}

// PATCH 修改完成状态
export async function PATCH(request) {
  const body = await request.json();
  const todo = toggleTodo(body.id, body.completed);
  return Response.json(todo);
}

// DELETE 删除todo
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const result = deleteTodo(id);
  return Response.json(result);
}