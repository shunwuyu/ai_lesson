import { Module } from '@nestjs/common';
import { UserCreateModule } from './create/user-create.module';

@Module({
  imports: [UserCreateModule]
})
export class UserModule {}
