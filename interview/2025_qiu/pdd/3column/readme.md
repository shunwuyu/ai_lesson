# 怎么做一个响应式页面?假如两边有sidebar，该怎么做?

- Flexbox（三栏）
- grid 
  先渲染 main
- 圣杯布局思想是：HTML中主内容优先，保证语义和SEO，通过float让左右侧边栏与主内容并排，利用负边距（margin-left: -100%拉左栏，margin-left: -宽度拉右栏）将其“拉”到容器两侧的padding区域，实现视觉上的三栏布局，核心是结构与表现分离，内容优先加载。

- 内容优先级 main
  圣杯布局借助容器 padding 预留左右栏位置，利用浮动与负 margin 调整侧边栏位置，实现主内容 DOM 优先、三栏并排，需清除浮动避免塌陷。
  - float 作用
  普通块级元素独占一整行，不 float 的话 content、left、right 会从上往下堆叠，无法三栏横向并排。
  负 margin 再调整它们的左右位置。
  - relative相对自身移动
- 双飞翼
  双飞翼布局利用 float 加负 margin 实现三栏并排，主内容 DOM 优先渲染，通过内层容器 margin 留出左右栏位置，无需 relative，再清除浮动防止高度塌陷。

