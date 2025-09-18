import { useEffect, useRef } from 'react';

/**
 * 自定义 Hook：useInterval
 * @param {Function} callback - 每次触发的回调
 * @param {number|null} delay - 间隔时间(ms)，null 表示暂停
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存最新的回调，避免闭包陷阱
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 设置 interval
  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id); // 清理 interval
  }, [delay]);
}

export default useInterval;
