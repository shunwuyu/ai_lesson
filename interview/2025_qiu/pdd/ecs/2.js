function inorderIter(root) {
  const res = [], stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {          // 一路向左
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;       // 再处理右子树
  }
  return res;
}


function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);      // 遍历左子树
            result.push(node.val);   // 访问根节点
            inorder(node.right);     // 遍历右子树
        }
    }
    
    inorder(root);
    return result;
}