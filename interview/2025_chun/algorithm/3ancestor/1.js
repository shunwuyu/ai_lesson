/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// root 当前节点
// p q 目标节点
function lowestCommonAncestor(root, p, q) {
  // 基本情况：如果当前节点为空，或者等于目标节点p或q之一，则直接返回当前节点。
  if (root === null || root === p || root === q) {
    return root;
  }

  // 递归地在左子树和右子树中查找目标节点p和q。
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // 如果左右子树的递归调用都返回了非空值（即找到了p和q），则当前节点就是它们的最近公共祖先。
  if (left !== null && right !== null) {
    return root;
  }

  // Otherwise, return the non-null value from the two recursive searches.
  return left !== null ? left : right;
}