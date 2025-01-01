class AutoExpandArrayQueue {
  #nums; // 用于存储队列元素的数组
  #front = 0; // 队首指针，指向队首元素
  #queSize = 0; // 队列长度

  constructor(capacity) {
      this.#nums = new Array(capacity);
  }

  /* 获取队列的容量 */
  get capacity() {
      return this.#nums.length;
  }

  /* 获取队列的长度 */
  get size() {
      return this.#queSize;
  }

  /* 判断队列是否为空 */
  isEmpty() {
      return this.#queSize === 0;
  }

  /* 扩容方法 */
  #expandCapacity() {
      const newCapacity = this.capacity * 2;
      const newArr = new Array(newCapacity);
      for (let i = 0; i < this.size; i++) {
          newArr[i] = this.#nums[(this.#front + i) % this.capacity];
      }
      this.#front = 0; // 重置队首指针
      this.#nums = newArr; // 更新为新数组
  }

  /* 入队 */
  push(num) {
      if (this.size === this.capacity) {
          this.#expandCapacity(); // 自动扩容
      }
      const rear = (this.#front + this.size) % this.capacity;
      this.#nums[rear] = num;
      this.#queSize++;
  }

  /* 出队 */
  pop() {
      if (this.isEmpty()) throw new Error('队列为空');
      const num = this.peek();
      this.#front = (this.#front + 1) % this.capacity;
      this.#queSize--;
      return num;
  }

  /* 访问队首元素 */
  peek() {
      if (this.isEmpty()) throw new Error('队列为空');
      return this.#nums[this.#front];
  }

  /* 返回 Array */
  toArray() {
      const arr = new Array(this.size);
      for (let i = 0, j = this.#front; i < this.size; i++, j++) {
          arr[i] = this.#nums[j % this.capacity];
      }
      return arr;
  }
}