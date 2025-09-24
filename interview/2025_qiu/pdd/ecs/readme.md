- 二叉树
  ```
  class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
  }
  ```
  思考递归和迭代的本质：递归=系统栈；迭代=自己维护栈/队列。

- 刷顺序
  前序(根→左→右) → 中序(左→根→右) → 后序(左→右→根) → 层序(BFS)
  每个顺序都刷递归和迭代两种解法。

- 
