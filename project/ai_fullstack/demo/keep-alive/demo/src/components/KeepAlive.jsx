import React, { useState, useEffect } from 'react';

const KeepAlive = ({ activeId, children }) => {
  // 用于存储已经加载过的组件
  const [cache, setCache] = useState({});

  // 当 activeId 变化时，如果新组件不在缓存中，将其加入缓存
  useEffect(() => {
    if (!cache[activeId]) {
      setCache((prev) => ({
        ...prev,
        [activeId]: children,
      }));
    }
  }, [activeId, children, cache]);

  return (
    <>
      {Object.entries(cache).map(([id, component]) => (
        <div
          key={id}
          id={`keep-alive-${id}`}
          // 核心：如果是当前激活的 ID 则显示，否则隐藏但保留在 DOM 中
          style={{ display: id === activeId ? 'block' : 'none' }}
        >
          {component}
        </div>
      ))}
    </>
  );
};

export default KeepAlive;