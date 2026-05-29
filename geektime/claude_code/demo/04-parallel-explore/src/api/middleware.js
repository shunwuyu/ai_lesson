/**
 * 中间件模块
 * 定义通用的请求处理中间件
 */

/**
 * 请求日志中间件
 */
async function requestLogger(req, res, next) {
  const start = Date.now();

  // 记录请求开始
  console.log(`--> ${req.method} ${req.path}`);

  await next();

  // 记录请求结束
  const duration = Date.now() - start;
  console.log(`<-- ${req.method} ${req.path} ${res.status} ${duration}ms`);
}

/**
 * 错误处理中间件
 */
async function errorHandler(req, res, next) {
  try {
    await next();
  } catch (error) {
    console.error('Request error:', error.message);

    res.status = error.statusCode || 500;
    res.body = {
      error: error.message,
      code: error.code || 'INTERNAL_ERROR'
    };
  }
}

/**
 * CORS 中间件
 */
async function cors(req, res, next) {
  res.headers = res.headers || {};
  res.headers['Access-Control-Allow-Origin'] = '*';
  res.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

  if (req.method === 'OPTIONS') {
    res.status = 204;
    return;
  }

  await next();
}

/**
 * 认证中间件
 * @param {object} authService - 认证服务实例
 * @returns {function}
 */
function authenticate(authService) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw Object.assign(new Error('Missing or invalid authorization header'), {
        statusCode: 401,
        code: 'UNAUTHORIZED'
      });
    }

    const token = authHeader.slice(7);

    try {
      const payload = await authService.verifyToken(token);
      req.user = payload;
      await next();
    } catch (error) {
      throw Object.assign(new Error('Invalid or expired token'), {
        statusCode: 401,
        code: 'INVALID_TOKEN'
      });
    }
  };
}

/**
 * 权限检查中间件
 * @param {string} permission - 所需权限
 * @param {object} authService - 认证服务实例
 * @returns {function}
 */
function authorize(permission, authService) {
  return async (req, res, next) => {
    if (!req.user) {
      throw Object.assign(new Error('Authentication required'), {
        statusCode: 401,
        code: 'UNAUTHORIZED'
      });
    }

    if (!authService.hasPermission(req.user, permission)) {
      throw Object.assign(new Error('Insufficient permissions'), {
        statusCode: 403,
        code: 'FORBIDDEN'
      });
    }

    await next();
  };
}

/**
 * 请求体解析中间件
 */
async function bodyParser(req, res, next) {
  if (req.headers['content-type'] === 'application/json' && req.rawBody) {
    try {
      req.body = JSON.parse(req.rawBody);
    } catch (error) {
      throw Object.assign(new Error('Invalid JSON body'), {
        statusCode: 400,
        code: 'INVALID_JSON'
      });
    }
  }

  await next();
}

/**
 * 速率限制中间件
 * @param {object} options - 配置选项
 * @returns {function}
 */
function rateLimit(options = {}) {
  const { maxRequests = 100, windowMs = 60000 } = options;
  const requests = new Map();

  return async (req, res, next) => {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();

    // 清理过期记录
    const record = requests.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count++;
    requests.set(key, record);

    if (record.count > maxRequests) {
      throw Object.assign(new Error('Rate limit exceeded'), {
        statusCode: 429,
        code: 'RATE_LIMITED'
      });
    }

    await next();
  };
}

module.exports = {
  requestLogger,
  errorHandler,
  cors,
  authenticate,
  authorize,
  bodyParser,
  rateLimit
};