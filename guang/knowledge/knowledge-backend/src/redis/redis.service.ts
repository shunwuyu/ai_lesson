import { 
  Injectable, 
  // 当前模块销毁之前执行回调，用来做资源清理
  OnModuleDestroy 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
// **当前模块销毁之前执行回调**，用来做资源清理
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor(private readonly config: ConfigService) {
    const password = this.config.get<string>('REDIS_PASSWORD');
    // 初始化 Redis 客户端连接
    this.client = new Redis({
      host: this.config.get<string>('REDIS_HOST', 'localhost'),
      port: this.config.get<number>('REDIS_PORT', 6379),
      password: password || undefined,
      db: this.config.get<number>('REDIS_DB', 0),
      // 最大重试次数
      maxRetriesPerRequest: 3,
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds !== undefined) {
      await this.client.set(key, value, 'EX', ttlSeconds);
      return;
    }
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
