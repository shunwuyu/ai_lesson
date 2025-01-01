[source](https://juejin.cn/book/6844733800300150797/section/6844733800346288142)

- 二叉树的各种姿势的遍历，是非常容易作为独立命题点来考察的
  - 递归遍历
    - 先序遍历
    - 中序遍历
    - 后序遍历
  - 迭代遍历
    - 层序遍历

- 为什么喜欢考？
  二叉树和“递归”两个命题

- 何为递归？
  函数Func(Type a,……)直接或间接调用函数本身，则该函数称为递归函数

- 为何树的遍历是递归？
  树是一种数据结构，本身就是递归定义的。
  - 它可以没有根结点，作为一棵空树存在
  - 如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树。

  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/14/17177af5d863f478~tplv-t2oaga2asx-jj-mark:3326:0:0:0:q75.awebp)

- 先序遍历
  https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/14/17177aac2aee4da6~tplv-t2oaga2asx-jj-mark:3326:0:0:0:q75.awebp

  https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714ec42acc57e04~tplv-t2oaga2asx-jj-mark:3326:0:0:0:q75.awebp

  二叉树的结构怎么表达？

  const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};


- 递归函数的编写要点
  - 递归式
    根结点 -> 左子树 -> 右子树
  - 递归边界
    递归边界，它指的是你什么时候停下来。

    // 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
    // 递归边界，root 为空
    if(!root) {
        return 
    }
     
    // 输出当前遍历的结点值
    console.log('当前遍历的结点值是：', root.val)  
    // 递归遍历左子树 
    preorder(root.left)  
    // 递归遍历右子树  
    preorder(root.right)
  }

  

