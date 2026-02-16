/**
 * API 模块入口
 * HTTP 服务器和请求处理
 */

const routes = require('./routes');
const middleware = require('./middleware');

class ApiServer {
  constructor(config = {}) {
    this.port = config.port || process.env.PORT || 3000;
    this.host = config.host || '0.0.0.0';
    this.routes = [];
    this.middleware = [];
    this.server = null;
  }

  /**
   * 注册中间件
   * @param {function} fn
   */
  use(fn) {
    this.middleware.push(fn);
  }

  /**
   * 注册路由
   * @param {string} method
   * @param {string} path
   * @param {function} handler
   */
  route(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  /**
   * 启动服务器
   */
  async start() {
    // 注册默认中间件
    this.use(middleware.requestLogger);
    this.use(middleware.errorHandler);
    this.use(middleware.cors);

    // 注册路由
    routes.register(this);

    // 模拟启动 HTTP 服务器
    this.server = {
      listening: true,
      address: { port: this.port, address: this.host }
    };

    console.log(`API server started on ${this.host}:${this.port}`);
  }

  /**
   * 停止服务器
   */
  async stop() {
    if (this.server) {
      this.server.listening = false;
      this.server = null;
      console.log('API server stopped');
    }
  }

  /**
   * 处理请求（模拟）
   * @param {object} req
   * @returns {Promise<object>}
   */
  async handleRequest(req) {
    // 运行中间件
    for (const mw of this.middleware) {
      await mw(req, {}, () => {});
    }

    // 查找匹配的路由
    const route = this.routes.find(r =>
      r.method === req.method && this.matchPath(r.path, req.path)
    );

    if (!route) {
      return { status: 404, body: { error: 'Not found' } };
    }

    // 执行处理器
    const res = { status: 200, body: null };
    await route.handler(req, res);

    return res;
  }

  /**
   * 路径匹配（支持参数）
   * @param {string} pattern
   * @param {string} path
   * @returns {boolean}
   */
  matchPath(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return false;
    }

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) continue;
      if (patternParts[i] !== pathParts[i]) return false;
    }

    return true;
  }

  /**
   * 提取路径参数
   * @param {string} pattern
   * @param {string} path
   * @returns {object}
   */
  extractParams(pattern, path) {
    const params = {};
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const key = patternParts[i].slice(1);
        params[key] = pathParts[i];
      }
    }

    return params;
  }
}

module.exports = { ApiServer };