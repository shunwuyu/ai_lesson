import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule, PostsModule],
})
export class AppModule {}
