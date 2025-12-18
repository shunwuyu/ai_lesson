[source](https://juejin.cn/book/6844733800300150797/section/6844733800346288141)

# 树与二叉树

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b2706ab067~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)
- 丛图中看到了什么
一棵树只有一个树根（root）， 向上生长后，却可以伸展出无数的树枝(child)、树枝上会长出树叶(leaf)。
数据结构中的树,对世界中树的一层简化.
- 树根抽象为“根结点”
- 树枝抽象为“边”
- 树枝的两个端点抽象为“结点”
- 树叶抽象为“叶子结点”
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/15/1717d9e07221bb94~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

把这棵抽象后的树颠倒一下，就得到了计算机中的树结构：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b267f22329~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

## 关键概念
- 树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推。
- 结点和树的“高度”计算规则：叶子结点高度记为1，每向上一层高度就加1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。  
  层和高度是反过来的
- “度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是3。
- “叶子结点”：叶子结点就是度为0的结点。在上图中，最后一层的结点的度全部为0，所以这一层的结点都是叶子结点。

## 理解二叉树结构
- 满足一下要求
  - 它可以没有根结点，作为一棵空树存在
  - 如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树。
  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b275ab6309~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

    注意 二叉树不能被简单定义为每个结点的度都是2的树。
    普通的树并不会区分左子树和右子树，但在二叉树中，左右子树的位置是严格约定、不能交换的。

## 二叉树的编码实现
在 JS 中，二叉树使用对象来定义。它的结构分为三块：

- 数据域
- 左侧子结点（左子树根结点）的引用
- 右侧子结点（右子树根结点）的引用

在定义二叉树构造函数时，我们需要把左侧子结点和右侧子结点都预置为空：
 
```
// 二叉树结点的构造函数
function TreeNode(val) {
    this.val = val;
    // 先 this.right = null，再 this.left = null。
    this.left = this.right = null; // 从右向左赋值
}
```
新建一个二叉树结点
```
const node  = new TreeNode(1)
```
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b26ae0d174~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)
构建一颗二叉树
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714e6b268b61522~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)