import express, { type Express} from 'express';
import cors from 'cors';
import { ALLOW_ORIGIN } from './app.config';
import { defaultErrorHandler } from './app.middleware';
import postRouter from '../post/post.router';

const app:Express = express();
/**
 * 处理 JSON
 */
app.use(express.json());
/**
 * 跨域资源共享
 */
app.use(
    cors({
      origin: ALLOW_ORIGIN,
      exposedHeaders: 'X-Total-Count',
    }),
);

app.use(
    postRouter,
)

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);
export default app;