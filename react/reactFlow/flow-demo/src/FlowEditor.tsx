// FlowEditor.tsx
'use client';
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function FlowEditor() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', position: { x: 100, y: 100 }, data: { label: '起点' } },
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeId, setNodeId] = useState(2);

  // 处理连线
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // 添加节点
  const addNode = () => {
    const newId = String(nodeId);
    const newNode: Node = {
      id: newId,
      position: { x: 100 + nodeId * 50, y: 100 },
      data: { label: `节点 ${newId}` },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      { id: `e${nodeId - 1}-${newId}`, source: String(nodeId - 1), target: newId },
    ]);
    // 这种写法叫 函数式更新（Functional Update），它能确保你拿到的是 
    // 最新的、正确的状态值，避免因闭包导致的状态滞后问题。
    setNodeId((id) => id + 1);
  };

  // 删除最后一个节点
  const removeNode = () => {
    if (nodes.length <= 1) return;
    const lastNode = nodes[nodes.length - 1];
    setNodes((nds) => nds.slice(0, -1));
    setEdges((eds) => eds.filter((e) => e.target !== lastNode.id));
    setNodeId((id) => id - 1);
  };

  // ✅ 新增：处理点击节点，弹出输入框修改 label
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const newLabel = window.prompt('编辑节点名称:', node.data.label);
      if (newLabel !== null && newLabel.trim() !== '') {
        // 更新 nodes 状态：找到被点击的节点并更新其 label
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? { ...n, data: { ...n.data, label: newLabel } }
              : n
          )
        );
      }
    },
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={addNode} style={{ marginRight: 10 }}>
          ➕ 添加节点
        </button>
        <button onClick={removeNode}>➖ 删除节点</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        // 自动缩放并平移画布，使得所有节点都完整地显示在可视区域内
        fitView
        // ✅ 注册点击节点事件
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}