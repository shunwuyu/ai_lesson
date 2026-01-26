// posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // 假设你已全局注册 PrismaService
import { PostQueryDto } from './dto/post-query.dto';

// 被自动创建实例并注入到其他地方使用
@Injectable()
export class PostsService {
  // 全局注入的
  constructor(
    private prisma: PrismaService
  ) {}
  // 分页查询所有帖子
  async findAll(query: PostQueryDto) {
    const { page, limit } = query;
    const skip = ((page || 1) - 1) * (limit || 10);
    // 1. 并发执行：总数查询和列表查询
    const [total, posts] = await Promise.all([
      this.prisma.post.count(), // 总数
      this.prisma.post.findMany({ // 
        skip,
        take: limit,
        orderBy: { id: 'desc' }, // 如果有 createdAt 则用 createdAt
        include: {
          // 关联作者及其头像
          user: {
            select: {
              id: true,
              name: true,
              avatars: {
                select: { filename: true },
                take: 1, // 取得最新一个头像
              },
            },
          },
          // 关联标签
          tags: {
            select: {
              tag: {
                select: { name: true },
              },
            },
          },
          // 关联文件（图片）
          files: {
            where: { mimetype: { startsWith: 'image/' } },
            select: { filename: true }
          },
          // 聚合计数
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      }),
    ]);


    // 2. 数据转换处理（Map）
    const data = posts.map((post) => {
      return {
        id: post.id,
        title: post.title,
        // 简介：取内容前100字
        brief: post.content ? post.content.substring(0, 100) : '',
        // 发布时间 (假设使用 User 的创建时间作为演示，建议给 Post 加 createdAt)
        publishedAt: post.createdAt || null,
        user: {
          id: post.user?.id,
          name: post.user?.name,
          avatar: `http://localhost:3000/uploads/avatar/resized/${post.user?.avatars[0]?.filename}-small.jpg` || null,
        },
        tags: post.tags.map((t) => t.tag.name),
        totalLikes: post._count.likes,
        totalComments: post._count.comments,
        // 封面图：取第一张图片名
        thumbnail: `http://localhost:3000/uploads/resized/${post.files[0]?.filename}-thumbnail.jpg` || null,
        pics: post.files.map(
          file => `http://localhost:3000/uploads/resized/${file.filename}-medium.jpg`
        ) || []
      };
    });

    return {
      items: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / (limit || 10)),
      },
    };
  }
}