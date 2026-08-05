// app/api/articles/route.js
import { getArticles, addArticle, deleteArticle } from "../../../lib/articles-data";

// GET 获取全部文章
export async function GET() {
  return Response.json(getArticles());
}

// POST 新增文章
export async function POST(request) {
  const body = await request.json();
  const newArticle = addArticle({
    title: body.title,
    summary: body.summary,
  });
  return Response.json(newArticle, { status: 201 });
}

// DELETE 删除文章
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const result = deleteArticle(id);
  return Response.json(result);
}
