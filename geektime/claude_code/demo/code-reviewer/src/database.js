/**
 * 数据库模块 - 故意包含安全问题供审查练习
 * WARNING: 这是教学示例，不要用于生产环境！
 */

// 问题 1: 硬编码数据库凭据
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'root123',  // 硬编码密码
  database: 'production_db'
};

class Database {
  constructor() {
    this.connection = null;
  }

  // 问题 2: SQL 注入漏洞
  async findUser(username) {
    // 直接拼接用户输入到 SQL 语句
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    return this.execute(query);
  }

  // 问题 3: 另一个 SQL 注入点
  async searchProducts(searchTerm, category) {
    // 多个注入点
    const query = `
      SELECT * FROM products
      WHERE name LIKE '%${searchTerm}%'
      AND category = '${category}'
      ORDER BY price
    `;
    return this.execute(query);
  }

  // 问题 4: 批量查询的 SQL 注入
  async getUsersByIds(ids) {
    // ids 数组直接拼接
    const query = `SELECT * FROM users WHERE id IN (${ids.join(',')})`;
    return this.execute(query);
  }

  // 问题 5: 不安全的删除操作
  async deleteUser(userId) {
    // 没有权限检查，没有软删除
    const query = `DELETE FROM users WHERE id = ${userId}`;
    return this.execute(query);
  }

  // 问题 6: 敏感数据日志
  async createUser(userData) {
    // 记录了密码到日志
    console.log('Creating user:', JSON.stringify(userData));

    const query = `
      INSERT INTO users (username, password, email)
      VALUES ('${userData.username}', '${userData.password}', '${userData.email}')
    `;
    return this.execute(query);
  }

  // 问题 7: 没有连接池，每次创建新连接
  async execute(query) {
    // 模拟执行
    console.log('Executing:', query);
    return [];
  }

  // 问题 8: 数据库备份暴露
  async backup() {
    const backupPath = '/tmp/db_backup_' + Date.now() + '.sql';
    // 备份到可预测的公共位置
    console.log('Backup created at:', backupPath);
    return backupPath;
  }
}

// 问题 9: 全局单例暴露配置
const db = new Database();
db.config = DB_CONFIG;

module.exports = { Database, db, DB_CONFIG };
