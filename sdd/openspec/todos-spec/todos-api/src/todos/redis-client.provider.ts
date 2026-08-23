import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';
const DEFAULT_REDIS_URL = 'redis://localhost:6379';

export interface TodoRedisClient {
  hSet(key: string, field: string, value: string): Promise<number>;
  hGetAll(key: string): Promise<Record<string, string> | Map<string, string>>;
  hGet(key: string, field: string): Promise<string | undefined>;
  hDel(key: string, field: string): Promise<number>;
  disconnect(): Promise<void>;
}

export const redisClientProvider = {
  provide: REDIS_CLIENT,
  useFactory: async (): Promise<TodoRedisClient> => {
    const logger = new Logger('RedisClientProvider');
    const client = createClient({
      url: process.env.REDIS_URL ?? DEFAULT_REDIS_URL,
    });

    client.on('error', (error: Error) => {
      logger.error(`redis client error: ${error.message}`);
    });

    await client.connect();
    return client as unknown as TodoRedisClient;
  },
};
