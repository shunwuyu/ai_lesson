/**
 * 数据库迁移模块
 * 管理数据库 schema 变更
 */

const migrations = [
  {
    version: 1,
    name: 'create_users_table',
    up: `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
      );
      CREATE INDEX idx_users_email ON users(email);
    `,
    down: 'DROP TABLE IF EXISTS users;'
  },
  {
    version: 2,
    name: 'create_products_table',
    up: `
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100),
        inventory INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
      );
      CREATE INDEX idx_products_category ON products(category);
      CREATE INDEX idx_products_name ON products(name);
    `,
    down: 'DROP TABLE IF EXISTS products;'
  },
  {
    version: 3,
    name: 'create_orders_table',
    up: `
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      CREATE INDEX idx_orders_user ON orders(user_id);
      CREATE INDEX idx_orders_status ON orders(status);
    `,
    down: 'DROP TABLE IF EXISTS orders;'
  },
  {
    version: 4,
    name: 'create_order_items_table',
    up: `
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
      CREATE INDEX idx_order_items_order ON order_items(order_id);
    `,
    down: 'DROP TABLE IF EXISTS order_items;'
  }
];

/**
 * 运行向上迁移
 * @param {Database} db
 */
async function up(db) {
  // 确保迁移表存在
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      name VARCHAR(255),
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // 获取已执行的迁移
  const executed = await db.query(
    'SELECT version FROM schema_migrations ORDER BY version'
  );
  const executedVersions = new Set(executed.map(m => m.version));

  // 执行待执行的迁移
  for (const migration of migrations) {
    if (!executedVersions.has(migration.version)) {
      console.log(`Running migration: ${migration.name}`);
      await db.query(migration.up);
      await db.query(
        'INSERT INTO schema_migrations (version, name) VALUES ($1, $2)',
        [migration.version, migration.name]
      );
      console.log(`Migration ${migration.name} completed`);
    }
  }
}

/**
 * 运行向下迁移（回滚最后一个）
 * @param {Database} db
 */
async function down(db) {
  const [last] = await db.query(
    'SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 1'
  );

  if (!last) {
    console.log('No migrations to rollback');
    return;
  }

  const migration = migrations.find(m => m.version === last.version);
  if (migration) {
    console.log(`Rolling back: ${migration.name}`);
    await db.query(migration.down);
    await db.query(
      'DELETE FROM schema_migrations WHERE version = $1',
      [migration.version]
    );
    console.log(`Rollback ${migration.name} completed`);
  }
}

/**
 * 获取迁移状态
 * @param {Database} db
 * @returns {object}
 */
async function status(db) {
  const executed = await db.query(
    'SELECT * FROM schema_migrations ORDER BY version'
  );

  return {
    executed: executed.length,
    pending: migrations.length - executed.length,
    migrations: migrations.map(m => ({
      ...m,
      executed: executed.some(e => e.version === m.version)
    }))
  };
}

module.exports = { up, down, status, migrations };