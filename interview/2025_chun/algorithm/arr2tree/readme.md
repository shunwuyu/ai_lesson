# 列表转树
const flatItems = [
    {id: 2, pid: 1, name: 'B'},
    {id: 3, pid: 1, name: 'C'},
    {id: 1, pid: null, name: 'A'},  // 修复了原数据中的错误
    {id: 4, pid: 3, name: 'D'},
    {id: 5, pid: 3, name: 'E'}      // 修复了原数据中的错误
  ];

  将扁平数组转换为树状结构