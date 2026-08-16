import React, { Suspense } from 'react'
// Next.js 内置的跳转组件
// Next.js 路由是前后端一体的
// Link 做前端跳转，不刷新整页，只更新页面局部
// Server 组件：Link 跳转时，Next 内部会重新执行对应服务组件，拿新服务端数据，再替换页面局部，不用刷新浏览器。
import Link from 'next/link'
// import { getAllNotes } from '@/lib/redis';
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';

export default async function Sidebar() {
  // const notes = await getAllNotes()
  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
            {/* SideSearchField */}
            <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          {/* SidebarNoteList */}
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
