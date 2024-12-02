import { Module } from '@nestjs/common';
import { UserCreateController } from './controllers/user-create.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './commands/create-user.command.handler';
@Module({
  imports: [CqrsModule], 
  controllers: [UserCreateController],
  providers: [
    CreateUserCommandHandler
  ],
})
export class UserCreateModule {}
