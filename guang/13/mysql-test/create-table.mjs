import mysql from"mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function main() {
const connectionConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true, // 允许执行多条语句
  };

const connection = await mysql.createConnection(connectionConfig);

try {
    // 创建 database
    await connection.query(`CREATE DATABASE IF NOT EXISTS hello CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE hello;`);

    // 创建好友表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS friends (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        gender VARCHAR(10),                -- 性别
        birth_date DATE,                   -- 出生日期
        company VARCHAR(100),              -- 公司
        title VARCHAR(100),                -- 职位
        phone VARCHAR(20),                 -- 当前手机号
        wechat VARCHAR(50)                 -- 微信号
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 插入 demo 数据
    const insertSql = `
      INSERT INTO friends (
        name,
        gender,
        birth_date,
        company,
        title,
        phone,
        wechat
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      "王经理", // name
      "男", // gender
      "1990-01-01", // birth_date
      "字节跳动", // company
      "产品经理/产品总监", // title
      "18612345678", // phone
      "wangjingli2024", // wechat
    ];

    const [result] = await connection.execute(insertSql, values);
    console.log("成功创建数据库和表，并插入 demo 数据，插入ID：", result.insertId);
  } catch (err) {
    console.error("执行出错：", err);
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
console.error("脚本运行失败：", err);
});