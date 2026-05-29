import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Confirm.css';

// 定义组件 Props 类型
export interface ConfirmProps {
  title?: string;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  visible: boolean;
  closeOnMaskClick?: boolean; // 点击蒙层关闭
}

// 定义函数调用的参数类型
export interface ConfirmOptions {
  title?: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  closeOnMaskClick?: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({
  title = '提示',
  content,
  onConfirm,
  onCancel,
  confirmText = '确定',
  cancelText = '取消',
  visible,
  closeOnMaskClick = true,
}) => {
  // 控制动画显示
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // 未挂载时不渲染
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={`confirm-mask ${visible ? 'show' : 'hide'}`}>
      <div className="confirm-box">
        {/* 标题 */}
        <div className="confirm-title">{title}</div>
        {/* 内容 */}
        <div className="confirm-content">{content}</div>
        {/* 按钮组 */}
        <div className="confirm-buttons">
          <button className="confirm-btn cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirm-btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>

      {/* 蒙层点击 */}
      {closeOnMaskClick && (
        <div className="confirm-mask-click" onClick={onCancel} />
      )}
    </div>,
    document.body
  );
};

export default Confirm;