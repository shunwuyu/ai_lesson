/**
 * 初始化你的栈结构
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
// 栈的入栈操作，其实就是数组的 pop 方法
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
 * @return {number}
 */
// 按照一次遍历的思路取最小值
MinStack.prototype.getMin = function() {
    let minValue = Infinity  
    const  { stack } = this
    for(let i=0; i<stack.length;i++) {
        if(stack[i] < minValue) {
            minValue = stack[i]
        }
    }
    return minValue
};
