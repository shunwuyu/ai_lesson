// 图的邻接表表示（对应题目中的图）
const graph = {
  A: ['B'],
  B: ['C', 'D', 'E'],
  C: [],
  D: [],
  E: ['F', 'G'],
  F: [],
  G: ['H', 'I'],
  H: [],
  I: []
};

/**
 * 递归版DFS
 * @param {Object} graph - 图的邻接表
 * @param {string} startNode - 起始节点（题目中是入口A）
 * @returns {Array} 深度优先的访问顺序
 */
function dfsRecursive(graph, startNode) {
  const visited = new Set(); // 标记已访问的节点
  const result = []; // 存储访问顺序

  // 递归函数：访问单个节点
  function dfs(node) {
    // 如果节点已访问，直接返回
    if (visited.has(node)) return;
    
    // 标记为已访问，并加入结果
    visited.add(node);
    result.push(node);
    
    // 递归访问当前节点的所有邻接节点
    for (const neighbor of graph[node]) {
      dfs(neighbor);
    }
  }

  // 从起始节点开始DFS
  dfs(startNode);
  return result;
}

const dfsResult = dfsRecursive(graph, 'A');
console.log("DFS访问顺序（入口A→出口I）：", dfsResult);