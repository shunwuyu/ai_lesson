/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.get('/', controller.home.index);
  router.get('/upload', controller.upload.index);
  router.get('/user/:id', controller.home.user);
  router.post('/add', controller.home.add);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  router.get('/api/user/test', _jwt, controller.user.test);
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.post('/api/upload', _jwt, controller.upload.upload); // 上传图片
};
