/**
 * 服务测试
 * 用于验证 bug 修复
 */

const { UserService } = require('../src/user-service');
const { CartService } = require('../src/cart-service');
const { OrderService } = require('../src/order-service');

// 模拟数据库
function createMockDb() {
  const data = {
    users: [
      { id: '1', name: 'Test User', email: 'test@example.com', points: 100 }
    ],
    products: [
      { id: 'p1', name: 'Product 1', price: 50 },
      { id: 'p2', name: 'Product 2', price: 30 }
    ],
    cart_items: [],
    orders: []
  };

  return {
    query: async (sql, params) => {
      console.log('Mock DB query:', sql.trim().substring(0, 50));
      // 简单的模拟实现
      if (sql.includes('SELECT * FROM users WHERE id')) {
        return data.users.filter(u => u.id === params[0]);
      }
      if (sql.includes('SELECT * FROM cart_items')) {
        return data.cart_items;
      }
      return [];
    }
  };
}

// 测试工具
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return { pass: true, name };
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    return { pass: false, name, error: error.message };
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message} Expected ${expected}, got ${actual}`);
  }
}

function assertType(value, type, message = '') {
  if (typeof value !== type) {
    throw new Error(`${message} Expected type ${type}, got ${typeof value}`);
  }
}

// 测试套件
console.log('\n=== Service Tests ===\n');

const results = [];

// UserService 测试
console.log('UserService:');
const mockDb = createMockDb();
const userService = new UserService(mockDb);

results.push(test('getUser returns user object', async () => {
  const user = await userService.getUser('1');
  if (!user) throw new Error('User should exist');
}));

// CartService 测试
console.log('\nCartService:');
const cartService = new CartService(mockDb);

results.push(test('calculateTotal handles null items', () => {
  // 这个测试会暴露 bug
  try {
    cartService.calculateTotal(null);
    throw new Error('Should have thrown');
  } catch (e) {
    if (e.message.includes('Cannot read')) {
      throw new Error('BUG: calculateTotal crashes on null input');
    }
  }
}));

results.push(test('calculateTotal handles empty array', () => {
  const total = cartService.calculateTotal([]);
  assertEqual(total, 0, 'Empty cart total should be 0.');
}));

results.push(test('calculateTotal computes correctly', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  const total = cartService.calculateTotal(items);
  assertEqual(total, 35, 'Total should be 10*2 + 5*3 = 35.');
}));

results.push(test('applyCoupon avoids floating point issues', () => {
  const cart = { total: 100, items: [] };
  const coupon = { code: 'TEST10', discount: 0.1 };
  const result = cartService.applyCoupon(cart, coupon);

  // 检查是否有浮点数精度问题
  const discountStr = result.discount.toString();
  if (discountStr.length > 10) {
    throw new Error(`BUG: Floating point issue. Discount = ${discountStr}`);
  }
}));

// OrderService 测试
console.log('\nOrderService:');
const orderService = new OrderService(mockDb, cartService, userService);

results.push(test('calculatePointsDiscount handles string input', () => {
  // 模拟数据库返回字符串
  const discount = orderService.calculatePointsDiscount('100', '200');
  assertType(discount, 'number', 'Discount should be a number.');
}));

results.push(test('formatCurrency handles string input', () => {
  const formatted = orderService.formatCurrency('10010');
  // 如果有 bug，这会返回 "$10010.00" 而不是合理的值
  console.log(`    Formatted: ${formatted}`);
}));

results.push(test('shipping fee calculation with string total', () => {
  // 模拟 total 是字符串的情况
  const total = '100';  // 字符串
  const shippingFee = total > 100 ? 0 : 10;
  const finalTotal = total + shippingFee;

  // 这会暴露字符串拼接 bug
  if (finalTotal === '10010') {
    throw new Error('BUG: String concatenation instead of addition');
  }
}));

// 汇总
console.log('\n=== Summary ===');
const passed = results.filter(r => r.pass).length;
const failed = results.filter(r => !r.pass).length;
console.log(`Total: ${results.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  console.log('\nFailed tests:');
  results.filter(r => !r.pass).forEach(r => {
    console.log(`  - ${r.name}: ${r.error}`);
  });
  process.exit(1);
}