/**
 * 订单服务
 * 包含类型错误 bug 供练习
 */

class OrderService {
  constructor(db, cartService, userService) {
    this.db = db;
    this.cartService = cartService;
    this.userService = userService;
  }

  /**
   * 创建订单
   * BUG: 字符串和数字混用导致计算错误
   *
   * @param {string} userId
   * @param {object} options
   * @returns {Promise<object>}
   */
  async createOrder(userId, options = {}) {
    // 获取购物车
    const cart = await this.cartService.getCart(userId);

    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // BUG: cart.total 可能是字符串（从某些数据库返回）
    // 直接比较会导致逻辑错误
    // 例如: "100" > 50 为 true，但 "100" + 10 = "10010"
    const total = cart.total;

    // 应用配送费
    // BUG: 如果 total 是字符串，这里会变成字符串拼接而不是数字相加
    const shippingFee = total > 100 ? 0 : 10;
    const finalTotal = total + shippingFee;  // "100" + 10 = "10010"

    // 检查用户积分
    const user = await this.userService.getUser(userId);
    const pointsDiscount = this.calculatePointsDiscount(user.points, finalTotal);

    // 创建订单
    const order = await this.db.query(
      `INSERT INTO orders (user_id, subtotal, shipping_fee, discount, total, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [userId, total, shippingFee, pointsDiscount, finalTotal - pointsDiscount]
    );

    // 创建订单项
    for (const item of cart.items) {
      await this.db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    // 清空购物车
    await this.cartService.clearCart(userId);

    return order;
  }

  /**
   * 计算积分折扣
   * BUG: 没有类型转换
   *
   * @param {number|string} points
   * @param {number|string} total
   * @returns {number}
   */
  calculatePointsDiscount(points, total) {
    // BUG: points 可能是字符串
    // "100" / 10 = 10 (JavaScript 会自动转换)
    // 但 "100" > 0 的比较可能不符合预期

    if (!points || points <= 0) {
      return 0;
    }

    // 每 10 积分抵扣 1 元，最多抵扣订单金额的 10%
    const maxDiscount = total * 0.1;
    const pointsValue = points / 10;

    // BUG: Math.min 在字符串参与时行为异常
    return Math.min(pointsValue, maxDiscount);
  }

  /**
   * 获取订单
   * @param {string} orderId
   * @returns {Promise<object>}
   */
  async getOrder(orderId) {
    const [order] = await this.db.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );

    if (!order) {
      return null;
    }

    // 获取订单项
    const items = await this.db.query(
      `SELECT oi.*, p.name
       FROM order_items oi
       JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = $1`,
      [orderId]
    );

    return { ...order, items };
  }

  /**
   * 取消订单
   * BUG: 没有检查订单状态
   *
   * @param {string} orderId
   * @returns {Promise<object>}
   */
  async cancelOrder(orderId) {
    // BUG: 应该先检查订单状态
    // 已发货的订单不应该能取消

    await this.db.query(
      "UPDATE orders SET status = 'cancelled' WHERE id = $1",
      [orderId]
    );

    return this.getOrder(orderId);
  }

  /**
   * 格式化订单金额
   * @param {object} order
   * @returns {object}
   */
  formatOrderAmount(order) {
    return {
      ...order,
      subtotal: this.formatCurrency(order.subtotal),
      shipping_fee: this.formatCurrency(order.shipping_fee),
      discount: this.formatCurrency(order.discount),
      total: this.formatCurrency(order.total)
    };
  }

  /**
   * 格式化货币
   * BUG: 对字符串处理不当
   *
   * @param {number|string} amount
   * @returns {string}
   */
  formatCurrency(amount) {
    // BUG: 如果 amount 是字符串 "10010"，结果会是 "$10010.00"
    // 应该先转换为数字
    return `$${parseFloat(amount).toFixed(2)}`;
  }
}

module.exports = { OrderService };