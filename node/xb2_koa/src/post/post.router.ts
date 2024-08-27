import Router  from '@koa/router';

const router = new Router({ prefix: '/posts' });
import * as postController from './post.controller';

/**
 * 单个内容
 */
router.get('/:postId', postController.show);

/**
 * 导出路由
 */
export default router;