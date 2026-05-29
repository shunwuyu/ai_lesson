import { useState, useEffect, useRef } from 'react';

/**
 * 防抖值 Hook：状态变化后，延迟 wait 毫秒才更新
 * 功能和 ahooks useDebounce 完全一致
 * @param {any} value - 要防抖的值
 * @param {number} wait - 延迟时间（毫秒）
 * @param {Object} options - 配置项
 * @param {boolean} [options.leading=false] - 是否立即执行
 * @param {boolean} [options.trailing=true] - 延迟结束后执行
 * @returns 防抖后的值
 */
export default function useDebounce(value, wait = 300, options = {}) {
  const { leading = false, trailing = true } = options;

  // 最终返回的防抖值
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 保存定时器 ID，保证多次调用能正确清除
  const timerRef = useRef(null);

  useEffect(() => {
    // 每次值变化，先清除上一个定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // ==================== leading：立即执行 ====================
    if (leading && timerRef.current === null) {
      setDebouncedValue(value);
    }

    // ==================== 延迟更新（尾部执行） ====================
    timerRef.current = setTimeout(() => {
      // 只有 trailing = true 才执行
      if (trailing) {
        setDebouncedValue(value);
      }
      // 执行完清空定时器
      timerRef.current = null;
    }, wait);

    // 组件卸载时清除定时器
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [value, wait, leading, trailing]);

  return debouncedValue;
}