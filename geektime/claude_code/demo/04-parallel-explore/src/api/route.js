/**
 * 路由定义
 * 定义所有 API 端点
 */

/**
 * 注册所有路由
 * @param {ApiServer} app
 */
function register(app) {
  // 健康检查
  app.route('GET', '/health', async (req, res) => {
    res.body = { status: 'ok', timestamp: new Date().toISOString() };
  });

  // 认证相关
  app.route('POST', '/api/auth/login', handleLogin);
  app.route('POST', '/api/auth/logout', handleLogout);
  app.route('POST', '/api/auth/refresh', handleRefresh);

  // 用户相关
  app.route('GET', '/api/users/:id', getUser);
  app.route('PUT', '/api/users/:id', updateUser);
  app.route('DELETE', '/api/users/:id', deleteUser);

  // 产品相关
  app.route('GET', '/api/products', listProducts);
  app.route('GET', '/api/products/:id', getProduct);
  app.route('GET', '/api/products/search', searchProducts);

  // 订单相关
  app.route('GET', '/api/orders', listOrders);
  app.route('GET', '/api/orders/:id', getOrder);
  app.route('POST', '/api/orders', createOrder);
  app.route('PUT', '/api/orders/:id/status', updateOrderStatus);
}

// 认证处理器
async function handleLogin(req, res) {
  const { email, password } = req.body;
  // 实际会调用 AuthService
  res.body = { token: 'mock_token', user: { id: 1, email } };
}

async function handleLogout(req, res) {
  res.body = { success: true };
}

async function handleRefresh(req, res) {
  res.body = { token: 'new_mock_token' };
}

// 用户处理器
async function getUser(req, res) {
  const { id } = req.params;
  res.body = { id, name: 'Mock User', email: 'user@example.com' };
}

async function updateUser(req, res) {
  const { id } = req.params;
  res.body = { id, ...req.body, updated: true };
}

async function deleteUser(req, res) {
  res.body = { success: true };
}

// 产品处理器
async function listProducts(req, res) {
  const { category, limit = 20, offset = 0 } = req.query;
  res.body = {
    products: [],
    pagination: { limit, offset, total: 0 }
  };
}

async function getProduct(req, res) {
  const { id } = req.params;
  res.body = { id, name: 'Mock Product', price: 99.99 };
}

async function searchProducts(req, res) {
  const { q } = req.query;
  res.body = { results: [], query: q };
}

// 订单处理器
async function listOrders(req, res) {
  res.body = { orders: [], pagination: { limit: 20, offset: 0, total: 0 } };
}

async function getOrder(req, res) {
  const { id } = req.params;
  res.body = { id, status: 'pending', total: 199.99, items: [] };
}

async function createOrder(req, res) {
  res.status = 201;
  res.body = { id: 1, status: 'pending', ...req.body };
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  res.body = { id, status, updated: true };
}

module.exports = { register };