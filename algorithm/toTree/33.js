// 扁平列表数据
const flatList = [
  { id: 1, name: '一级菜单A', parentId: 0 },
  { id: 2, name: '一级菜单B', parentId: 0 },
  { id: 3, name: '二级A-1', parentId: 1 },
  { id: 4, name: '三级A-1-1', parentId: 3 },
  { id: 5, name: '二级B-1', parentId: 2 },
];

function listToTree(list) {
  const map = new Map();
  const tree = [];

  // 第一步：所有节点存入map，初始化children
  list.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  // 第二步：每个节点找自己的父节点，挂载到父节点children
  list.forEach(item => {
    const current = map.get(item.id);
    const parent = map.get(item.parentId);
    if (parent) {
      // 有父级，作为子节点放入父节点
      parent.children.push(current);
    } else {
      // 无父级，顶级节点，放进根树
      tree.push(current);
    }
  });

  return tree;
}

const resultTree = listToTree(flatList);
console.log(JSON.stringify(resultTree, null, 2));