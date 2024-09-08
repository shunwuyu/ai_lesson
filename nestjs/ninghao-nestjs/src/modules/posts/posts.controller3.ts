import { Controller, Get, Req, Query, Headers, Param, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
// 路由前缀
@Controller('posts')
export class PostsController {
    //-----------
    private readonly demoService;
    constructor(demoService: DemoService) {
        this.demoService = demoService;
    }
    @Get()
    index() {
        return this.demoService.findAll()
    }
    @Get(':id') 
    show(@Param() params) {
        return {
            title: `title ${params.id}`
        }
    }

    // @Post()
    // store(@Body() body) {
    //     console.log(body)
    //     return {
    //         title: `title`
    //     }
    // }
    @Post()
    store(@Body() post:CreatePostDto) {
        this.demoService.create(post)
        return 'ok'
    }
}

