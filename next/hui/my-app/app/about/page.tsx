import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于 Next.js",
  description: "了解 Next.js：基于 React 的全栈框架",
};

export default function About() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-10 px-8 py-20">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Next.js
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 是一个基于 React 的全栈框架，内置路由、渲染、数据获取与部署能力，
            让你可以用同一个代码库构建快速、可扩展的 Web 应用。
          </p>
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            App Router 与文件系统路由
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            路由由 <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">app</code>{" "}
            目录中的文件夹和文件定义。例如本页面由{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              app/about/page.tsx
            </code>{" "}
            生成 <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">/about</code>{" "}
            路由。
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            服务端组件与客户端组件
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            组件默认在服务端渲染，减少发送到浏览器的 JavaScript 体积。需要交互的组件可以添加{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              use client
            </code>{" "}
            指令，在客户端渲染。
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            数据获取与渲染
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            你可以在服务端组件中使用 <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">async/await</code>{" "}
            直接获取数据，并支持静态生成、增量静态再生成与动态渲染等多种策略。
          </p>
        </section>

        <Link
          href="/"
          className="mt-4 text-base font-medium text-zinc-950 dark:text-zinc-50 underline underline-offset-4"
        >
          返回首页
        </Link>
      </main>
    </div>
  );
}
