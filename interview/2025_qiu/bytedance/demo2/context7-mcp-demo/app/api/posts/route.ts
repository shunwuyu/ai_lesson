import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// 定义POST请求的数据结构
interface PostData {
  title: string;
  content?: string;
  category?: string;
  tags?: string;
  status?: 'draft' | 'published' | 'archived';
}

// POST /api/posts - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body: PostData = await request.json();

    // 验证必填字段
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // 准备插入数据
    const insertData = {
      title: body.title,
      content: body.content || '',
      category: body.category || '',
      tags: body.tags || '',
      status: body.status || 'draft'
    };

    // 执行插入查询
    const sql = `
      INSERT INTO posts (title, content, category, tags, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const params = [
      insertData.title,
      insertData.content,
      insertData.category,
      insertData.tags,
      insertData.status
    ];

    const result = await query(sql, params);

    // 返回成功响应
    return NextResponse.json({
      message: 'Post created successfully',
      id: (result as any).insertId,
      ...insertData
    }, { status: 201 });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/posts - 获取所有文章
export async function GET() {
  try {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    const posts = await query(sql);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
