import React, { useState, useCallback } from 'react';

interface ButtonProps {
  handleClick: () => void;
}

const Button: React.FC<ButtonProps> = React.memo(({ handleClick }) => {
  console.log('Rendering Button');
  return <button onClick={handleClick}>Click me</button>;
});

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [otherValue, setOtherValue] = useState<number>(0);

  // 使用 useCallback 来缓存 handleClick 函数，只有 count 变化时才会生成新函数
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <Button handleClick={handleClick} />
      <button onClick={() => setOtherValue(otherValue + 1)}>Increment Other Value</button>
    </div>
  );
};

export default App;
