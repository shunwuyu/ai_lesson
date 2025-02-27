/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  // CSRF（跨站请求伪造）是一种安全漏洞，攻击者通过它可以在未经用户同意的情况下，利用用户在目标网站的已登录状态执行非预期的操作。
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  config.view = {
    mapping: {'.html': 'ejs'}  //左边写成.html后缀，会自动渲染.html文件
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1740018070854_2354';

  // add your middleware config here
  config.middleware = [];
  // jwt 加salt
  config.jwt = {
    secret: 'Nick',
  };
  
  config.multipart = {
    mode: 'file',
    fileSize: '500kb'
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  exports.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: 'localhost',
    port: 3306,
    database: 'juejue_cost',
    username: 'root',
    password: 'Codingdream123',
    
    define: {
      timestamps: false, // 是否自动添加时间戳 (createdAt, updatedAt)
      underscored: true, // 是否将驼峰命名转换为下划线命名
      freezeTableName: true, // 禁止修改表名，默认情况下，Sequelize会自动将所有传递的模型名称转换为复数
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
