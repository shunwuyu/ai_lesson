'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  async add(params) {
    const { ctx } = this;
    try {
      // 往 bill 表中，插入一条账单数据
      const result = await ctx.model.Bill.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params) {
    console.log(params, '////////');
    const { ctx, app } = this;
    try {
      let result = await ctx.model.Bill.update({
        ...params
      }, {
        where: {
          id: params.id,
          user_id: params.user_id
        }
      })
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      let result = await ctx.model.Bill.destroy({
        where: {
          id
        }
      }) 
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    let sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    // console.log(sql, '?????')
    try{
      const results = await ctx.model.query(sql, {
        // replacements: [100], // 使用 replacements 防止 SQL 注入
        type: ctx.app.Sequelize.QueryTypes.SELECT, // 指定查询类型
      });
      // console.log(results, '????/////////')
      return results
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;