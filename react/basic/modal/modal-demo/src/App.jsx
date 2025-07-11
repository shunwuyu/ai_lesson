import React, { useRef, useState } from 'react';
import Modal from './components/Modal';

function App() {
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>打开 Modal</button>
      <button onClick={() => {console.log(modalRef.current);modalRef.current.close()}}>关闭Modal</button>
      <Modal
        ref={modalRef}
        visible={visible}
        onClose={() => setVisible(false)}
        title="提示"
        footer={
          <>
            <button onClick={() => setVisible(false)}>取消</button>
            <button
              onClick={() => {
                alert('确认操作');
                setVisible(false);
              }}
            >
              确认
            </button>
          </>
        }
      >
        <p>这是内容区域，可以自定义内容。</p>
      </Modal>
    </div>
  );
}

export default App
