/**
 * 数据库模块入口
 * 管理数据库连接和查询
 */

const models = require('./models');
const migrations = require('./migrations');

class Database {
  constructor(config = {}) {
    this.config = {
      host: config.host || process.env.DB_HOST || 'localhost',
      port: config.port || process.env.DB_PORT || 5432,
      database: config.database || process.env.DB_NAME || 'app',
      user: config.user || process.env.DB_USER || 'postgres',
      password: config.password || process.env.DB_PASSWORD,
      poolSize: config.poolSize || 10
    };

    this.pool = null;
    this.models = null;
  }

  /**
   * 初始化数据库连接
   */
  async connect() {
    // 模拟连接池创建
    this.pool = {
      connections: [],
      maxSize: this.config.poolSize
    };

    // 初始化模型
    this.models = models.init(this);

    console.log(`Database connected: ${this.config.host}:${this.config.port}`);
  }

  /**
   * 关闭数据库连接
   */
  async disconnect() {
    if (this.pool) {
      this.pool = null;
      console.log('Database disconnected');
    }
  }

  /**
   * 执行原始查询
   * @param {string} sql - SQL 语句
   * @param {array} params - 参数
   * @returns {Promise<array>}
   */
  async query(sql, params = []) {
    if (!this.pool) {
      throw new Error('Database not connected');
    }

    // 模拟查询执行
    console.log('Executing:', sql, params);
    return [];
  }

  /**
   * 开始事务
   * @returns {Promise<Transaction>}
   */
  async beginTransaction() {
    const trx = new Transaction(this);
    await trx.begin();
    return trx;
  }

  /**
   * 运行迁移
   * @param {string} direction - 'up' 或 'down'
   */
  async migrate(direction = 'up') {
    if (direction === 'up') {
      await migrations.up(this);
    } else {
      await migrations.down(this);
    }
  }

  /**
   * 健康检查
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      await this.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }
}

/**
 * 事务类
 */
class Transaction {
  constructor(db) {
    this.db = db;
    this.active = false;
  }

  async begin() {
    await this.db.query('BEGIN');
    this.active = true;
  }

  async commit() {
    if (!this.active) throw new Error('No active transaction');
    await this.db.query('COMMIT');
    this.active = false;
  }

  async rollback() {
    if (!this.active) throw new Error('No active transaction');
    await this.db.query('ROLLBACK');
    this.active = false;
  }

  async query(sql, params) {
    if (!this.active) throw new Error('No active transaction');
    return this.db.query(sql, params);
  }
}

// 单例
let instance = null;

function getInstance(config) {
  if (!instance) {
    instance = new Database(config);
  }
  return instance;
}

module.exports = { Database, getInstance };