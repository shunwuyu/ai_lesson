// ConditionalTree.tsx
import React from 'react'
import { TreeNode } from './NodeData'

interface ConditionalTreeProps<T> {
  data: T
  nodes: TreeNode<T>[]
}

export function ConditionalTree<T>({ data, nodes }: ConditionalTreeProps<T>) {
  // 递归渲染树节点
  const renderNodes = (nodes: TreeNode<T>[]): React.ReactNode => {
    return nodes.map(node => {
      // 判断节点条件
      if (node.condition && !node.condition(data)) return null

      return (
        <div key={node.id} style={{ marginLeft: 20 }}>
          {node.render(data)}
          {node.children && node.children.length > 0 && renderNodes(node.children)}
        </div>
      )
    })
  }

  return <>{renderNodes(nodes)}</>
}
