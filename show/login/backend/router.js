const Router = require('koa-router');
const controller = require('./controller');

const router = new Router();

// 处理登录请求
router.post('/login', controller.login);

module.exports = router;