import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { redisClientProvider } from './redis-client.provider';

@Module({
  controllers: [TodosController],
  providers: [TodosService, redisClientProvider],
})
export class TodosModule {}
