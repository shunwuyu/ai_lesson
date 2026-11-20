import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
// 全局模块，提供 Redis 服务
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
