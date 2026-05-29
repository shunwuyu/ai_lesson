import { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    }
  }));

  if (!visible) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>我是 Modal</h3>
        <button onClick={() => setVisible(false)}>内部关闭</button>
      </div>
    </div>
  );
});

export default Modal;

// 简单样式
const overlayStyle = {
  position: "fixed",
  // inset: 0,
  top: "30%",
  left: "30%",
  right: "30%",
  bottom: "30%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8
};
