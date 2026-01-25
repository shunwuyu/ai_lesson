import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AIModule } from './ai/ai.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, PostsModule, AIModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
