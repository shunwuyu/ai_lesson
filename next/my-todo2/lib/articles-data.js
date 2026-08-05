let articles = [
  {
    id: 1,
    title: "初识 Next.js App Router",
    summary: "介绍 App Router 相比 Pages Router 的核心变化，以及服务端组件与客户端组件的区别。",
    createdAt: "2026-08-01",
  },
  {
    id: 2,
    title: "为什么服务端组件不能 fetch 相对路径",
    summary: "讲清楚 Server Component 运行在 Node，没有浏览器 location 上下文的坑。",
    createdAt: "2026-08-03",
  },
  {
    id: 3,
    title: "Next.js 共享数据层实战",
    summary: "演示如何用一个共享模块同时为服务端组件和 API 路由提供同一份内存数据。",
    createdAt: "2026-08-05",
  },
];
let nextId = 4;

export function getArticles() {
  return articles;
}

export function getArticleById(id) {
  return articles.find((a) => a.id === Number(id)) || null;
}

export function addArticle({ title, summary }) {
  const newArticle = {
    id: nextId++,
    title,
    summary,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  articles.push(newArticle);
  return newArticle;
}

export function deleteArticle(id) {
  articles = articles.filter((a) => a.id !== Number(id));
  return { ok: true };
}
