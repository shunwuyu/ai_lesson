// pages/NotFound.jsx
import React from 'react';
import { Empty, Button } from 'react-vant';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Empty
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="页面不存在"
      />
      <Button type="primary" onClick={() => window.history.back()}>
        返回上一页
      </Button>
    </div>
  );
};

export default NotFound;