import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [BookModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
