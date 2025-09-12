// HelloFlow.tsx
'use client';
import React from 'react';
// - ReactFlow：核心画布组件，用来渲染整个流程图
// 一个辅助组件，用于显示画布的网格背景
import ReactFlow, { Background } from 'reactflow';
// 引入 React Flow 的默认样式文件
import 'reactflow/dist/style.css';

export default function App() {
  // 节点定义
  const nodes = [
    // 节点唯一标识符
    // 节点在画布上的初始坐标（x 水平，y 垂直）
    // 节点携带的数据，通常用于显示文本或配置
    { id: '1', position: { x: 100, y: 100 }, data: { label: '开始节点' } },
    { id: '2', position: { x: 300, y: 100 }, data: { label: '结束节点' } },
  ];
  
  // 边定义（连线）
  // edges 数组定义了节点之间的连接关系（即箭头线）
  const edges = [
    { id: 'e1-2', source: '1', target: '2' },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        {/* 背景网格 */}
        <Background />
      </ReactFlow>
    </div>
  );
}
