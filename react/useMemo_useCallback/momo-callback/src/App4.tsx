import React, { useState } from 'react';

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

  // 每次渲染时都会生成新的 handleClick 函数引用
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Button handleClick={handleClick} />
      <button onClick={() => setOtherValue(otherValue + 1)}>Increment Other Value</button>
    </div>
  );
};

export default App;
