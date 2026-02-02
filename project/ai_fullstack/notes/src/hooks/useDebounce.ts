import { useState, useEffect } from 'react';

/**
 * 防抖 Hook：延迟更新值，避免在短时间内频繁触发（如搜索输入、窗口调整等）
 * @param value 需要防抖的值（可以是任意类型）
 * @param delay 延迟时间（毫秒），在此时间内如果 value 再次变化，则重新计时
 * @returns 防抖后的值
 */
export function useDebounce<T>(value: T, delay: number): T {
  // 存储防抖后的值
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置定时器，在 delay 毫秒后更新防抖值
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函数：如果在 delay 时间内 value 再次变化，清除上一次的定时器（防抖核心）
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 当 value 或 delay 改变时，重新执行 effect

  return debouncedValue;
}