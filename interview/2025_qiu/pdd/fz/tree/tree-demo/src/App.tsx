// App.tsx
import React, { useState } from 'react'
import { ConditionalTree } from './ConditionalTree'
import { TreeNode } from './NodeData'

interface MyData {
  type: string
  value: number
}

const tree: TreeNode<MyData>[] = [
  {
    id: 1,
    condition: data => data.type === 'A',
    render: data => <div>类型 A：{data.value}</div>,
    children: [
      {
        id: 11,
        condition: data => data.value > 10,
        render: data => <div>值大于 10 的子节点</div>,
      },
    ],
  },
  {
    id: 2,
    condition: data => data.type === 'B',
    render: data => <div>类型 B：{data.value}</div>,
  },
]

export default function App() {
  const [data, setData] = useState<MyData>({ type: 'A', value: 15 })

  return (
    <div>
      <h2>条件树渲染示例</h2>
      <ConditionalTree data={data} nodes={tree} />

      <button onClick={() => setData({ type: 'A', value: 5 })}>改为 A，值=5</button>
      <button onClick={() => setData({ type: 'B', value: 20 })}>改为 B，值=20</button>
    </div>
  )
}
