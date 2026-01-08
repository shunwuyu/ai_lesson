import React, { useState } from 'react';

export default function Counter() {
  // data Model 
  // 
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}