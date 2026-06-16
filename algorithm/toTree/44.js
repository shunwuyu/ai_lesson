const flatList = [
  { id: 1, name: '一级菜单A', parentId: 0 },
  { id: 2, name: '一级菜单B', parentId: 0 },
  { id: 3, name: '二级A-1', parentId: 1 },
  { id: 4, name: '三级A-1-1', parentId: 3 },
  { id: 5, name: '二级B-1', parentId: 2 },
];

function listToTree(list) {
  // reduce生成id映射表，自动带上children数组
  const nodeMap = list.reduce((map, item) => {
    map[item.id] = { ...item, children: [] };
    return map;
  }, {});

  // 筛选根节点，同时把子节点挂载到父节点
  return list.reduce((tree, item) => {
    const cur = nodeMap[item.id];
    const parent = nodeMap[item.parentId];
    if (parent) {
      parent.children.push(cur);
    } else {
      tree.push(cur);
    }
    return tree;
  }, []);
}

const tree = listToTree(flatList);
console.log(JSON.stringify(tree, null, 2));