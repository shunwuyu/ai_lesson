/**
 * 购物车服务
 * 包含边界条件 bug 供练习
 */

class CartService {
  constructor(db) {
    this.db = db;
  }

  /**
   * 获取购物车
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async getCart(userId) {
    const items = await this.db.query(
      `SELECT ci.*, p.name, p.price
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = $1`,
      [userId]
    );

    return {
      userId,
      items: items || [],
      total: this.calculateTotal(items)
    };
  }

  /**
   * 计算购物车总价
   *
   * @param {array} items
   * @returns {number}
   */
  calculateTotal(items) {
    // Handle null/undefined and non-array inputs
    if (!items || !Array.isArray(items)) {
      return 0;
    }

    return items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  /**
   * 添加商品到购物车
   * BUG: 没有检查商品是否存在
   *
   * @param {string} userId
   * @param {string} productId
   * @param {number} quantity
   */
  async addItem(userId, productId, quantity) {
    // BUG: 没有验证 productId 是否有效
    // 如果产品不存在，后续 getCart 会出问题

    // 检查是否已在购物车
    const existing = await this.db.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    if (existing && existing.length > 0) {
      // 更新数量
      await this.db.query(
        `UPDATE cart_items
         SET quantity = quantity + $3
         WHERE user_id = $1 AND product_id = $2`,
        [userId, productId, quantity]
      );
    } else {
      // 新增
      await this.db.query(
        `INSERT INTO cart_items (user_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [userId, productId, quantity]
      );
    }

    return this.getCart(userId);
  }

  /**
   * 更新商品数量
   * BUG: 允许负数数量
   *
   * @param {string} userId
   * @param {string} productId
   * @param {number} quantity
   */
  async updateQuantity(userId, productId, quantity) {
    // BUG: 没有检查 quantity 是否为正数
    // 负数数量会导致数据异常

    if (quantity === 0) {
      return this.removeItem(userId, productId);
    }

    await this.db.query(
      `UPDATE cart_items
       SET quantity = $3
       WHERE user_id = $1 AND product_id = $2`,
      [userId, productId, quantity]
    );

    return this.getCart(userId);
  }

  /**
   * 移除商品
   * @param {string} userId
   * @param {string} productId
   */
  async removeItem(userId, productId) {
    await this.db.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );

    return this.getCart(userId);
  }

  /**
   * 清空购物车
   * @param {string} userId
   */
  async clearCart(userId) {
    await this.db.query(
      'DELETE FROM cart_items WHERE user_id = $1',
      [userId]
    );

    return { userId, items: [], total: 0 };
  }

  /**
   * 应用优惠券
   * BUG: 浮点数精度问题
   *
   * @param {object} cart
   * @param {object} coupon
   * @returns {object}
   */
  applyCoupon(cart, coupon) {
    if (!coupon || !coupon.discount) {
      return cart;
    }

    // BUG: 浮点数计算会有精度问题
    // 例如: 100 * 0.1 = 10.000000000000002
    const discount = cart.total * coupon.discount;
    const newTotal = cart.total - discount;

    return {
      ...cart,
      discount,
      total: newTotal,  // 应该用 toFixed(2) 或使用整数运算
      couponApplied: coupon.code
    };
  }
}

module.exports = { CartService };