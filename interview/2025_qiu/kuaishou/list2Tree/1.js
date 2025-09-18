/**
 * 将平铺列表转换为树形结构
 * @param {Array} list - 平铺列表，每项必须有 id 和 parentId
 * @param {any} rootId - 根节点的 parentId 值
 * @returns {Array} 树形结构
 */
function listToTree(list, rootId = null) {
  const tree = [];
  const map = new Map();

  // 1. 将列表存入 Map，方便通过 id 快速查找
  list.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  // 2. 遍历列表，根据 parentId 构建树
  list.forEach(item => {
    const node = map.get(item.id);
    if (item.parentId === rootId) {
      // 根节点直接加入 tree
      tree.push(node);
    } else {
      const parentNode = map.get(item.parentId);
      if (parentNode) {
        // 将当前节点加入父节点的 children
        parentNode.children.push(node);
      }
    }
  });

  return tree;
}

// --- 使用示例 ---
const flatList = [
  { id: 1, parentId: null, name: 'A' },
  { id: 2, parentId: 1, name: 'B' },
  { id: 3, parentId: 1, name: 'C' },
  { id: 4, parentId: 2, name: 'D' },
  { id: 5, parentId: null, name: 'E' },
];

const tree = listToTree(flatList);
console.log(JSON.stringify(tree, null, 2));
