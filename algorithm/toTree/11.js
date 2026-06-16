// 二叉树节点定义
function TreeNode(val, left, right) {
  this.val = val ?? 0;
  this.left = left ?? null;
  this.right = right ?? null;
}

// DFS 先序：根 -> 左 -> 右
function dfs(root, res = []) {
  if (!root) return res;
  res.push(root.val); // 访问根节点
  dfs(root.left, res); // 递归左子树
  dfs(root.right, res); // 递归右子树
  return res;
}