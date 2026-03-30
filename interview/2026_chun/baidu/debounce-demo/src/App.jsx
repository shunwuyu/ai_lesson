import { useState, useEffect } from 'react';
import useDebounce from './useDebounce'; // 引入你封装的 Hook

function Demo() {
  const [value, setValue] = useState('');
  
  // 👇 对 value 做防抖
  const debouncedValue = useDebounce(value, 500);

  // 防抖后才执行
  useEffect(() => {
    console.log('防抖执行：', debouncedValue);
    // 这里可以发请求
  }, [debouncedValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Demo;