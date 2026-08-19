import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiDiaryModule } from './ai-diary/ai-diary.module';
import { MilvusModule } from './milvus/milvus.module';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get<number>('MYSQL_PORT'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    AiDiaryModule,
    MilvusModule,
    EmbeddingModule,
  ],
})
export class AppModule {}