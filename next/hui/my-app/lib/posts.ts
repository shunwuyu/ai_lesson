export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string[];
};

export const POSTS: Post[] = [
  {
    slug: "nextjs-day-one",
    title: "学习 Next.js 的第一天",
    description: "了解了 App Router、服务端组件和客户端组件的区别，受益匪浅。",
    date: "2026-08-20",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    content: [
      "今天开始学习 Next.js，首先接触到的是 App Router。它通过 app 目录中的文件夹和文件来定义路由，一个 page.tsx 就能生成对应的页面。",
      "接着理解了服务端组件和客户端组件的区别：组件默认在服务端渲染，需要交互时才通过 use client 指令切换。",
      "这种设计让页面默认只发送更少的 JavaScript，整体思路清晰，值得继续深入。",
    ],
  },
  {
    slug: "tailwind-css-notes",
    title: "Tailwind CSS 入门笔记",
    description: "Tailwind 让我不用写 CSS 文件就能快速搞定样式，效率飞起。",
    date: "2026-08-21",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    content: [
      "Tailwind CSS 通过一组原子化的工具类来写样式，比如 flex、px-4、text-lg，直接在 JSX 中组合使用。",
      "相比传统 CSS 文件，它省去了在样式和组件之间来回切换的步骤，样式和结构放在一起，阅读起来更直观。",
      "配合 Next.js 使用非常顺手，dark mode、响应式布局都能用简单的前缀快速实现。",
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}
