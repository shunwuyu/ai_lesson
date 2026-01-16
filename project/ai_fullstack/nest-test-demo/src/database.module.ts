// src/database.module.ts
// 
import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// 加载 .env 文件（仅在非生产环境或未通过其他方式注入环境变量时需要）
dotenv.config();
// 让它成为全局模块 PG_CONNECTION
@Global()
@Module({
  // 模块提供的“服务清单”
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
  // 导出 PG_CONNECTION 连接池，使其他模块可以注入使用
  exports: ['PG_CONNECTION'],
})
export class DatabaseModule {}