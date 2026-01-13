// src/database.module.ts
import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// 加载 .env 文件（仅在非生产环境或未通过其他方式注入环境变量时需要）
dotenv.config();

@Global()
@Module({
  providers: [
    {
      provide: 'PG_CONNECTION',
      useValue: new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432', 10),
      }),
    },
  ],
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}