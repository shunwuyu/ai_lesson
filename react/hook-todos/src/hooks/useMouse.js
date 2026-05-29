import { useState, useEffect } from 'react';

export const useMouse = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const update = (event) => {
      setX(event.pageX);
      setY(event.pageY);
    };

    window.addEventListener('mousemove', update);

    // 清理监听器（组件卸载时）
    return () => {
      window.removeEventListener('mousemove', update);
    };
  }, []); // 依赖数组为空，只在挂载/卸载时执行

  return { x, y };
};