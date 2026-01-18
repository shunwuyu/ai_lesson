import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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

  async register(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    // 检查用户名是否已存在
    const existingUser = await this.prisma.user.findUnique({
      where: { name },
    });

    // console.log(existingUser, '//////////////')

    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, '??????')
    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  }
}
