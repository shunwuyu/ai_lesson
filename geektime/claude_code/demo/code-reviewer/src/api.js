/**
 * API 模块 - 故意包含不良实践供审查练习
 * WARNING: 这是教学示例，不要用于生产环境！
 */

const { login } = require('./auth');
const { db } = require('./database');

// 问题 1: 无速率限制
async function handleLogin(req, res) {
  const { username, password } = req.body;

  try {
    const result = await login(username, password);
    // 问题 2: 敏感信息在响应中
    res.json({
      success: true,
      data: result,
      serverInfo: {
        version: process.version,
        platform: process.platform,
        memory: process.memoryUsage()
      }
    });
  } catch (error) {
    // 问题 3: 详细的错误堆栈暴露
    res.status(400).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}

// 问题 4: 没有输入验证
async function handleSearch(req, res) {
  const { query, limit } = req.query;

  // 直接使用用户输入
  const results = await db.searchProducts(query, req.query.category);

  res.json({
    results: results,
    query: query,  // 问题 5: 反射型 XSS 风险
    count: results.length
  });
}

// 问题 6: 不安全的文件操作
async function handleUpload(req, res) {
  const { filename, content } = req.body;

  // 没有文件类型检查
  // 没有路径遍历保护
  const fs = require('fs');
  const path = '/uploads/' + filename;  // 可能的路径遍历

  fs.writeFileSync(path, content);

  res.json({ path: path });
}

// 问题 7: CORS 配置过于宽松
function setupCORS(app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
}

// 问题 8: 敏感端点无认证
async function handleAdminStats(req, res) {
  // 没有检查用户是否是管理员
  const stats = {
    totalUsers: 1000,
    revenue: 50000,
    activeSubscriptions: 500,
    internalMetrics: {
      dbConnections: 50,
      errorRate: 0.02,
      serverLoad: 0.75
    }
  };

  res.json(stats);
}

// 问题 9: 调试端点未移除
async function handleDebug(req, res) {
  res.json({
    env: process.env,  // 泄露环境变量
    config: require('./auth').SECRET_KEY,
    dbConfig: require('./database').DB_CONFIG
  });
}

// 问题 10: 不安全的重定向
async function handleRedirect(req, res) {
  const { url } = req.query;
  // 开放重定向漏洞
  res.redirect(url);
}

module.exports = {
  handleLogin,
  handleSearch,
  handleUpload,
  setupCORS,
  handleAdminStats,
  handleDebug,
  handleRedirect
};
