/**
 * 认证模块入口
 * 负责用户认证、授权、会话管理
 */

const jwt = require('./jwt');
const session = require('./session');

class AuthService {
  constructor(config = {}) {
    this.jwtSecret = config.jwtSecret || process.env.JWT_SECRET;
    this.sessionStore = config.sessionStore || 'memory';
    this.tokenExpiry = config.tokenExpiry || '24h';
  }

  /**
   * 用户登录
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(username, password) {
    // 1. 验证用户凭据
    const user = await this.validateCredentials(username, password);

    // 2. 生成 JWT token
    const token = jwt.sign({
      userId: user.id,
      role: user.role
    }, this.jwtSecret, { expiresIn: this.tokenExpiry });

    // 3. 创建会话
    await session.create(user.id, token);

    return { token, user: this.sanitizeUser(user) };
  }

  /**
   * 验证 token
   * @param {string} token
   * @returns {Promise<object>} 解码后的 payload
   */
  async verifyToken(token) {
    const payload = jwt.verify(token, this.jwtSecret);

    // 检查会话是否仍然有效
    const sessionValid = await session.isValid(payload.userId, token);
    if (!sessionValid) {
      throw new Error('Session expired or invalidated');
    }

    return payload;
  }

  /**
   * 用户登出
   * @param {string} userId
   * @param {string} token
   */
  async logout(userId, token) {
    await session.invalidate(userId, token);
  }

  /**
   * 刷新 token
   * @param {string} oldToken
   * @returns {Promise<string>} 新 token
   */
  async refreshToken(oldToken) {
    const payload = await this.verifyToken(oldToken);

    // 生成新 token
    const newToken = jwt.sign({
      userId: payload.userId,
      role: payload.role
    }, this.jwtSecret, { expiresIn: this.tokenExpiry });

    // 更新会话
    await session.update(payload.userId, oldToken, newToken);

    return newToken;
  }

  /**
   * 检查权限
   * @param {object} user
   * @param {string} permission
   * @returns {boolean}
   */
  hasPermission(user, permission) {
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'admin'],
      editor: ['read', 'write'],
      viewer: ['read']
    };

    const permissions = rolePermissions[user.role] || [];
    return permissions.includes(permission);
  }

  // 私有方法
  async validateCredentials(username, password) {
    // 实际实现会查询数据库
    throw new Error('Not implemented');
  }

  sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = { AuthService };