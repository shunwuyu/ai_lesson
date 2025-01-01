const list = [
  { id: '1', title: '节点1', parentId: '' },
  { id: '1-1', title: '节点1-1', parentId: '1' },
  { id: '1-2', title: '节点1-2', parentId: '1' },
  { id: '2', title: '节点2', parentId: '' },
  { id: '2-1', title: '节点2-1', parentId: '2' }
];

function buildTree(list, parentId = '') {
  return list
    .filter(item => item.parentId === parentId) // 找到所有当前parentId的子节点
    .map(item => ({
      ...item,
      children: buildTree(list, item.id) // 递归处理子节点
    }));
}

console.log(buildTree(list))