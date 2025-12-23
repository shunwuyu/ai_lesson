// App.jsx
import React from 'react';
import Card from './components/Card';
import Greeting from './components/Greeting';
import { Modal } from './components/Modal';

function MyHeader() {
  return <h2 style={{ margin: 0 }}>🔥 自定义标题</h2>;
}

function MyFooter() {
  return (
    <div style={{ textAlign: 'right' }}>
      <button onClick={() => alert('关闭')} style={{ padding: '0.5rem 1rem' }}>
        关闭
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      {/* <Card className="user-card">
        <h2>张三</h2>
        <p>高级前端工程师</p>
        <button>查看详情</button>
      </Card> */}
      <Card className="user-card">
        <h2>字节跳动</h2>
        <p>字节跳动是中国领先的互联网技术公司，提供了丰富的互联网产品和服务。</p>
      </Card>

      <Greeting name="Alice" message="欢迎加入我们！" showIcon />
      {/* <Greeting name="Bob"/> */}

      <Modal HeaderComponent={MyHeader} FooterComponent={MyFooter}>
        <p>这是弹窗主体内容。</p>
        <p>你可以在这里显示任何 JSX。</p>
      </Modal>
    </>
  );
}

export default App