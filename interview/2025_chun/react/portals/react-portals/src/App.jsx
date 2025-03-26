import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

// 模态框组件
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  // 使用 createPortal 将模态框内容渲染到 body 下的特定 DOM 节点
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal-root') // 这个元素需要在 HTML 中预先定义
  );
};

// 应用组件
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="app">
      <h1>React Portals 示例</h1>
      <p>这是主应用内容，模态框将渲染在 DOM 树的其他位置</p>
      <button onClick={openModal}>打开模态框</button>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>这是一个模态框</h2>
        <p>
          虽然这个模态框在组件树中是 App 的子组件，
          但它实际上被渲染到了 DOM 树中的另一个位置，
          这就是 React Portals 的魔力！
        </p>
      </Modal>
    </div>
  );
}

export default App;