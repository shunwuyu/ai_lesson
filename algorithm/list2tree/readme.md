# 列表转树

## 题目
扁平列表转树结构
```
const list = [
  { id: 1, parentId: 0, name: 'A' },
  { id: 2, parentId: 1, name: 'B' },
  { id: 3, parentId: 1, name: 'C' },
  { id: 4, parentId: 2, name: 'D' }
]
```
输出：树结构
```js
[
  {
    id: 1,
    parentId: 0,
    name: 'A',
    children: [
      {
        id: 2,
        parentId: 1,
        name: 'B',
        children: [
          { id: 4, parentId: 2, name: 'D' }
        ]
      },
      { id: 3, parentId: 1, name: 'C' }
    ]
  }
]
```

## 面试官真正想考什么?

- 表面：你会不会把 list 变成 tree, 实际在考
1. 数据结构理解能力
  - 能否抽象出 父子关系
  - 是否知道「树 = 节点 + children」
2. JS 基础是否扎实
  - 对 Array、Object 的熟练度
  - 引用类型是否理解
3. 时间复杂度意识

## 解法一
- 外层遍历每个节点
- 内层再找它的子节点
- 找到就塞进 children
```
function listToTree(list, parentId = 0) {
  const result = []

  list.forEach(item => {
    if (item.parentId === parentId) {
      const children = listToTree(list, item.id)
      if (children.length) {
        item.children = children
      }
      result.push(item)
    }
  })

  return result
}
```

可以使用es6 api

```
function listToTree(list, parentId = 0) {
  // 过滤当前父节点的子节点
  return list
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      // 递归查找子节点的子节点
      children: listToTree(list, item.id)
    }));
}
```

总结：
缺点：双层遍历 / 递归扫描
O(n^2)

## Map 优化
先把节点缓存起来，再一次性建立父子关系

- 用 Map / Object 存 id → node

- 遍历一次 list：
  - 找到父节点
  - 直接 parent.children.push(child)

- parentId === 0 的就是根节点

代码实现：
```
function listToTree(list) {
  const map = {}
  const result = []

  // 1. 建立 id -> node 映射
  list.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  // 2. 建立父子关系
  list.forEach(item => {
    const node = map[item.id]
    if (item.parentId === 0) {
      result.push(node)
    } else {
      map[item.parentId]?.children.push(node)
    }
  })

  return result
}

```
使用es6 api 优化
```
function listToTree(list, rootId = 0) {
  const nodeMap = new Map();
  const tree = [];

  // 1. 遍历数组，将节点存入 Map，同时初始化 children
  list.forEach(item => {
    nodeMap.set(item.id, { ...item, children: [] });
  });

  // 2. 遍历数组，建立父子关系
  list.forEach(item => {
    const node = nodeMap.get(item.id);
    if (item.parentId === rootId) {
      // 根节点直接加入树
      tree.push(node);
    } else {
      // 非根节点，找到父节点并添加到 children
      const parentNode = nodeMap.get(item.parentId);
      if (parentNode) parentNode.children.push(node);
    }
  });

  return tree;
}

// 测试
console.log(listToTree(list));
```

时间复杂度 O(n)
空间换时间 

## 这题在那些业务里出现？
- 菜单权限树
  ![](https://img1.baidu.com/it/u=3683754824,974449873&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=882)
- 组织架构
- 评论 / 回复
- 分类管理


