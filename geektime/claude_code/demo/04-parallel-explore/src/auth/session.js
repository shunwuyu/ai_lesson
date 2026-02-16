/**
 * 会话管理模块
 * 支持内存存储和 Redis 存储
 */

// 内存存储（开发用）
const memoryStore = new Map();

/**
 * 创建会话
 * @param {string} userId
 * @param {string} token
 */
async function create(userId, token) {
  const sessionKey = `session:${userId}`;
  const sessions = memoryStore.get(sessionKey) || [];

  sessions.push({
    token,
    createdAt: Date.now(),
    lastActivity: Date.now()
  });

  // 限制每个用户最多 5 个活跃会话
  if (sessions.length > 5) {
    sessions.shift();
  }

  memoryStore.set(sessionKey, sessions);
}

/**
 * 检查会话是否有效
 * @param {string} userId
 * @param {string} token
 * @returns {boolean}
 */
async function isValid(userId, token) {
  const sessionKey = `session:${userId}`;
  const sessions = memoryStore.get(sessionKey) || [];

  const session = sessions.find(s => s.token === token);
  if (!session) return false;

  // 检查会话是否超过 30 天不活跃
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  if (Date.now() - session.lastActivity > thirtyDays) {
    await invalidate(userId, token);
    return false;
  }

  // 更新最后活跃时间
  session.lastActivity = Date.now();
  return true;
}

/**
 * 更新会话 token
 * @param {string} userId
 * @param {string} oldToken
 * @param {string} newToken
 */
async function update(userId, oldToken, newToken) {
  const sessionKey = `session:${userId}`;
  const sessions = memoryStore.get(sessionKey) || [];

  const session = sessions.find(s => s.token === oldToken);
  if (session) {
    session.token = newToken;
    session.lastActivity = Date.now();
  }
}

/**
 * 使会话失效
 * @param {string} userId
 * @param {string} token
 */
async function invalidate(userId, token) {
  const sessionKey = `session:${userId}`;
  const sessions = memoryStore.get(sessionKey) || [];

  const filtered = sessions.filter(s => s.token !== token);
  memoryStore.set(sessionKey, filtered);
}

/**
 * 使用户的所有会话失效
 * @param {string} userId
 */
async function invalidateAll(userId) {
  const sessionKey = `session:${userId}`;
  memoryStore.delete(sessionKey);
}

/**
 * 获取用户的活跃会话数
 * @param {string} userId
 * @returns {number}
 */
async function getActiveCount(userId) {
  const sessionKey = `session:${userId}`;
  const sessions = memoryStore.get(sessionKey) || [];
  return sessions.length;
}

/**
 * 清理过期会话（定时任务）
 */
async function cleanup() {
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (const [key, sessions] of memoryStore.entries()) {
    const active = sessions.filter(s => now - s.lastActivity < thirtyDays);
    if (active.length === 0) {
      memoryStore.delete(key);
    } else {
      memoryStore.set(key, active);
    }
  }
}

module.exports = {
  create,
  isValid,
  update,
  invalidate,
  invalidateAll,
  getActiveCount,
  cleanup
};