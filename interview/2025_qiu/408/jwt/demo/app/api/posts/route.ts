// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

async function getAuthenticatedUser(request: NextRequest) {
    try {
      // 1. 获取 Next.js 的 Cookie Store
      const cookieStore = (await import('next/headers')).cookies()
      
      // 2. 从 Cookie 中读取 'access_token'
      const accessToken = cookieStore.get('access_token')?.value
      
      // 3. 检查 Token 是否存在
      if (!accessToken) {
        return null // 没有 token，未授权
      }
  
      // 4. 使用 lib/jwt.ts 中的 verifyToken 函数验证 JWT
      const payload = await verifyToken(accessToken)
      if (!payload || typeof payload.userId !== 'number') {
        return null // token 无效或 payload 结构不正确
      }
  
      // 5. 根据 payload 中的 userId 查询数据库用户
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      })
  
      return user // 返回用户对象 (如果用户存在)，否则为 null
    } catch (error) {
      console.error('Authentication error (Cookie):', error)
      // 如果在读取 Cookie 或验证过程中发生意外错误，也视为未授权
      return null
    }
    // 注意：prisma.$disconnect() 不放在这里，因为函数可能在多个地方被调用，
    // 断开连接应该在 API 路由的 finally 块中统一处理。
  }

export async function GET() {
  try {
    // 获取已发布的文章列表
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { email: true } } }, // 包含作者邮箱
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, published } = await request.json()
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content required' }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        author: { connect: { id: user.id } }, // 关联作者
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}