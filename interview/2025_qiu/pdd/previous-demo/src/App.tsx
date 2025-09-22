import React, { useState } from 'react';
import { usePrevious } from './hooks/usePrevious';

export default function Demo() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>现在：{count}</p>
      <p>上一次：{prevCount ?? '无'}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
