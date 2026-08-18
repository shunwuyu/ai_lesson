import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: CreateUserDto) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(dto.password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: hashPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }
}
