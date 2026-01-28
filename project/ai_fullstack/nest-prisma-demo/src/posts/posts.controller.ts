// posts/posts.controller.ts
import { Controller, Get, Query,
  Post, UseGuards, Body, Req
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostQueryDto } from './dto/post-query.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query() query: PostQueryDto) {
    console.log(query);
    return this.postsService.findAll(query);
  }
  // UseGuards 是一个装饰器，用于在控制器或路由处理方法上应用守卫（Guard），
  // 以实现如身份验证、权限控制等逻辑。
  // JwtAuthGuard 会在路由处理方法createPost 前先执行
  // JwtAuthGuard 是 NestJS 中用于 JWT（JSON Web Token）身份认证 的守卫（Guard）
  // JWT 是一种基于 JSON 的轻量级跨域身份验证令牌，通过加密签名实现
  // 信息安全传递，无需服务端存储会话，可快速验证身份和携带非敏感业务信息。
  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Req() req,
  ) {
    const user = req.user;
    // console.log(user, "?????????");
    return this.postsService.createPost({
      title,
      content,
      userId: user.id,
    });
  }
}