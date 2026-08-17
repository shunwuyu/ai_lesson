1. 正则ID 
const match = pathname.match(/\/(\d+)$/);
  const selectedId = match ? match[1] : '';
2. // 派生状态（Derived State） ——直接从已有 props/state 计算出来的值
  const isActive = id === selectedId
3. const prevTitleRef = useRef(title); 持久化之前的值， 来新的值， 对比
4. `onAnimationEnd` 是 React 合成事件，对应原生 DOM 的 `animationend`，**CSS @keyframes 动画完全执行结束后触发**。
5.  className={[
  'sidebar-note-list-item',
  isExpanded ? 'note-expanded' : '',
].join(' ')} 
  JSX 的`className`接收字符串。把多个 class 放进数组，用空格`' '`拼接成一个完整类名字符串。
6. css4 变量
  :root 
7. 组织默认行为

## 服务端组件和客户端组件

我们声明了一个 Sidebar 组件用于实现侧边栏，其中有一个子组件 SidebarNoteList 用于实现侧边栏的笔记列表部分，针对每一条笔记，我们抽离了一个 SidebarNoteItem 组件来实现，在 SidebarNoteItem 中，我们又抽离了一个名为 SidebarNoteItemContent 的客户端组件用于实现展开和收回功能，然后我们在 SidebarNoteItem 这个服务端组件中将笔记的标题和时间这段 JSX 作为 children 传递给 SidebarNoteItemContent。

这个时候你可能会有个疑问：为什么要这样做呢？为什么不直接把 SidebarNoteItem 声明为客户端组件，然后直接在这个组件里全部实现呢？还要用传递 children 这么复杂的方式？

1. 服务端组件可以导入客户端组件，但客户端组件并不能导入服务端组件
2. 从服务端组件到客户端组件传递的数据需要可序列化， 不可能传事件，服务器不处理
所谓可序列化，简单的理解就是 JSON.stringify() 这段数据不会出现错误，如果我们在这里传递一个函数 fun={() => {}}，就会出现错误提示：
fun={() => {}} 不可序列化
```
JSON.stringify({a:1, b: () => {}})
```
3. 但你可以将服务端组件以 props 的形式传给客户端组件，其实刚才的实现里就展现了两种传递服务端组件的形式：

## 客户端组件下移
“尽可能将客户端组件在组件树中下移”，这里就是一个很好的例子。

我们本可以直接把 SidebarNoteItem 声明为客户端组件，然后直接在这个组件里全部实现，但是却抽离了一个名为 SidebarNoteItemContent 的客户端组件用于实现展开和收回功能。

SidebarNoteItemContent 的内容原本是 SidebarNoteList 的子组件，现在却是 SidebarNoteItem 的子组件。虽然在组件树中的位置下移了，但我们却因此避免了 dayjs 这个库被打包到客户端 bundle 中。在开发的时候，应该尽可能缩减客户端组件的范围。

## 模块化lib/utils
`app`目录只专注路由，路由代码干净，业务逻辑全部抽出去
通用工具放lib/utils

## 骨架屏
Suspense
Suspense 在被包裹组件**渲染过程中抛出未完成 Promise**时展示 fallback
服务端组件：`await getNoteList()` 数据返回 → Promise 完成

## 新版本  params 是promise
const { id: noteId } = await params;
const note = await getNote(noteId)

## marked sanitize‑html

这个组件用来渲染 Markdown 笔记。先用 marked 把 markdown 文本转成 HTML，再用 sanitize‑html 做 HTML 消毒，防止 XSS 攻击。放开 img、h1‑h3 标签，图片只允许 alt 和 src 属性。最后通过 dangerouslySetInnerHTML 把处理好的内容渲染出来，既支持图文标题，又过滤掉危险代码。

<img src='invalid' onerror='alert(1)'/>
const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src', 'onerror']
  }
)

`dangerouslySetInnerHTML`是 React 用来直接插入原始 HTML 字符串到 DOM 的属性，会绕过 JSX 转义，容易引发 XSS，名字就是提醒你风险。

