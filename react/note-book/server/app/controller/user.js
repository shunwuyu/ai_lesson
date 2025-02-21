// controller/user.js
'use strict';

const Controller = require('egg').Controller;
const bcrypt = require('bcrypt');
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body; // 获取注册需要的参数
    // console.log(username, password, '//////////////////');
    // return 
    // 判空操作
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空',
        data: null
      }
      return
    }

    // 验证数据库内是否已经有该账户名
    const userInfo = await ctx.service.user.getUserByName(username) // 获取用户信息

    // return
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null
      }
      return
    }
    // 对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // // return 
    const result = ctx.service.user.register({
      username,
      password: hashedPassword,
      avatar: defaultAvatar,
      ctime:  new Date().toLocaleDateString(),
      signature: '这个人很懒，什么都没有留下'
    }) // 注册
    // // console.log(result, '////////???????????????')
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }

  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象。
    const { ctx, app } = this;
    const { username, password } = ctx.request.body
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.service.user.getUserByName(username)

    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }
    
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);

    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && !isPasswordValid) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null
      }
      return
    }

    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      message: '登录成功',
      data: {
        token
      },
    };
  }

  // 验证方法
  async test() {
    const { ctx, app } = this;
    // 通过 token 解析，拿到 user_id
    const token = ctx.request.header.authorization; // 请求头获取 authorization 属性，值为 token
    // 通过 app.jwt.verify + 加密字符串 解析出 token 的值 
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 响应接口
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: {
        ...decode
      }
    }
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    // 通过 app.jwt.verify 方法，解析出 token 内的用户信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 通过 getUserByName 方法，以用户名 decode.username 为参数，从数据库获取到该用户名下的相关信息
    const userInfo = await ctx.service.user.getUserByName(decode.username)
    // userInfo 中应该有密码信息，所以我们指定下面四项返回给客户端
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar
      }
    }
  }

  // 修改用户信息
  async editUserInfo () {
   
    const { ctx, app } = this;
    // 通过 post 请求，在请求体中获取签名字段 signature
    const { signature = '' } = ctx.request.body

    try {
      let user_id
      const token = ctx.request.header.authorization;
      // 解密 token 中的用户名称
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // 通过 username 查找 userInfo 完整信息
      const userInfo = await ctx.service.user.getUserByName(decode.username)
      // 通过 service 方法 editUserInfo 修改 signature 信息。
      console.log(userInfo, '|||||||||||');
      const result = await ctx.service.user.editUserInfo(decode.username, signature);

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username
        }
      }
    } catch (error) {
      
    }
  }
}

module.exports = UserController;
