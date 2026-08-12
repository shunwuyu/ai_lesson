# React Notes

## 需求文档

笔记系统， 可以增删改查笔记，笔记支持 markdown 格式。
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/081f4269b85447a0ae044465ea9fa2f4~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=3076&h=1570&s=258799&e=png&b=f4f6f9)
首页效果如下，界面分为两列，左侧是笔记列表，右侧是笔记内容：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3411f724c4eb4d1997311f245723df14~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1191&h=720&s=108873&e=gif&f=42&b=f4f6f9)
在编辑的时候，也可以删除一个 Note，删除后左侧笔记列表也会同时更新：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dad06db2883947c288dc871c769db98b~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1209&h=892&s=166272&e=gif&f=32&b=fefefe)
可以对现有的 Note 进行修改：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/769756f0159a465097938e39a0eac2de~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1209&h=892&s=113504&e=gif&f=44&b=fefefe)

还可以在左侧用搜索框查找一个 Note：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2111a45e641438daab0ae9d3394dc90~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1209&h=892&s=324795&e=gif&f=91&b=f6f8fa)

## 技术文档

用 Next.js 实现这个项目

首先是技术选型，Next.js 的 App Router 自然是要用的, 文件既路由。
ESLint 要使用，用于校验代码
数据方面先使用Redis， 作为经典的 NoSQL 数据库，使用起来也很方便

## 路由
1. 首页肯定是 /，点击左上角的 React Note Logo 会导航至首页 /
2. 点击左侧笔记列表中的一项，导航至 /note/xxxx路由，渲染具体笔记内容
3. 当点击 NEW 按钮的时候导航到 /note/edit路由上，点击 Done导航至刚创建的 /note/xxxx路由
4. 导航至 /note/xxxx后，点击 EDIT 按钮，进入 /note/edit/xxxx 路由，点击 Done导航至刚修改的 /note/xxxx路由，点击 DELETE 导航至首页 /
当在左侧搜索框输入字符的时候，对应路由添加 ?q=searchText 参数

对应到 Next.js 的项目目录，至少要有这些文件：

```
next-react-notes                 
├─ app                                     
│  ├─ note                       
│  │  ├─ [id]                         
│  │  │  └─ page.js              
│  │  └─ edit                    
│  │     ├─ [id]                 
│  │     │  └─ page.js              
│  │     └─ page.js                        
│  ├─ layout.js                  
│  └─ page.js                                

```
考虑到左侧笔记列表出现在所有的路由中，我们将左侧的内容包括搜索栏和笔记列表，统一放在根布局 layout.js 中。
再者是组件划分，示意图如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ce14cd1fd74018ac9e956d1da4864f~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=2450&h=1740&s=147434&e=png&b=ffffff)

左侧是 <Sidebar> 组件，子组件中有：

<SidebarSearchField> 组件负责搜索框
<EditButton> 组件负责添加按钮
<SidebarNoteList> 组件负责笔记列表
再拆分为具体的 <SidebarNoteItem> 组件负责每一条具体的笔记内容
右侧是 <Note> 组件，子组件有：

<EditButton> 组件负责编辑按钮
<NoteEditor> 组件负责笔记的编辑界面
<NotePreview> 组件负责笔记的预览界面

对项目有了大致的了解和规划，剩下的就让我们在项目里具体完善吧，现在开始动手吧。

## 开始项目

### 创建项目

使用 create-next-app脚手架创建项目，运行：
npx create-next-app@latest
customize

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb2ac654862f445fb9146ce39caba318~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1150&h=328&s=618397&e=png&b=0b141d)

2. 配置路径别名

为了让代码文件职责清晰，我们将组件统一放在根目录下的 components目录下，工具库放在根目录下的 lib目录下，为了方便引入，我们配置一下路径别名，修改 jsconfig.json：

```
"compilerOptions": {
    "paths": {
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"]
    }
  }
```

3. 修改根布局和根页面

修改 app/page.js：
```
// app/page.js
export default async function Page() {
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        Click a note on the left to view something! 🥺
      </span>
    </div>
  )
}
```
修改 app/layout.js：
```
import './style.css'
import Sidebar from '@/components/Sidebar'

export default async function RootLayout({
  children
}) {

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}


```
在 /components下新建一个名为 Sidebar.js 的文件，代码为：
```
import React from 'react'
import Link from 'next/link'

export default async function Sidebar() {
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
        </section>
        <nav>
          {/* SidebarNoteList */}
        </nav>
      </section>
    </>
  )
}

```
4. 引入所需样式和图片文件

在根布局里我们引用了 style.css，style.css里声明了所有的样式，但这个文件不需要我们自己写，因为原 Demo 里就已经将所有的样式写到了一个 style.css 文件，我们只需要将这个文件拷贝到 app目录下即可。

这个项目里还会用到一些图片，我们将原 Demo 里 public 目录下的 5 张 SVG 图片：checkmark.svg、chevron-down.svg、chevron-up.svg、cross.svg、logo.svg 拷贝到 public目录下。

5. 第一步完成！
如果步骤正确的话，此时再访问 http://localhost:3000/应该效果如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6752f40eba614c99a75c1e0e67cff120~tplv-k3u1fbpfcp-jj-mark:3326:0:0:0:q75.awebp#?w=1736&h=1132&s=100291&e=png&b=f6f7fa)

### 数据请求

简单介绍一下 Redis，它是一个高性能的 key-value 数据库，是现在最受欢迎的 NoSQL 数据库之一，常用于缓存、计数器、消息队列系统、排行榜等场景。

使用 Redis 很简单，一共分为三步：

1. 安装 Redis
macOS 安装 redis 很简单，按照官网安装说明，使用 Homebrew 安装即可：

brew install redis