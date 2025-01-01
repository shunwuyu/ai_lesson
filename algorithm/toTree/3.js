const list = [
  { id: '1', title: '节点1', parentId: '' },
  { id: '1-1', title: '节点1-1', parentId: '1' },
  { id: '1-2', title: '节点1-2', parentId: '1' },
  { id: '2', title: '节点2', parentId: '' },
  { id: '2-1', title: '节点2-1', parentId: '2' }
];

/**
 * 将列表转换为树形结构的函数
 * @param {Array} list - 包含对象的列表，每个对象都有 id 和 parentId 属性
 * @returns {Array} - 转换后的树形结构列表
 */
function listToTree(list) {
  const map = {}; 
  const root = [];

  // 初始化哈希表
  list.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // 构建树
  list.forEach(item => {
    if (item.parentId) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      root.push(map[item.id]);
    }
  });

  return root;
}

console.log(listToTree(list))