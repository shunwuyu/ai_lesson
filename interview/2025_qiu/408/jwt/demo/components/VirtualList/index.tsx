// VirtualList.jsx
"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
/**
 * 虚拟滚动列表组件（Virtualized List）
 * 用于高效渲染大量数据列表，只渲染可视区域内的元素，提升性能。
 *
 * @param {Array} data - 完整的数据数组
 * @param {number} height - 容器高度（像素），决定可视区域大小
 * @param {number} itemHeight - 每一项的高度（假设为固定高度）
 * @param {Function} renderItem - 渲染每一项的函数，接收 item 和 index
 * @param {number} [overscan=2] - 预渲染上下额外的项数，防止快速滚动时白屏
 */
export default function VirtualList({
  data,
  height,
  itemHeight,
  renderItem,
  overscan = 2,
}) {
  // 引用容器 DOM 元素
  const containerRef = useRef(null);

  // 存储当前滚动的偏移量（scrollTop）
  const [scrollTop, setScrollTop] = useState(0);

  // 使用 RAF（requestAnimationFrame）节流滚动事件的标记
  // 防止 onScroll 频繁触发导致性能问题
  const tickingRef = useRef(false);

  // 列表总高度 = 项目数量 × 每项高度
  const totalHeight = data.length * itemHeight;

  // 可见区域能显示的项目数量（向上取整）+ 上下额外预渲染的项目数
  const visibleCount = Math.ceil(height / itemHeight) + 2 * overscan;
  
  /**
   * 滚动处理函数
   * 使用 requestAnimationFrame 实现滚动节流，避免频繁 setState
   */
  function onScroll(e) {
    const st = e.currentTarget.scrollTop; // 获取当前滚动位置

    // 如果尚未安排动画帧任务，则安排一次
    if (!tickingRef.current) {
      tickingRef.current = true;

      requestAnimationFrame(() => {
        setScrollTop(st); // 更新状态
        tickingRef.current = false; // 重置标记，允许下次触发
      });
    }
  }

  // 计算当前可视区域起始索引（考虑 overscan）
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);

  // 计算结束索引（不能超过数据长度）
  const endIndex = Math.min(data.length - 1, startIndex + visibleCount - 1);

  // 计算绝对偏移量，用于将可见项容器 translateY 到正确位置
  const offset = startIndex * itemHeight;

  // 提取当前需要渲染的可见项子集
  const visibleItems = data.slice(startIndex, endIndex + 1);
  console.log(endIndex);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{
        height, // 固定容器高度
        overflowY: 'auto', // 启用垂直滚动
        position: 'relative', // 为内部绝对定位提供参考
        willChange: 'transform', // 提示浏览器优化 transform 变化（性能优化）
      }}
    >
      {/* 占位 div：撑起整个滚动区域的高度 */}
      {/* 使得滚动条能正确反映整个列表长度 */}
      <div style={{ height: totalHeight, position: 'relative' }} />

      {/* 可见项的容器，通过 translateY 定位到正确位置 */}
      <div
        style={{
          position: 'absolute', // 脱离文档流，相对于父容器定位
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${offset}px)`, // 将内容“推”到起始位置
        }}
      >
        {/* 渲染当前可见的每一项 */}
        {visibleItems.map((item, i) => {
          const index = startIndex + i; // 真实索引（在整个 data 中的位置）

          return (
            <div
              key={item.id ?? index} // 优先使用 item.id 作为 key，否则回退到索引
              style={{
                height: itemHeight, // 固定高度
                boxSizing: 'border-box', // 确保 padding/border 不影响布局
              }}
              role="listitem" // ARIA 语义化：列表项
              aria-posinset={index + 1} // 当前项在列表中的位置（从1开始）
              aria-setsize={data.length} // 列表总项数
            >
              {renderItem(item, index)} {/* 调用传入的渲染函数 */}
            </div>
          );
        })}
      </div>
    </div>
  );
}