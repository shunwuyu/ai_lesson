const Controller = require('egg').Controller;

class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
    await ctx.render('upload.html', {
      title: '我是尼克陈', // 将 title 传入 index.html
    });
  }
  async upload() {
    const { ctx } = this

    console.log('ctx.request.files', ctx.request.files)
  }
}

module.exports = UploadController;