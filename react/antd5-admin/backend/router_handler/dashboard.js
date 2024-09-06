const MenusModel = require('../model/menus')
const RolesModel = require('../model/roles')
const UsersModel = require('../model/users')

// 获取各实体数量
exports.getCount = async (req, res, next) => {
  const userCount = await UsersModel.count()
  const roleCount = await RolesModel.count()
  const menuCount = await MenusModel.count({where:{type:'M'}})
  const btnCount = await MenusModel.count({where:{type:'B'}})
  return res.send({
    code: 0,
    message: '获取成功',
    data: [
      { entity:'用户数',key:'user',value:userCount},
      { entity:'角色数',key:'role',value:roleCount},
      { entity:'菜单数',key:'menu',value:menuCount},
      { entity:'按钮数',key:'button',value:btnCount},
    ]
  })
}
