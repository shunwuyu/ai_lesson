function dfsPreOrderIter(root) {
  if (!root) return [];
  const stack = [root];
  const res = [];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    // 栈后进先出，先压右再压左
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return res;
}