import { Request, Response, NextFunction } from 'express';
import {
  getPosts,
  getPostsTotalCount
} from './post.service'

export const index = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      // 统计内容数量
      const totalCount = await getPostsTotalCount({});
  
      // 设置响应头部
      response.header('X-Total-Count', totalCount);
    } catch (error) {
      next(error);
    }

    try {
      const posts = await getPosts({});
      response.send(posts);
    } catch (error) {
      next(error);
    }
}