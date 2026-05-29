import React, { PropsWithChildren } from 'react';

import { IconAdd } from './Icon/icons/IconAdd';

// 定义一个简单的组件，使用 PropsWithChildren 来指定它可以包含 children
const Container: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      {children}
    </div>
  );
};

// 使用 Container 组件，并传递一些子元素
const App = () => {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <Container>
        <p>这是一个通过 Container 组件包裹的段落。</p>
      </Container>
    </div>
  );
};

export default App;