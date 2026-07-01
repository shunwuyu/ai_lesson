// Add two numbers and return the result
const add = (a, b) => a + b;

// Subtract b from a and return the result
const subtract = (a, b) => a - b;

// Test calls
console.log('1 + 2 =', add(1, 2));
console.log('-5 + 3 =', add(-5, 3));
console.log('0.1 + 0.2 =', add(0.1, 0.2));
console.log('5 - 3 =', subtract(5, 3));
console.log('10 - 20 =', subtract(10, 20));

module.exports = { add, subtract };
