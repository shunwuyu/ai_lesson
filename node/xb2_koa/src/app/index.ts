import Koa from 'koa';
import cors from '@koa/cors';
import postRouter from '../post/post.router';
import { ALLOW_ORIGIN } from './app.config';
import { defaultErrorHandler } from './app.middleware';
/**
 * 创建应用
 */
const app = new Koa();

/**
 * 跨域资源共享
 */
app.use(
    cors({
      origin: ALLOW_ORIGIN,
    //   整个数据集大小
      exposedHeaders: 'X-Total-Count',
    }),
);

/**
 * 路由
 */

app.use(postRouter.routes());
app.use(postRouter.allowedMethods());

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);


/**
 * 导出应用
 */
export default app;
