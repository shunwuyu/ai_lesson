import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

/**
 * KeepAlive
 * 缓存组件 DOM，不随路由切换销毁
 */
export default function KeepAlive({ active, children }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  // 首次渲染时挂载子组件到独立容器中
  useEffect(() => {
    if (!contentRef.current) {
      contentRef.current = document.createElement('div')
      containerRef.current.appendChild(contentRef.current)
      // 把 children 渲染到 contentRef.current 中
      ReactDOM.render(children, contentRef.current)
    }
    return () => {
      // 卸载时不销毁，只隐藏
      contentRef.current.style.display = 'none'
    }
  }, [])

  // 根据 active 显示/隐藏
  useEffect(() => {
    if (contentRef.current) {
      if (active) {
        contentRef.current.style.display = 'block'
      } else {
        contentRef.current.style.display = 'none'
      }
    }
  }, [active])

  return <div ref={containerRef} />
}
