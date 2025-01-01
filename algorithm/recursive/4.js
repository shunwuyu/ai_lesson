/**
 * 深度遍历查找
 * @param {*} tree 树形数据
 * @param {*} target 想要查找的目标
 */
function DFS (tree, target) {
  // 模拟栈，管理结点
  let stack = [tree]
  while (stack.length) {
    // 栈顶节点出栈
    let node = stack.pop()
    // 查找到目标，退出
    if (node.value === target) {
      return target
    }
    if (node.children && node.children.length) {
      // 将候选顶点入栈，进行下一次循环
      stack.push(...node.children.reverse())
    }
  }
}
