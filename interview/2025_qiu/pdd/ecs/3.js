function postorderTraversal(root) {
    const result = [];
    
    function postorder(node) {
        if (node) {
            postorder(node.left);    // 遍历左子树
            postorder(node.right);   // 遍历右子树
            result.push(node.val);   // 访问根节点
        }
    }
    
    postorder(root);
    return result;
}

function postorderIter(root) {
  if (!root) return [];
  const res = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);
    if (node.left)  stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return res.reverse();
}
