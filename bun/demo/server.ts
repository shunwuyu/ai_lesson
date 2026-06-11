// 内存数据存储
// 接口 定义数据结构
interface Todo {
  id: string;
  title: string;=
  completed: boolean;
  createdAt: Date;
}

let todos: Todo[] = [
  {
    id: "1",
    title: "学习 Bun",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "学习 Bun 框架",
    completed: false,
    createdAt: new Date(),
  },
];

// 启动服务
const server = Bun.serve({
  port: 3000,
  // 处理请求 req 是请求对象
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    // 工具：统一 JSON 响应
    const jsonResponse = (data: any, status = 200) =>
      // 格式化 JSON 响应 
      // 第二个参数： 传 数组 → 只序列化指定属性
      // 传 函数 → 自定义处理每个属性
      // 传 null → 不做任何处理，保留全部属性
      new Response(JSON.stringify(data, null, 2), {
        headers: { "Content-Type": "application/json" },
        status,
      });

    // --------------------------
    // GET /todos
    // --------------------------
    if (method === "GET" && url.pathname === "/todos") {
      return jsonResponse(todos);
    }

    // --------------------------
    // GET /todos/:id
    // --------------------------
    // startsWith 是es6 新增的方法
    if (method === "GET" && url.pathname.startsWith("/todos/")) {
      const id = url.pathname.split("/")[2];
      const todo = todos.find((t) => t.id === id);
      return todo ? jsonResponse(todo) : jsonResponse({ error: "不存在" }, 404);
    }

    // --------------------------
    // POST /todos
    // --------------------------
    if (method === "POST" && url.pathname === "/todos") {
      const { title } = await req.json();
      if (!title) return jsonResponse({ error: "title 不能为空" }, 400);

      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date(),
      };

      todos.push(newTodo);
      return jsonResponse(newTodo, 201);
    }

    // --------------------------
    // PUT /todos/:id
    // --------------------------
    if (method === "PUT" && url.pathname.startsWith("/todos/")) {
      const id = url.pathname.split("/")[2];
      const todo = todos.find((t) => t.id === id);
      if (!todo) return jsonResponse({ error: "不存在" }, 404);

      const { title, completed } = await req.json();
      if (title !== undefined) todo.title = title;
      if (completed !== undefined) todo.completed = completed;

      return jsonResponse(todo);
    }

    // --------------------------
    // DELETE /todos/:id
    // --------------------------
    if (method === "DELETE" && url.pathname.startsWith("/todos/")) {
      const id = url.pathname.split("/")[2];
      const index = todos.findIndex((t) => t.id === id);
      if (index === -1) return jsonResponse({ error: "不存在" }, 404);

      todos.splice(index, 1);
      return jsonResponse({ message: "删除成功" });
    }

    // 404
    return jsonResponse({ error: "路径不存在" }, 404);
  },
});

console.log(`Bun 服务运行在 http://localhost:${server.port}`);