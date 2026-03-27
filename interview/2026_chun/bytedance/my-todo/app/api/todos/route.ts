import { NextResponse } from 'next/server';

// 1. 模拟数据库 (内存数组)
let todos = [
  { id: 1, text: '学习 Next.js API 路由', completed: true },
  { id: 2, text: '构建全栈应用', completed: false },
];

// 2. 处理 GET 请求：获取所有待办事项
export async function GET() {
  // 模拟一下网络延迟，让你感受到是在请求
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(todos);
}

// 3. 处理 POST 请求：创建新事项
export async function POST(request: Request) {
  const body = await request.json();
  const { text } = body;

  if (!text) {
    return NextResponse.json({ error: '内容不能为空' }, { status: 400 });
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// 4. 处理 DELETE 请求：删除事项
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少 ID' }, { status: 400 });
  }

  todos = todos.filter((todo) => todo.id !== Number(id));
  return NextResponse.json({ message: '删除成功' });
}