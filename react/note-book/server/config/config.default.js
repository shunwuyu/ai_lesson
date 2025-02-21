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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123123',
      // 数据库名
      database: 'juejue_cost',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    delegate: 'mysql',
    driver: 'mysql2',
  };

  return {
    ...config,
    ...userConfig,
  };
};
