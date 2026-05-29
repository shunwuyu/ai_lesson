function largestValues(root) {
    if (!root) return [];
  
    const queue = [root];
    const result = [];
  
    while (queue.length > 0) {
      const levelSize = queue.length;
      let max = -Infinity;
  
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); // 出队
        max = Math.max(max, node.val); // 更新最大值
  
        if (node.left) queue.push(node.left); // 左子节点入队
        if (node.right) queue.push(node.right); // 右子节点入队
      }
  
      result.push(max);
    }
  
    return result;
  }
  