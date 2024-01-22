const User = require('./model');

module.exports = {
  async login(ctx) {
    const { username, password } = ctx.request.body;

    // 判断用户名和密码是否为空
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = { message: 'Username and password are required.' };
      return;
    }

    try {
      // 在这里可以使用User模型进行用户验证相关的操作，
      // 这里只是简单演示登录成功的情况
      const user = await User.findByUsername(username);
      if (user && user.password === password) {
        ctx.body = { message: 'Login success.' };
      } else {
        ctx.status = 401;
        ctx.body = { message: 'Invalid username or password.' };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'An error occurred. Please try again later.' };
    }
  }
};
