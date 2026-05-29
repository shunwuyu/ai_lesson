'use strict';

const Service = require('egg').Service;

class TypeService extends Service {

  // 获取标签列表
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'id, name, type, user_id';

    let user_id
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return
    user_id = decode.id

    // 使用参数化查询来防止SQL注入
    const sql = `
      SELECT ${QUERY_STR} 
      FROM type 
      WHERE user_id = :userId OR user_id = 0
    `;

    console.log(sql)

    try {
      const [results] = await ctx.model.query(sql, {
        type: app.Sequelize.QueryTypes.SELECT,
        replacements: {
          userId: user_id,
        },
      });
      return results;
    } catch(error) {
      console.log(error);
      return null;
    }

    // try {
    //   const result = await app.mysql.query(sql);
    //   return result;
    // } catch (error) {
    //   console.log(error);
    //   return null;
    // }
  }
}

module.exports = TypeService;