const sqlite3 = require('sqlite3').verbose();

// 打开数据库文件
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error("数据库打开失败", err.message);
    } else {
        console.log('数据库打开成功');
    }
});

// 根据 id 查找员工记录的函数
const getEmployeeById = (id) => {
    const selectSQL = `SELECT * FROM employees WHERE id = ?`;
    
    db.get(selectSQL, [id], (err, row) => {
        if (err) {
            console.error("查询失败", err.message);
        } else {
            if (row) {
                console.log("查询到的员工记录:", row);
            } else {
                console.log(`没有找到 id 为 ${id} 的员工记录`);
            }
        }
    });
};

// 假设我们要查找 id 为 1 的员工
getEmployeeById(6);

const getEmployeesByDepartment = () => {
  const selectSQL = `SELECT * FROM employees ORDER BY department, id`;

  db.all(selectSQL, [], (err, rows) => {
      if (err) {
          console.error("查询失败", err.message);
      } else {
          if (rows.length > 0) {
              // 将员工按部门分组
              const groupedByDepartment = rows.reduce((result, employee) => {
                  const department = employee.department;
                  if (!result[department]) {
                      result[department] = [];
                  }
                  result[department].push(employee);
                  return result;
              }, {});

              console.log("按部门分组的员工记录:", groupedByDepartment);
          } else {
              console.log("没有员工记录");
          }
      }
  });
};

getEmployeesByDepartment()

const getEmployeeCountAndAvgSalaryByDepartment = () => {
  const selectSQL = `
      SELECT department, COUNT(id) AS employee_count, AVG(salary) AS average_salary
      FROM employees
      GROUP BY department
      ORDER BY department
  `;

  db.all(selectSQL, [], (err, rows) => {
      if (err) {
          console.error("查询失败", err.message);
      } else {
          if (rows.length > 0) {
              console.log("按部门分组的员工总数和平均工资:", rows);
          } else {
              console.log("没有员工记录");
          }
      }
  });
};
getEmployeeCountAndAvgSalaryByDepartment()
// 关闭数据库连接
db.close((err) => {
    if (err) {
        console.error("数据库关闭失败", err.message);
    } else {
        console.log("数据库关闭成功");
    }
});
