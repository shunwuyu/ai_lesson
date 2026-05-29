// 递归
function preorder(root) {
  const res = [];
  (function dfs(node) {
    if (!node) return;
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  })(root);
  return res;
}

// 迭代（用栈）

function preorderIter(root) {
  if (!root) return [];
  const res = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    if (node.right) stack.push(node.right); // 先右后左保证左先出
    if (node.left)  stack.push(node.left);
  }
  return res;
}




