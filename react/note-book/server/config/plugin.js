/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  ejs: {
    enable: true,
    package: 'egg-view-ejs'
  },
  mysql: {
    enable: true,
    package: 'egg-sequelize'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  }
};
