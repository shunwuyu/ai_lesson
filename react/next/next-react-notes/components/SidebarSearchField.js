'use client';

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Spinner({active = true}) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}

export default function SidebarSearchField() {
    // replace 是 Next.js 的路由方法，用于更新 URL 并触发页面更新，但不会在浏览历史中添加新记录。
  const { replace } = useRouter()
  const pathname = usePathname()
  // URL更新， 界面保持响应性 isPending 加载状态
//   非常适合在这种频繁非紧急的更新中使用，有效防止造成阻塞
  const [isPending, startTransition] = useTransition()

  function handleSearch(term) {
    // 创建一个 URLSearchParams 实例来处理 URL 查询参数
    const params = new URLSearchParams(window.location.search)
    
    if (term) {
      // 如果有搜索词，将其设置为 q 参数 内存中
      params.set('q', term)
    } else {
      // 如果搜索词为空，删除 q 参数
      params.delete('q')
    }

    // 使用 startTransition 包裹路由更新，使界面保持响应
    // 不会因为频繁的路由更新而变得卡顿
    startTransition(() => {
      // 使用 replace 更新 URL,不会在历史记录中新增记录
      // pathname 是当前路径，params 是查询参数
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
