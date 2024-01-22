class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }
  
    getLeftChildIndex(index) {
      return index * 2 + 1;
    }
  
    getRightChildIndex(index) {
      return index * 2 + 2;
    }
  
    hasParent(index) {
      return this.getParentIndex(index) >= 0;
    }
  
    hasLeftChild(index) {
      return this.getLeftChildIndex(index) < this.heap.length;
    }
  
    hasRightChild(index) {
      return this.getRightChildIndex(index) < this.heap.length;
    }
  
    parent(index) {
      return this.heap[this.getParentIndex(index)];
    }
  
    leftChild(index) {
      return this.heap[this.getLeftChildIndex(index)];
    }
  
    rightChild(index) {
      return this.heap[this.getRightChildIndex(index)];
    }
  
    swap(index1, index2) {
      const temp = this.heap[index1];
      this.heap[index1] = this.heap[index2];
      this.heap[index2] = temp;
    }
  
    peek() {
      if (this.heap.length === 0) {
        return null;
      }
      return this.heap[0];
    }
  
    poll() {
      if (this.heap.length === 0) {
        return null;
      }
      const item = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
      return item;
    }
  
    add(item) {
      this.heap.push(item);
      this.heapifyUp();
    }
  
    heapifyUp() {
      let index = this.heap.length - 1;
      while (this.hasParent(index) && this.parent(index).val > this.heap[index].val) {
        const parentIndex = this.getParentIndex(index);
        this.swap(parentIndex, index);
        index = parentIndex;
      }
    }
  
    heapifyDown() {
      let index = 0;
      while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.rightChild(index).val < this.leftChild(index).val) {
          smallerChildIndex = this.getRightChildIndex(index);
        }
        if (this.heap[index].val < this.heap[smallerChildIndex].val) {
          break;
        } else {
          this.swap(index, smallerChildIndex);
        }
        index = smallerChildIndex;
      }
    }
  }
  
  function mergeKLists(lists) {
    // dummy 结点
    const result = new ListNode(-1);
    let current = result;
    
    const minHeap = new MinHeap();
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]) {
        minHeap.add(lists[i]);
      }
    }
    
    while (minHeap.peek()) {
      const node = minHeap.poll();
      current.next = new ListNode(node.val);
      current = current.next;
      
      if (node.next) {
        minHeap.add(node.next);
      }
    }
    
    return result.next;
  }
  