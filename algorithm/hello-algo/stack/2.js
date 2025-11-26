class ListNode {
    constructor(val, next = null) {
        this.val = val;      // 节点存储的值
        this.next = next;    // 指向下一个节点的引用
    }
}

class LinkedListStack {
  // 类的内部访问
//   Private Fields
  #stackPeek; // 将头节点作为栈顶
  #stkSize = 0; // 栈的长度

  constructor() {
      this.#stackPeek = null;
  }

  /* 获取栈的长度 */
//   类的实例属性中的“访问器属性”
  get size() {
      return this.#stkSize;
  }

  /* 判断栈是否为空 */
  isEmpty() {
      return this.size === 0;
  }

  /* 入栈 */
  push(num) {
      const node = new ListNode(num);
      node.next = this.#stackPeek;
      this.#stackPeek = node;
      this.#stkSize++;
  }

  /* 出栈 */
  pop() {
      const num = this.peek();
      this.#stackPeek = this.#stackPeek.next;
      this.#stkSize--;
      return num;
  }

  /* 访问栈顶元素 */
  peek() {
      if (!this.#stackPeek) throw new Error('栈为空');
      return this.#stackPeek.val;
  }

  /* 将链表转化为 Array 并返回 */
  toArray() {
      let node = this.#stackPeek;
      const res = new Array(this.size);
      for (let i = res.length - 1; i >= 0; i--) {
          res[i] = node.val;
          node = node.next;
      }
      return res;
  }
}


// 创建一个栈实例
const stack = new LinkedListStack();

// 入栈
stack.push(1);
stack.push(2);
stack.push(3);

console.log("栈大小:", stack.size);        // 输出: 3
console.log("栈顶元素:", stack.peek());    // 输出: 3

// 转为数组（从栈底到栈顶）
console.log("栈转数组:", stack.toArray()); // 输出: [1, 2, 3]

// 出栈
console.log("出栈:", stack.pop());         // 输出: 3
console.log("出栈:", stack.pop());         // 输出: 2
console.log("当前栈大小:", stack.size);    // 输出: 1

// 判断是否为空
console.log("是否为空:", stack.isEmpty()); // 输出: false

stack.pop(); // 弹出最后一个元素 1
console.log("弹出后是否为空:", stack.isEmpty()); // 输出: true

// 尝试对空栈操作
try {
    stack.peek();
} catch (e) {
    console.error("错误:", e.message); // 输出: 错误: 栈为空
}

try {
    stack.pop();
} catch (e) {
    console.error("错误:", e.message); // 输出: 错误: 栈为空
}