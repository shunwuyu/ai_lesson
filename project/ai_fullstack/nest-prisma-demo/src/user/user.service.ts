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

    console.log(existingUser, '//////////////')

    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 哈希密码
    // bcrypt 算法对明文密码 password 进行哈希加密，其中 10 是计算强度
    // 最终生成一个安全的哈希字符串并赋值给 hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword,'??????')
    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return user;
  }
}
