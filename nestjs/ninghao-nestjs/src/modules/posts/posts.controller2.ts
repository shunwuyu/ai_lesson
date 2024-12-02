import { Controller, Get, Req, Query, Headers, Param, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
// 路由前缀
@Controller('posts')
export class PostsController {
    @Get()
    // index() {
    //     // return 'posts';
    //     return [{
    //         title: 'posts'
    //     }]
    // }
    // index(@Req() request) {
    //     console.log(request.ip, request.hostname, request.method)
    //     return [{
    //                 title: 'posts'
    //     }]
    // }
    // index(@Query() query) {
    //     console.log(query)
    //     return [{
    //                         title: 'posts'
    //             }]
    // }
    // authrozation  x-hello
    index(@Headers('authorization') headers) {
            console.log(headers)
            return [{
                                title: 'posts'
                    }]
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
        console.log(post.title)
        return {
            title: `title`
        }
    }
}

