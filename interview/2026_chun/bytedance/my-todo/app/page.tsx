import { revalidatePath } from 'next/cache';

// 定义数据类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// ==========================================
// 前端页面组件 (默认是 Server Component)
// ==========================================
export default async function Home() {
  // 🚀 关键点：在服务端直接 fetch 自己的 API
  // Next.js 会自动优化这个请求，避免额外的网络开销
  const res = await fetch('http://localhost:3000/api/todos', {
    // 确保每次请求都是最新的，不使用缓存
    cache: 'no-store', 
  });
  
  const todos: Todo[] = await res.json();

  // 定义服务端动作 (Server Action) - 处理表单提交
  async function createTodo(formData: FormData) {
    'use server';
    const text = formData.get('text') as string;
    
    // 调用我们自己的 API 来添加数据
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    revalidatePath('/'); // 告诉 Next.js 刷新页面数据
  }

  // 定义删除动作
  async function removeTodo(formData: FormData) {
    'use server';
    const id = Number(formData.get('id'));

    // 调用我们自己的 API 来删除数据
    await fetch(`http://localhost:3000/api/todos?id=${id}`, {
      method: 'DELETE',
    });

    revalidatePath('/');
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Next.js SSR + 独立 API
        </h1>

        <form action={createTodo} className="flex gap-2 mb-6">
          <input
            name="text"
            placeholder="要做点什么？"
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            添加
          </button>
        </form>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">暂无事项</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded border"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    className="w-5 h-5 cursor-pointer"
                    disabled
                  />
                  <span
                    className={`${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                
                <form action={removeTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button className="text-red-500 hover:text-red-700 text-sm font-bold">
                    删除
                  </button>
                </form>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}