'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Type = app.model.define('type', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(100),
    type: INTEGER,
    user_id: INTEGER
  });

  return Type;
};