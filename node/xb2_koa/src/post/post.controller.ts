import type { Context } from 'koa';
import {
    getPostById,
} from './post.service';
/**
 * 单个内容
 */
export const show = async (
    ctx: Context,
    next
  ) => {
    // 准备数据
    const { postId } = ctx.params;
  
    // 调取内容
    try {
      const post = await getPostById(parseInt(postId, 10), {
      });
      console.log(post,'/////');
      // 做出响应
      ctx.body = post;
    } catch (error) {
        console.log(error);
        await  next(error)
    }
  };
  