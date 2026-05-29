# 怎么做一个响应式页面?假如两边有sidebar，该怎么做?

- Flexbox（三栏）
- grid 
  先渲染 main
- 圣杯布局思想是：HTML中主内容优先，保证语义和SEO，通过float让左右侧边栏与主内容并排，利用负边距（margin-left: -100%拉左栏，margin-left: -宽度拉右栏）将其“拉”到容器两侧的padding区域，实现视觉上的三栏布局，核心是结构与表现分离，内容优先加载。

- 内容优先级 main
- Mobile-first
