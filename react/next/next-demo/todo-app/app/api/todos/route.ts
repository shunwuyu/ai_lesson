import { NextResponse } from 'next/server';

// 内存存储
let todos: { id: number; text: string; completed: boolean }[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newTodo = {
    id: Date.now(),
    text: data.text,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const data = await request.json();
  todos = todos.map(todo => 
    todo.id === data.id ? { ...todo, completed: data.completed } : todo
  );
  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const data = await request.json();
  todos = todos.filter(todo => todo.id !== data.id);
  return NextResponse.json(todos);
}