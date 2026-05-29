// 构建一棵树
const tree = {
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        { value: 'D', children: [] },
        { value: 'E', children: [] }
      ]
    },
    {
      value: 'C',
      children: [
        { value: 'F', children: [] },
        { value: 'G', children: [] }
      ]
    }
  ]
};

// DFS 函数（你提供的）
function DFS(tree, target) {
  let stack = [tree];
  while (stack.length) {
    let node = stack.pop();
    if (node.value === target) {
      return node; // 返回整个节点，不仅仅是 value
    }
    // 因为栈后进先出，逆序入栈才能保证子节点按从左到右的顺序被访问。
    if (node.children && node.children.length) {
      stack.push(...node.children.reverse()); // 子节点逆序入栈，保证从左到右访问
    }
  }
  return null; // 没找到返回 null
}

// 调用示例
console.log(DFS(tree, 'F')); // 输出: { value: 'F', children: [] }
console.log(DFS(tree, 'X')); // 输出: null（没找到）