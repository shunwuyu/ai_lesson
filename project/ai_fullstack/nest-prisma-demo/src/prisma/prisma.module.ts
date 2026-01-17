import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 全局可以inject
@Module({
  providers: [PrismaService], // 提供PrismaService
  exports: [PrismaService], // 导出PrismaService
})
export class PrismaModule {}
