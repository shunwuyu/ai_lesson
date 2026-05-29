function DFS(node, target) {
  if (!node) return null;
  if (node.value === target) return node;
  for (let child of node.children) {
    const found = DFS(child, target);
    if (found) return found;
  }
  return null;
}