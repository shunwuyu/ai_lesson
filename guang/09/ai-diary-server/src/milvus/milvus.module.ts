import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MilvusService } from './milvus.service';

@Module({
  imports: [ConfigModule],
  providers: [MilvusService],
  exports: [MilvusService],
})
export class MilvusModule {}