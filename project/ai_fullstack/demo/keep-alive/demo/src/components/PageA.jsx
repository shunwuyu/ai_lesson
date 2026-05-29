import * as React from 'react';

export default function PageA() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h2>Page A</h2>
      <button onClick={() => setCount(count + 1)}>
        count: {count}
      </button>
    </>
  );
}

