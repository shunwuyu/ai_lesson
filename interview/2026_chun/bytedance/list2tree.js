/**
 * 将扁平数组转换为树形结构
 * @param {Array} list - 扁平的任务列表
 * @param {String} idKey - 唯一标识字段名，默认为 'id'
 * @param {String} parentKey - 父级标识字段名，默认为 'parentId'
 * @param {String} childrenKey - 子节点字段名，默认为 'children'
 * @returns {Array} - 树形结构数组
 */
function listToTree(list, idKey = 'id', parentKey = 'parentId', childrenKey = 'children') {
    const tree = [];
    const map = new Map();
  
    // 1. 第一步：将所有节点存入 Map，建立索引
    // 这样我们在查找父节点时，不需要遍历数组，直接 O(1) 就能拿到
    list.forEach(item => {
      // 这里我们要给每个节点预设一个 children 数组，方便后续直接 push
      map.set(item[idKey], { ...item, [childrenKey]: [] });
    });
  
    // 2. 第二步：遍历列表，构建父子关系
    list.forEach(item => {
      const nodeId = item[idKey];
      const parentId = item[parentKey];
      const node = map.get(nodeId);
  
      // 如果是根节点（parentId 为空、null、0 或 undefined），直接推入结果数组
      if (!parentId) {
        tree.push(node);
      } else {
        // 如果不是根节点，从 Map 中找到它的父节点，把自己塞进父节点的 children 里
        const parentNode = map.get(parentId);
        
        // 容错处理：防止数据脏了（父节点不存在的情况）
        if (parentNode) {
          parentNode[childrenKey].push(node);
        }
      }
    });
  
    return tree;
  }

  const tasks = [
    { id: 1, parentId: 0, name: '规划日本旅行' },
    { id: 2, parentId: 1, name: '行前准备' },
    { id: 3, parentId: 1, name: '大交通预订' },
    { id: 4, parentId: 2, name: '查签证政策' },
    { id: 5, parentId: 2, name: '查汇率' },
    { id: 6, parentId: 3, name: '搜机票' },
  ];
  
  const treeData = listToTree(tasks);
  console.log(JSON.stringify(treeData, null, 2));