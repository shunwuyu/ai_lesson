function arrayToTree(items) {
    
    
    // 创建节点映射，便于快速查找
    const map = {};
    items.forEach(item => {
      map[item.id] = { ...item, children: [] };
    });
    
    // 构建树结构
    const tree = [];
    
    items.forEach(item => {
      if (item.pid === null) {
        // 找到根节点
        tree.push(map[item.id]);
      } else {
        // 将当前节点添加到父节点的children数组中
        map[item.pid]?.children.push(map[item.id]);
      }
    });
    
    return tree;
  }
  
  // 修复数据中的语法错误
  const flatItems = [
    {id: 2, pid: 1, name: 'B'},
    {id: 3, pid: 1, name: 'C'},
    {id: 1, pid: null, name: 'A'},  // 修复了原数据中的错误
    {id: 4, pid: 3, name: 'D'},
    {id: 5, pid: 3, name: 'E'}      // 修复了原数据中的错误
  ];
  // 测试
  const tree = arrayToTree(flatItems);
  console.log(JSON.stringify(tree, null, 2));