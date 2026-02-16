/**
 * 用户服务
 * 包含一个竞态条件 bug 供练习
 */

class UserService {
  constructor(db) {
    this.db = db;
    this.cache = new Map();
  }

  /**
   * 获取用户
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async getUser(userId) {
    // 先查缓存
    if (this.cache.has(userId)) {
      return this.cache.get(userId);
    }

    // 查数据库
    const user = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (user) {
      this.cache.set(userId, user);
    }

    return user;
  }

  /**
   * 更新用户积分
   * BUG: 竞态条件 - 并发调用时会丢失更新
   *
   * @param {string} userId
   * @param {number} points
   * @returns {Promise<object>}
   */
  async addPoints(userId, points) {
    // 1. 读取当前积分
    const user = await this.getUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // BUG: 这里存在竞态条件
    // 如果两个请求同时执行，它们会读到相同的 currentPoints
    // 然后各自计算 newPoints，导致其中一个更新被覆盖
    const currentPoints = user.points || 0;
    const newPoints = currentPoints + points;

    // 2. 更新积分
    await this.db.query(
      'UPDATE users SET points = $2 WHERE id = $1',
      [userId, newPoints]
    );

    // 3. 更新缓存
    user.points = newPoints;
    this.cache.set(userId, user);

    return { userId, oldPoints: currentPoints, newPoints };
  }

  /**
   * 正确的实现应该使用原子操作：
   * UPDATE users SET points = points + $2 WHERE id = $1
   */

  /**
   * 转移积分
   * BUG: 没有事务，部分失败会导致数据不一致
   *
   * @param {string} fromUserId
   * @param {string} toUserId
   * @param {number} points
   */
  async transferPoints(fromUserId, toUserId, points) {
    // BUG: 这两个操作不是原子的
    // 如果第一个成功、第二个失败，积分就凭空消失了
    await this.addPoints(fromUserId, -points);
    await this.addPoints(toUserId, points);

    return { from: fromUserId, to: toUserId, points };
  }

  /**
   * 批量获取用户
   * @param {string[]} userIds
   * @returns {Promise<object[]>}
   */
  async getUsers(userIds) {
    const results = [];

    // BUG: N+1 查询问题
    for (const userId of userIds) {
      const user = await this.getUser(userId);
      if (user) {
        results.push(user);
      }
    }

    return results;
  }

  /**
   * 清除缓存
   * @param {string} userId
   */
  clearCache(userId) {
    if (userId) {
      this.cache.delete(userId);
    } else {
      this.cache.clear();
    }
  }
}

module.exports = { UserService };