function invertTree(root) {
    if (root === null) {
        return null; // 基本情况：如果节点为空，返回 null
    }

    // 交换左右子树
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // 递归反转左右子树
    invertTree(root.left);
    invertTree(root.right);

    return root; // 返回反转后的根节点
}