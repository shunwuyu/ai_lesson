给两棵虚拟节点树（VNode Tree）：

oldTree：上一次渲染的结果

newTree：最新的结果

要输出一个补丁（patch）列表，描述如何把 DOM 从 oldTree 变成 newTree，用的操作最少。