const {
  add,
  subtract,
  multiply,
  divide,
  squareRoot,
  factorial
} = require('./calculator');

// 简单的测试框架
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

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, but got ${actual}`);
  }
}

function assertThrows(fn, expectedMessage) {
  try {
    fn();
    throw new Error(`Expected function to throw, but it didn't`);
  } catch (error) {
    if (expectedMessage && !error.message.includes(expectedMessage)) {
      throw new Error(`Expected error message to include "${expectedMessage}", but got "${error.message}"`);
    }
  }
}

// 测试套件
console.log('\n=== Calculator Tests ===\n');

const results = [];

console.log('Addition:');
results.push(test('adds two positive numbers', () => assertEqual(add(2, 3), 5)));
results.push(test('adds negative numbers', () => assertEqual(add(-2, -3), -5)));
results.push(test('adds zero', () => assertEqual(add(5, 0), 5)));

console.log('\nSubtraction:');
results.push(test('subtracts two numbers', () => assertEqual(subtract(5, 3), 2)));
results.push(test('handles negative result', () => assertEqual(subtract(3, 5), -2)));

console.log('\nMultiplication:');
results.push(test('multiplies two numbers', () => assertEqual(multiply(4, 3), 12)));
results.push(test('multiplies by zero', () => assertEqual(multiply(5, 0), 0)));

console.log('\nDivision:');
results.push(test('divides two numbers', () => assertEqual(divide(10, 2), 5)));
results.push(test('throws on division by zero', () => assertThrows(() => divide(5, 0), 'Division by zero')));

console.log('\nSquare Root:');
results.push(test('calculates square root', () => assertEqual(squareRoot(16), 4)));
results.push(test('handles zero', () => assertEqual(squareRoot(0), 0)));
results.push(test('throws on negative input', () => assertThrows(() => squareRoot(-1), 'negative')));

console.log('\nFactorial:');
results.push(test('calculates factorial of 5', () => assertEqual(factorial(5), 120)));
results.push(test('factorial of 0 is 1', () => assertEqual(factorial(0), 1)));
results.push(test('factorial of 1 is 1', () => assertEqual(factorial(1), 1)));
// 这个测试会暴露 bug：负数会导致无限递归
results.push(test('handles negative numbers gracefully', () => {
  // 期望抛出错误，但实际会栈溢出
  assertThrows(() => factorial(-1), 'negative');
}));

// 汇总结果
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