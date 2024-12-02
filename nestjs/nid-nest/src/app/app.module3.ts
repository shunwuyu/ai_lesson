import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
