import React from 'react';
import { confirm } from './Confirm'; // 假设上面的代码保存在 Confirm.tsx

const App = () => {
  // 方式一：使用 Promise / async / await (推荐)
  const handleDelete = async () => {
    try {
      const isConfirmed = await confirm({
        title: '删除确认',
        content: '你确定要删除这条数据吗？此操作不可恢复。',
        okText: '删除',
        cancelText: '取消',
      });

      if (isConfirmed) {
        console.log('用户点击了确定，执行删除 API...');
        // 这里执行你的删除逻辑
      } else {
        console.log('用户点击了取消');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  };

  // 方式二：传统的回调方式
  const handleExport = () => {
    confirm({
      title: '导出数据',
      content: '即将导出 10,000 条数据，是否继续？',
      onOk: () => console.log('开始导出...'),
      onCancel: () => console.log('取消导出'),
    });
  };

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={handleDelete} style={{ marginRight: '20px', color: 'red' }}>
        删除项目
      </button>
      <button onClick={handleExport}>导出数据</button>
    </div>
  );
};

export default App;