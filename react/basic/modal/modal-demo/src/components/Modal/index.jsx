// Modal.tsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import ReactDOM from 'react-dom';
// 此为 CSS Modules 用法，
// 避免全局样式冲突，提高样式可维护性和组件独立性；
// 借助编译器
// 类名、ID 等会经过哈希处理，生成唯一标识符，样式规则也会被局部化，
// 保证不同组件的样式不会相互冲突 1 。
import styles from './Modal.module.css';

const Modal = forwardRef((props, ref) => {
  const { title, footer, children, visible, onClose } = props;
  const modalRef = useRef(null);

  // 允许父组件调用 ModalRef.close()
  // 向父组件暴露 close 方法，调用时触发 onClose 函数。
  useImperativeHandle(ref, () => ({
    close: () => {
      onClose();
    },
  }));

  // 点击空白关闭
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  // 不渲染内容
  if (!visible) return null;
  // return ReactDOM.createPortal( 调用 ReactDOM.createPortal 方法，
  //   将模态框组件渲染到 document.body 节点下，即便组件在 DOM 层级中远离目标位置，
  //   也能在指定位置渲染。
  return ReactDOM.createPortal(
    <div className={styles.mask}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <span>{title}</span>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
});

export default Modal;
