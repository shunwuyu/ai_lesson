const moment = require('moment')
const Controller = require('egg').Controller;

class BillController extends Controller {
  async add() {
    const { ctx, app } = this;
    // 获取请求中携带的参数
    const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;
    // 判空处理，这里前端也可以做，但是后端也需要做一层判断。
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }

    try {
      let user_id
      const token = ctx.request.header.authorization;
      // 拿到 token 获取用户信息
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // 根据账单 id 和 user_id，修改账单数据
      // user_id 默认添加到每个账单项，作为后续获取指定用户账单的标示。
      // 可以理解为，我登录 A 账户，那么所做的操作都得加上 A 账户的 id，后续获取的时候，就过滤出 A 账户 id 的账单信息。
      const result = await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async update() {
    const { ctx, app } = this;

    const { id, amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;

    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }

    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      console.log(decode, '///////')
      if (!decode) return
      user_id = decode.id
      const result = await ctx.service.bill.update({
        id, // 账单 id
        amount, // 金额
        type_id, // 消费类型 id
        type_name, // 消费类型名称
        date, // 日期
        pay_type, // 消费类型
        remark, // 备注
        user_id // 用户 id
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async list() {
    const { ctx, app } = this;
    // 获取，日期 date，分页数据，类型 type_id，这些都是我们在前端传给后端的数据
    const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query
    try {
      let user_id
      // 通过 token 解析，拿到 user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // 拿到当前用户的账单列表
      const list = await ctx.service.bill.list(user_id)
      // console.log(list, '/////')
      // 过滤出月份和类型所对应的账单列表
      const _list = list.filter(item => {
        if (type_id != 'all') {
          return moment(Number(item.date)).format('YYYY-MM') == date && type_id == item.type_id
        }
        // console.log(moment(Number(item.date)).format('YYYY-MM'))
        return moment(Number(item.date)).format('YYYY-MM') == date
      })
      // console.log(_list, '?????????')
      // 格式化数据，将其变成我们之前设置好的对象格式
      let listMap = _list.reduce((curr, item) => {
        // curr 默认初始值是一个空数组 []
        // 把第一个账单项的时间格式化为 YYYY-MM-DD
        const date = moment(Number(item.date)).format('YYYY-MM-DD')
        // console.log(date)
        // 如果能在累加的数组中找到当前项日期 date，那么在数组中的加入当前项到 bills 数组。
        if (curr && curr.length && curr.findIndex(item => item.date == date) > -1) {
          const index = curr.findIndex(item => item.date == date)
          curr[index].bills.push(item)
        }

        // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
        if (curr && curr.length && curr.findIndex(item => item.date == date) == -1) {
          curr.push({
            date,
            bills: [item]
          })
        }

        if (!curr.length) {
          curr.push({
            date,
            bills: [item]
          })
        }
        return curr   
      }, []).sort((a, b) => moment(b.date) - moment(a.date)) // 时间顺序为倒叙，时间约新的，在越上面
      // console.log(listMap, '???')

      // 分页处理，listMap 为我们格式化后的全部数据，还未分页。
      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size)
      // console.log(filterListMap, '????')
      // 计算当月总收入和支出
      // 首先获取当月所有账单列表
      let __list = list.filter(item => moment(Number(item.date)).format('YYYY-MM') == date)
      // console.log(__list)
      
      let totalExpense = __list.reduce((curr, item) => {
        if (item.pay_type == 1) {
          curr += Number(item.amount)
          return curr
        }
        return curr
      }, 0)
      // console.log(totalExpense);

      // 累加计算收入
      let totalIncome = __list.reduce((curr, item) => {
        if (item.pay_type == 2) {
          curr += Number(item.amount)
          return curr
        }
        return curr
      }, 0)

      // console.log(totalIncome)

      // 返回数据
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalExpense, // 当月支出
          totalIncome, // 当月收入
          totalPage: Math.ceil(listMap.length / page_size), 
          list: filterListMap || [] // 格式化后，并且经过分页处理的数据
        }
      }

    } catch(err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async delete() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    console.log(id)

    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null
      }
    }

    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // console.log(user_id, '/////');
      const result = await ctx.service.bill.delete(id, user_id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null
      }
    } catch(err) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }

  async data() {
    const { ctx, app } = this;
    const { date = '' } = ctx.query;
    console.log(date, '/////')
    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      user_id = decode.id
      // 获取账单表中的账单数据
      const result = await ctx.service.bill.list(user_id);
      // 根据时间参数，筛选出当月所有的账单数据
      const start = moment(date).startOf('month').unix() * 1000; // 选择月份，月初时间
      const end = moment(date).endOf('month').unix() * 1000; // 选择月份，月末时间
      const _data = result.filter(item => {
        if (Number(item.date) > start && Number(item.date) < end) {
          return item
        }
      })
      // 总支出
      const total_expense = _data.reduce((arr, cur) => {
        if (cur.pay_type == 1) {
          arr += Number(cur.amount)
        }
        return arr
      }, 0)

      // 总收入
      const total_income = _data.reduce((arr, cur) => {
        if (cur.pay_type == 2) {
          arr += Number(cur.amount)
        }
        return arr
      }, 0)

      // 获取收支构成
      let total_data = _data.reduce((arr, cur) => {
        const index = arr.findIndex(item => item.type_id == cur.type_id)
        if (index == -1) {
          arr.push({
            type_id: cur.type_id,
            type_name: cur.type_name,
            pay_type: cur.pay_type,
            number: Number(cur.amount)
          })
        }
        if (index > -1) {
          arr[index].number += Number(cur.amount)
        }
        return arr
      }, [])

      total_data = total_data.map(item => {
        item.number = Number(Number(item.number).toFixed(2))
        return item
      })

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          total_expense: Number(total_expense).toFixed(2),
          total_income: Number(total_income).toFixed(2),
          total_data: total_data || [],
          // bar_data: bar_data || [] 
        }
      }

      console.log(total_expense, total_income)
    } catch(err) {
      console.log(err);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
}

module.exports = BillController;
