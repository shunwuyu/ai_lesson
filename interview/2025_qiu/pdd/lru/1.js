class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // 哈希表：O(1) 查找节点
    this.head = new ListNode(null, null); // 虚拟头节点
    this.tail = new ListNode(null, null); // 虚拟尾节点
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // 获取缓存值
  get(key) {
    if (!this.map.has(key)) {
      return -1; // 未命中
    }
    const node = this.map.get(key);
    // 将该节点移到链表尾部（最新使用）
    this.moveToTail(node);
    return node.value;
  }

  // 设置缓存值
  put(key, value) {
    if (this.map.has(key)) {
      // 已存在：更新值并移到尾部
      const node = this.map.get(key);
      node.value = value;
      this.moveToTail(node);
    } else {
      // 新增节点
      const newNode = new ListNode(key, value);
      this.map.set(key, newNode);
      this.addToTail(newNode);

      // 超出容量，删除头部最老节点
      if (this.map.size > this.capacity) {
        const oldest = this.head.next;
        this.removeNode(oldest);
        this.map.delete(oldest.key);
      }
    }
  }

  // 删除链表中的节点
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // 添加节点到尾部
  addToTail(node) {
    const last = this.tail.prev;
    last.next = node;
    node.prev = last;
    node.next = this.tail;
    this.tail.prev = node;
  }

  // 将节点移动到尾部（最新使用）
  moveToTail(node) {
    this.removeNode(node);
    this.addToTail(node);
  }
}