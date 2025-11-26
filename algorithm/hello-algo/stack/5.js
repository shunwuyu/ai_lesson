/**
 * 初始化你的栈结构
 * https://leetcode.cn/problems/min-stack/
 */
const MinStack = function() {
  this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 push 方法
MinStack.prototype.push = function(x) {
  this.stack.push(x)
};

/**
 * @return {void}
 */
// 栈的出栈操作，其实就是数组的 pop 方法
MinStack.prototype.pop = function() {
  this.stack.pop()
};

/**
 * @return {number}
 */
// 取栈顶元素，咱们教过的哈，这里我本能地给它一个边界条件判断（其实不给也能通过，但是多做不错哈）
MinStack.prototype.top = function() {
  if(!this.stack || !this.stack.length) {
      return 
  }
  return this.stack[this.stack.length - 1]
};

/**
 * 获取栈中的最小值
 * @return {number} 栈中当前所有元素的最小值
 */
MinStack.prototype.getMin = function() {
  // 初始化最小值为正无穷，确保任何数字都会比它小
  let minValue = Infinity;
  
  // 解构赋值，从当前实例中取出 stack 数组（即主栈）
  const { stack } = this;
  
  // 遍历栈中的每一个元素（从底到顶）
  for (let i = 0; i < stack.length; i++) {
      // 如果当前元素比已知的最小值还小，则更新最小值
      if (stack[i] < minValue) {
          minValue = stack[i];
      }
  }
  
  // 返回找到的最小值
  return minValue;
};
