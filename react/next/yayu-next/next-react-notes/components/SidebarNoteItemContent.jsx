'use client';

// 这是个经典误解——'use client' 不影响 SEO，因为 Next.js App Router                                     
//   的客户端组件首次渲染仍然在服务端完成。                                                               
                                                                                                       
//   这个组件为什么必须是 Client Component                                                                
                                                                                                       
//   它用了这些必须在客户端运行的 API：     
//   ┌──────────────────────────┬────────────────────────────────────┐
//   │     使用的 Hook/API      │                作用                │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ useState                 │ isExpanded 展开/折叠状态           │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ useRef                   │ DOM 引用 itemRef、保存前一个 title │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ useEffect                │ 标题变化时触发 flash 动画          │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ useRouter / usePathname  │ 路由导航、高亮当前笔记             │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ useTransition            │ 导航 pending 状态                  │
//   ├──────────────────────────┼────────────────────────────────────┤
//   │ onClick / onAnimationEnd │ 用户交互事件                       │
//   └──────────────────────────┴────────────────────────────────────┘
//   这些都是互动逻辑，天然就是客户端组件。

//   SEO 为什么没问题

//   Next.js App Router 里 'use client' 不是 CSR（纯客户端渲染），更准确的叫法是 "Client 边界"：

//   服务端 SSR 阶段：
//     组件在服务端被渲染成 HTML → 输出到页面响应中

//   客户端 Hydration 阶段：
//     React 接管 DOM，绑定事件，注入交互能力

//   爬虫看到的是服务端渲染好的 完整 HTML，和 Server Component 没有区别。'use client' 只影响 hydration
//   之后的行为，不影响首屏 HTML 输出。

//   一句话总结

//   'use client' ≠ 纯 CSR，它只是标记了"这个组件需要水合后派发交互"。SEO
//   完全不受影响，因为这个侧边栏的内容和数据在首屏 HTML 里已经渲染好了。

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation'

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname?.split('/')[1] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  // Animate after title is edited.
  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
              ? 'var(--tertiary-blue)'
              : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle')
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${id}`)
        }}>
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
