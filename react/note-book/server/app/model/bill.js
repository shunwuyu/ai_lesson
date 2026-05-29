'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Bill = app.model.define('bill', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pay_type: INTEGER,
    amount: STRING(100),
    date: STRING(100),
    type_id: INTEGER(100),
    type_name: STRING(100),
    user_id: INTEGER,
    remark: STRING(100)
  });

  return Bill;
};