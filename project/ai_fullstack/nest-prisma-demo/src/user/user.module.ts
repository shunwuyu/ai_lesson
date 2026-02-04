import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AIModule } from '../ai/ai.module'; 

@Module({
  imports: [AIModule], 
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
