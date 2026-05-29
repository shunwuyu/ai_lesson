[source](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/)

最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

最近  深度 

树的搜索 递归

通过遍历左右子树来找p和q。若p和q分别位于当前节点的两侧，或当前节点是p或q之一，则当前节点为LCA