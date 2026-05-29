import React, { ReactNode } from 'react';
// 引入 React 18 的客户端渲染入口
// 注意：React 18 将 createRoot 从 'react-dom' 移到了 'react-dom/client'
import { createRoot, Root } from 'react-dom/client'; 

// ==========================================
// 1. 类型定义与样式配置
// ==========================================

/**
 * 定义 Confirm 组件的属性接口
 * 这里使用了 TypeScript 的强类型特性
 */
interface ConfirmProps {
  title: string;           // 弹窗标题
  content?: ReactNode;     // 弹窗内容，可以是字符串或 React 元素
  onOk?: () => void;       // 点击“确定”按钮的回调
  onCancel?: () => void;   // 点击“取消”按钮的回调
  okText?: string;         // “确定”按钮的文本，默认为“确定”
  cancelText?: string;     // “取消”按钮的文本，默认为“取消”
  visible: boolean;        // 控制弹窗显示/隐藏的状态
  close: () => void;       // 关闭弹窗的函数（用于销毁组件）
}

/**
 * 定义内联样式对象
 * 在实际工程中，建议使用 CSS Modules 或 styled-components，
 * 但为了保持单文件示例的独立性，这里使用 JS 对象。
 */
const styles = {
  // 遮罩层：全屏固定定位，居中显示内容
  overlay: { 
    position: 'fixed' as const, // 'as const' 确保类型推断为字面量类型，而非宽泛的 string
    top: 0, left: 0, 
    width: '100%', height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色背景
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    zIndex: 1000 // 确保层级在最上层
  },
  // 弹窗主体：白色背景，带阴影
  modal: { 
    backgroundColor: '#fff', 
    padding: '24px', 
    borderRadius: '8px', 
    width: '320px', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
    textAlign: 'center' as const 
  },
  // 标题样式
  title: { margin: '0 0 12px', fontSize: '16px', fontWeight: 'bold', color: '#333' },
  // 内容样式
  content: { margin: '0 0 24px', fontSize: '14px', color: '#666', lineHeight: '1.5' },
  // 按钮组容器：Flex 布局，右对齐
  btnGroup: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  // 按钮基础样式
  btn: { padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px' },
  // 取消按钮特定样式
  cancelBtn: { backgroundColor: '#f5f5f5', color: '#333' },
  // 确定按钮特定样式（主题色）
  okBtn: { backgroundColor: '#1890ff', color: '#fff' },
};

// ==========================================
// 2. 弹窗 UI 组件定义
// ==========================================

/**
 * 具体的弹窗 UI 组件
 * 这是一个纯展示组件，不包含“如何挂载”的逻辑
 */
const ConfirmComponent: React.FC<ConfirmProps> = ({
  title, content, onOk, onCancel, 
  okText = '确定', cancelText = '取消', 
  visible, close 
}) => {
  // 点击确定的处理函数
  const handleOk = () => { 
    onOk?.(); // 可选链：如果 onOk 存在则执行
    close();  // 通知父级（命令式函数）销毁节点
  };

  // 点击取消的处理函数
  const handleCancel = () => { 
    onCancel?.(); 
    close(); 
  };

  // 如果不可见，直接返回 null，不渲染任何 DOM
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>{title}</h3>
        {content && <div style={styles.content}>{content}</div>}
        <div style={styles.btnGroup}>
          <button style={{ ...styles.btn, ...styles.cancelBtn }} onClick={handleCancel}>
            {cancelText}
          </button>
          <button style={{ ...styles.btn, ...styles.okBtn }} onClick={handleOk}>
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. 核心命令式逻辑 (API 暴露)
// ==========================================

/**
 * 核心 API：confirm
 * 这是一个普通的 JS 函数，不依赖 React 组件树
 * 它返回一个 Promise，支持 async/await 语法
 */
export const confirm = (options: {
  title: string;
  content?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
}): Promise<boolean> => {
  
  // 返回一个 Promise 对象
  return new Promise((resolve) => {
    // 1. 创建临时 DOM 节点
    // 这个节点不在 React 应用的根节点内，而是直接挂在 body 下
    const tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);

    // 2. 创建 React 18 的 Root 实例
    // 这是 React 18 的新 API，替代了 ReactDOM.render
    const root = createRoot(tempDiv);

    /**
     * 销毁函数
     * 负责清理 React 实例和 DOM 节点，防止内存泄漏
     */
    const destroy = () => {
      root.unmount(); // React 18 的卸载方法
      tempDiv.remove(); // 从 DOM 树中移除该 div
    };

    // 3. 包装回调函数
    // 目的是在执行用户传入的回调后，自动关闭弹窗并 resolve Promise
    const onOkWrapper = () => {
      options.onOk?.(); // 执行用户传入的 onOk
      resolve(true);    // 将 Promise 状态设为成功 (true)
      destroy();        // 销毁弹窗
    };

    const onCancelWrapper = () => {
      options.onCancel?.();
      resolve(false);   // 将 Promise 状态设为取消 (false)
      destroy();
    };

    // 4. 构建 React 组件树
    const component = (
      <ConfirmComponent
        {...options}        // 透传 title, content 等属性
        visible={true}      // 强制设为可见
        onOk={onOkWrapper}  // 绑定包装后的确定事件
        onCancel={onCancelWrapper} // 绑定包装后的取消事件
        close={destroy}     // 绑定关闭逻辑
      />
    );

    // 5. 渲染组件
    // 将 React 组件渲染到刚才创建的 tempDiv 中
    root.render(component);
  });
};