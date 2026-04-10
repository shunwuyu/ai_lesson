import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

/**
 * confirm 入参类型
 * 目前只支持 message，实际可以扩展 title / 按钮文案等
 */
type ConfirmOptions = {
  message: string
}

/**
 * 弹窗组件 props
 */
type ModalProps = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * 弹窗组件
 * 使用 createPortal 挂载到 document.body
 * 👉 避免被父组件样式（如 overflow / z-index）影响
 */
const ConfirmModal: React.FC<ModalProps> = ({ message, onConfirm, onCancel }) => {
  return createPortal(
    <div style={styles.mask}>
      <div style={styles.box}>
        <p>{message}</p>

        {/* 操作按钮 */}
        <div>
          <button onClick={onConfirm}>确定</button>
          <button onClick={onCancel} style={{ marginLeft: 10 }}>
            取消
          </button>
        </div>
      </div>
    </div>,
    document.body // 👉 挂载到 body
  )
}

/**
 * 核心 confirm 方法
 * 👉 返回 Promise，实现类似 window.confirm 的调用方式
 */
export function confirm(options: ConfirmOptions): Promise<void> {
  // 1. 动态创建挂载节点（解耦业务组件）
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 2. React 18 创建 root
  const root = createRoot(container)

  // 3. 返回 Promise，供外部 await / then 使用
  return new Promise((resolve, reject) => {

    /**
     * 清理函数
     * 👉 卸载组件 + 删除 DOM，避免内存泄漏
     */
    const cleanup = () => {
      root.unmount()
      container.remove()
    }

    /**
     * 点击确认
     */
    const handleConfirm = () => {
      cleanup()
      resolve() // Promise 成功
    }

    /**
     * 点击取消
     */
    const handleCancel = () => {
      cleanup()
      reject() // Promise 失败
    }

    /**
     * 内部 App 组件
     * 👉 用 state 控制弹窗显示/隐藏（更符合 React 思维）
     */
    const App = () => {
      const [visible, setVisible] = useState(true)

      // 不可见时不渲染
      if (!visible) return null

      return (
        <ConfirmModal
          message={options.message}

          // 点击确认
          onConfirm={() => {
            setVisible(false) // 先隐藏
            handleConfirm()   // 再 resolve
          }}

          // 点击取消
          onCancel={() => {
            setVisible(false)
            handleCancel()
          }}
        />
      )
    }

    // 4. 渲染组件
    root.render(<App />)
  })
}

/**
 * 简单样式（面试一般不重点考）
 */
const styles: Record<string, React.CSSProperties> = {
  mask: {
    position: 'fixed',
    inset: 0, // 等价于 top/left/right/bottom = 0
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    minWidth: 200,
  },
}