import React, { useState } from 'react';

function expensiveComputation(num: number): number {
  console.log('Performing expensive computation...');
  return num * 2;
}

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [otherValue, setOtherValue] = useState<number>(0);

  const computedValue = expensiveComputation(count);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Computed Value: {computedValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherValue(otherValue + 1)}>Increment Other Value</button>
    </div>
  );
};

export default App;
