# tailwindcss是怎么实现们运行机制是什么

它是一个基于原子类的 CSS 工具库，核心通过构建时扫描 HTML、JS/TS、Vue 等文件，提取类名并按需生成对应的 CSS 样式。

- 按需生成（Just-in-Time，JIT）机制
    Tailwind 会扫描项目中所有文件（如 .html, .vue, .ts, .jsx 等），提取所有使用的类名。

    JIT 编译器会即时生成这些类对应的 CSS 样式，只输出你用到的那一部分 CSS，极大减少体积。

    // tailwind.config.js
content: ['./src/**/*.{vue,js,ts,jsx,tsx,html}']

-  类名到样式的映射
    例如使用 bg-red-500，JIT 编译器会将其解析为：

    .bg-red-500 {
        background-color: #ef4444;
    }

-  核心依赖：PostCSS 插件系统
    Tailwind 是一个 PostCSS 插件，原理是将你写的类名映射为对应 CSS 规则：

- 配置驱动 + 插件扩展机制
    Tailwind 的行为由 tailwind.config.js 配置驱动，支持主题定制、颜色扩展、插件注册等。