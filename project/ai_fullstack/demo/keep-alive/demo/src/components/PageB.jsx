import * as React from 'react';

export default function PageB() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h2>Page B</h2>
      <button onClick={() => setCount(count + 1)}>
        count: {count}
      </button>
    </>
  );
}
