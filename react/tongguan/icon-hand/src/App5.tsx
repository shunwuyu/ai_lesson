import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
// https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
// scriptUrl 在这里指的是指向一个包含图标字体的 JavaScript 文件的 URL
// 生成过程 收藏， 添加到项目 symbol 拿到地址
// 项目中的亮点

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4820323_ur14g1ro8l.js',
});

const App: React.FC = () => (
  <Space>
    <IconFont type="icon-sanmingzhi-01" />
    <IconFont type="icon-bangbangtang-01" />
    <IconFont type="icon-baozi-01" />
  </Space>
);

export default App;
