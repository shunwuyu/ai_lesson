function TreeNode(val, left = null, right = null) {
  this.val = val
  this.left = left
  this.right = right
}

function largestValuesPerLevel(root) {
  if (!root) return [0] // 根节点为空返回 [0]

  const res = []
  const queue = [root]

  while (queue.length) {
    const levelSize = queue.length
    let max = Number.NEGATIVE_INFINITY

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      max = Math.max(max, node.val)

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    // 如果某层没有节点 max 会是 -Infinity，此时返回 0
    res.push(max === Number.NEGATIVE_INFINITY ? 0 : max)
  }

  return res
}
