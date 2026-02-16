/**
 * 数据模型定义
 * 定义所有数据库表对应的模型
 */

/**
 * 初始化所有模型
 * @param {Database} db
 * @returns {object} 模型集合
 */
function init(db) {
  return {
    User: createUserModel(db),
    Product: createProductModel(db),
    Order: createOrderModel(db),
    OrderItem: createOrderItemModel(db)
  };
}

/**
 * 用户模型
 */
function createUserModel(db) {
  return {
    tableName: 'users',

    async findById(id) {
      const [user] = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return user;
    },

    async findByEmail(email) {
      const [user] = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return user;
    },

    async create(data) {
      const [user] = await db.query(
        `INSERT INTO users (email, password_hash, name, role)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [data.email, data.passwordHash, data.name, data.role || 'user']
      );
      return user;
    },

    async update(id, data) {
      const fields = Object.keys(data);
      const values = Object.values(data);
      const setClause = fields.map((f, i) => `${f} = $${i + 2}`).join(', ');

      const [user] = await db.query(
        `UPDATE users SET ${setClause}, updated_at = NOW()
         WHERE id = $1 RETURNING *`,
        [id, ...values]
      );
      return user;
    },

    async delete(id) {
      await db.query(
        'UPDATE users SET deleted_at = NOW() WHERE id = $1',
        [id]
      );
    }
  };
}

/**
 * 产品模型
 */
function createProductModel(db) {
  return {
    tableName: 'products',

    async findById(id) {
      const [product] = await db.query(
        'SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL',
        [id]
      );
      return product;
    },

    async findByCategory(category, { limit = 20, offset = 0 } = {}) {
      return db.query(
        `SELECT * FROM products
         WHERE category = $1 AND deleted_at IS NULL
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [category, limit, offset]
      );
    },

    async search(query, options = {}) {
      return db.query(
        `SELECT * FROM products
         WHERE name ILIKE $1 AND deleted_at IS NULL
         ORDER BY name
         LIMIT $2 OFFSET $3`,
        [`%${query}%`, options.limit || 20, options.offset || 0]
      );
    },

    async updateInventory(id, quantity) {
      const [product] = await db.query(
        `UPDATE products SET inventory = inventory + $2
         WHERE id = $1 RETURNING *`,
        [id, quantity]
      );
      return product;
    }
  };
}

/**
 * 订单模型
 */
function createOrderModel(db) {
  return {
    tableName: 'orders',

    async findById(id) {
      const [order] = await db.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
      );
      return order;
    },

    async findByUser(userId, options = {}) {
      return db.query(
        `SELECT * FROM orders
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, options.limit || 20, options.offset || 0]
      );
    },

    async create(data, items) {
      const trx = await db.beginTransaction();

      try {
        // 创建订单
        const [order] = await trx.query(
          `INSERT INTO orders (user_id, total, status)
           VALUES ($1, $2, 'pending')
           RETURNING *`,
          [data.userId, data.total]
        );

        // 创建订单项
        for (const item of items) {
          await trx.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price)
             VALUES ($1, $2, $3, $4)`,
            [order.id, item.productId, item.quantity, item.price]
          );
        }

        await trx.commit();
        return order;
      } catch (error) {
        await trx.rollback();
        throw error;
      }
    },

    async updateStatus(id, status) {
      const [order] = await db.query(
        `UPDATE orders SET status = $2, updated_at = NOW()
         WHERE id = $1 RETURNING *`,
        [id, status]
      );
      return order;
    }
  };
}

/**
 * 订单项模型
 */
function createOrderItemModel(db) {
  return {
    tableName: 'order_items',

    async findByOrder(orderId) {
      return db.query(
        `SELECT oi.*, p.name as product_name
         FROM order_items oi
         JOIN products p ON p.id = oi.product_id
         WHERE oi.order_id = $1`,
        [orderId]
      );
    }
  };
}

module.exports = { init };