const sqlite3 = require('sqlite3').verbose();

// 打开数据库，如果不存在则会创建
const db = new sqlite3.Database('./mydatabase.db', async (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
//   await db.run(`CREATE TABLE IF NOT EXISTS employees
//    ( id INTEGER PRIMARY KEY, 
//     name TEXT, 
//     department TEXT, 
//     salary INTEGER )`)

    const sample_data = [ (6, "黄佳", "销售", 50000), (7, "宁宁", "工程", 75000), (8, "谦谦", "销售", 60000), (9, "悦悦", "工程", 80000), (10, "黄仁勋", "市场", 55000)]
    // 插入数据
    const stmt = db.prepare(`INSERT INTO employees VALUES (?,?,?,?)`);
    for (let item of sample_data) {
      await stmt.run(`${item[0]}`,`${item[1]}`, `${item[2]}`, `${item[3]}`);
    }

    console.log(await db.all(`SELECT *FROM employees`))

    // for (let item of sample_data) {
    //     db.run('INSERT INTO employees VALUES (?, ?, ?, ?)', item)
    // }
    // db.run('INSERT INTO employees VALUES (?, ?, ?, ?)')
    // console.log(db.run('select * from employees'))
})