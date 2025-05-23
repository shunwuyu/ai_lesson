# 515. 在每个树行中找最大值

https://leetcode.cn/problems/find-largest-value-in-each-tree-row/description/

这是一个典型的二叉树层序遍历（BFS）问题：找出每一层的最大值。

- 使用 队列 进行层序遍历（广度优先搜索）
- 每一层遍历时记录最大值

## BFS
广度优先搜索（BFS）是一种图遍历算法，从根节点开始，逐层访问所有邻接节点，适用于最短路径和层级问题。

## DFS
深度优先搜索（DFS）是一种图遍历算法，通过递归或栈从根节点深入访问每个分支，适用于路径查找和回溯问题。


广度优先搜索（BFS）输出
BFS 从根节点开始，逐层访问每个节点。对于上述树，BFS 的输出顺序为：

      1
     / \
    2   3
   / \   \
  4   5   6
第一层：1
第二层：2, 3
第三层：4, 5, 6
BFS 输出: [1, 2, 3, 4, 5, 6]
深度优先搜索（DFS）输出
DFS 从根节点开始，尽可能深入每个分支，直到到达叶子节点，然后回溯。对于上述树，DFS 的输出顺序可以有多种方式，常见的有前序、中序和后序遍历。
前序遍历（根 -> 左 -> 右）:
输出顺序：1, 2, 4, 5, 3, 6
DFS 前序输出: [1, 2, 4, 5, 3, 6]
中序遍历（左 -> 根 -> 右）:
输出顺序：4, 2, 5, 1, 3, 6
DFS 中序输出: [4, 2, 5, 1, 3, 6]
后序遍历（左 -> 右 -> 根）:
输出顺序：4, 5, 2, 6, 3, 1
DFS 后序输出: [4, 5, 2, 6, 3, 1]
总结
BFS 输出: [1, 2, 3, 4, 5, 6]
DFS 前序输出: [1, 2, 4, 5, 3, 6]
DFS 中序输出: [4, 2, 5, 1, 3, 6]
DFS 后序输出: [4, 5, 2, 6, 3, 1]
这展示了 BFS 和 DFS 在遍历同一棵树时的不同输出。
