// DFS（深度优先搜索）是一条路走到黑，先沿着一个方向深入到底，再回溯探索其他分支。

function dfs(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        result.push(node.val);      // 访问当前节点
        traverse(node.left);        // 递归遍历左子树
        traverse(node.right);       // 递归遍历右子树
    }
    
    traverse(root);
    return result;
}