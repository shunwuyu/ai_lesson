import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const { name, password } = registerDto;

    // 判断用户名是否已经存在
    const existUser = await this.prisma.user.findUnique({
      where: { name },
    });
    if (existUser) {
      throw new BadRequestException('该用户名已被注册');
    }

    // 密码加密 盐 rounds=10
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // 代表 2¹⁰ 次 = **1024 轮哈希运算**
    console.log(hashPassword);
    // 创建用户入库
    const newUser = await this.prisma.user.create({
      data: {
        name,
        password: hashPassword,
      },
      // 返回的时候不要返回密码字段
      select: {
        id: true,
        name: true,
      },
    });
    return newUser;
  }
}
