// app/articles/page.tsx
// 服务端组件，直接从共享数据层读取文章列表
import { getArticles } from "../../lib/articles-data";

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <main style={{ maxWidth: "600px", margin: "30px auto", padding: "0 16px" }}>
      <h1>文章列表</h1>
      <p style={{ color: "#777" }}>共 {articles.length} 篇文章</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {articles.map((article) => (
          <li
            key={article.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: "12px 16px",
              margin: "12px 0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>{article.title}</h2>
              <span style={{ color: "#999", fontSize: 12 }}>{article.createdAt}</span>
            </div>
            <p style={{ color: "#555", margin: "8px 0 0", lineHeight: 1.6 }}>
              {article.summary}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
