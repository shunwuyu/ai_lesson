import React, { useState } from 'react';

const KeepAlive = ({ activeKey, children }) => {
  const cache = {};

  return (
    <>
      {React.Children.map(children, (child) => {
        const key = child.key;

        // 缓存组件实例
        if (!cache[key]) {
          cache[key] = child;
        }

        return (
          <div
            key={key}
            style={{
              display: key === activeKey ? 'block' : 'none',
            }}
          >
            {cache[key]}
          </div>
        );
      })}
    </>
  );
};


const Tab1 = () => {
  const [count, setCount] = useState(0);
  return <div>Tab1 Count: {count} <button onClick={() => setCount(c => c + 1)}>+1</button></div>;
};

const Tab2 = () => {
  return <div>Tab2 Content</div>;
};

export default function App() {
  const [active, setActive] = useState('tab1');

  return (
    <div>
      <button onClick={() => setActive('tab1')}>Tab 1</button>
      <button onClick={() => setActive('tab2')}>Tab 2</button>

      <KeepAlive activeKey={active}>
        <Tab1 key="tab1" />
        <Tab2 key="tab2" />
      </KeepAlive>
    </div>
  );
}
