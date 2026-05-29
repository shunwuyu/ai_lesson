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

  
//   时间效率更高? 变 O(n) 为 O(1)

// 搞个栈（stack2）出来作为辅助
// 栈底到栈顶呈递减趋势的栈

// 取最小值：由于整个栈从栈底到栈顶递减，因此栈顶元素就是最小元素。
// 若有新元素入栈：判断是不是比栈顶元素还要小，否则不准进入 stack2。
// 若有元素出栈：判断是不是和栈顶元素相等，如果是的话，stack2 也要出栈。