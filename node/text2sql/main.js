const sqlite3 = require('sqlite3').verbose();

// 打开数据库，如果不存在则会创建
const db = new sqlite3.Database('./mydatabase.db', async (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
  await db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    department TEXT NOT NULL, 
    salary INTEGER NOT NULL
);`)

    const sample_data = [ 
      {
        id: 6, 
        name: "黄佳",
        department: "销售",
        salary: 50000
      },
      {
        id: 7, 
        name: "宁宁",
        department: "工程",
        salary: 75000
      },
      {
        id: 8, 
        name: "谦谦",
        department: "销售",
        salary: 60000
      },
      {
        id: 9, 
        name: "悦悦",
        department: "工程",
        salary: 80000
      },
      {
        id: 10, 
        name: "黄仁勋",
        department: "市场",
        salary: 55000
      }
    ];
  

    for (let item of sample_data) {
        db.run('INSERT INTO employees VALUES (?, ?, ?, ?)', [item.id, item.name, item.department, item.salary])
    }
    // db.run('INSERT INTO employees VALUES (?, ?, ?, ?)')
    // console.log(db.run('select * from employees'))
})