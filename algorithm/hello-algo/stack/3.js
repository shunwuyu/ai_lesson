/* 基于数组实现的栈 */
class ArrayStack {
  // 私有属性
//   将 #stack 设置为私有属性是为了封装内部数据，防止外部直接访问或修改栈的底层数组
//   ，确保操作只能通过类提供的方法（如 push、pop）进行，从而保证栈的逻辑正确性和安全性。
  #stack;
  constructor() {
      this.#stack = [];
  }

  /* 获取栈的长度 */
  get size() {
      return this.#stack.length;
  }

  /* 判断栈是否为空 */
  isEmpty() {
      return this.#stack.length === 0;
  }

  /* 入栈 */
  push(num) {
      this.#stack.push(num);
  }

  /* 出栈 */
  pop() {
      if (this.isEmpty()) throw new Error('栈为空');
      return this.#stack.pop();
  }

  /* 访问栈顶元素 */
  top() {
      if (this.isEmpty()) throw new Error('栈为空');
      return this.#stack[this.#stack.length - 1];
  }

  /* 返回 Array */
  toArray() {
      return this.#stack;
  }
}