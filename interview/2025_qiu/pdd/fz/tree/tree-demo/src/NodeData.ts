// NodeData.ts
export interface TreeNode<T = any> {
  id: string | number
  condition?: (data: T) => boolean // 条件函数
  render: (data: T) => React.ReactNode // 渲染函数
  children?: TreeNode<T>[] // 子节点
}
