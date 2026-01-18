import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  // prisma 实例
  constructor(private prisma: PrismaService) {}

  async findUsers(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [list, total] = await Promise.all([
      // 用单数
      this.prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    const users = list.map(u => ({
      ...u,
      id: Number(u.id), // ⚠ 超过 2^53 -1 会丢精度
    }))

    return {
      users,
      total,
      page,
      pageSize,
    };
  }
}
