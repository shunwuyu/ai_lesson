import "dotenv/config";
// `pg` 数据库驱动，

import pg from "pg";
// Pool 本身是 连接池 ：像小区门口停着一排共享单车，
// 谁用谁骑，用完还回来，不必每人自买一辆（每次新建数据库连接）。
// 连接总数设了上限，全部被占用时，新请求就排队等别人用完归还，
// 拿到连接才能执行 SQL，避免瞬间创建海量连接压垮数据库。
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// 封装 pool 查询方法，接收 SQL 语句与参数，异步执行数据库查询并返回结果。
async function query(text, params) {
  return pool.query(text, params);
}

export { pool, query };
