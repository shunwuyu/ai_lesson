import express, { Router} from 'express';
import * as postController from './post.controller';
const router:Router = express.Router();

/**
 * 内容列表
 */
router.get(
    '/posts',
    // sort,
    // filter,
    // paginate(POSTS_PER_PAGE),
    postController.index,
  );
  

/**
 * 导出路由
 */
export default router;