//  service/user.js
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 通过用户名获取用户信息
  async getUserByName(username) {
    const { ctx } = this;
    // console.log(app.mysql, '///////');
    // return ;
    // console.log(app.mysql.get('user', username))
    // console.log('------------------------')
    try {
      const result = await ctx.model.User.findOne({
        where: {
          username
        }
      });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async register(params) {
    const { ctx } = this;
    try {
      const result = await ctx.model.User.create(params);
      return result
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 修改用户信息
  async editUserInfo(username, signature) {
    const { ctx } = this;
    try {
      const user = await this.getUserByName(username);
      console.log(user, '|||||||||||');
      if (!user) {
        ctx.status = 404;
        return null;
      }
      console.log(user, '???????????????')
      // 通过 app.mysql.update 方法，指定 user 表，
      let result = await user.update({
        signature: signature, // 修改的字段
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
module.exports = UserService;
