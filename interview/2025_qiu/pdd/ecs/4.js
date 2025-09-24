// 层序遍历（BFS）
// BFS（广度优先搜索）是一层一层地遍历，先访问起点，
// 然后访问其所有邻居，再访问邻居的邻居，像水波一样向外扩散。
// 用了队列
function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const len = queue.length;
    const level = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
