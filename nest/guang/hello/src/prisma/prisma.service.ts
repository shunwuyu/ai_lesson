import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // 启动时建立数据库连接
  async onModuleInit() {
    await this.$connect();
  }

  // 关闭时断开连接
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
