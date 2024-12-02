import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserCreateController {
    @Post()
    createUser() {
        return 'create user'
    }
}
