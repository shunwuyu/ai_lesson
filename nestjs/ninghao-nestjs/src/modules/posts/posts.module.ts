import { Controller, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DemoService } from './providers/demo/demo.service';
@Module({
    imports: [PostsModule],
    controllers: [PostsController],
    providers: [DemoService],
})
export class PostsModule {
}
