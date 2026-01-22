import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
