import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// @Global() 把模块标记为 全局模块 ：
// 它的 providers（如 PrismaService）
// 导出后，任何模块都能直接注入使用，
// 不用各自在 imports 里重复引入——
// 像全局公共设施，随取随用。
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
