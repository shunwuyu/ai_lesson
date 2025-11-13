# 浮动布局

- 文档流
文档流是网页元素默认的布局方式，元素按照在HTML中的顺序逐一排列，影响元素的定位和布局，分为标准流（块级元素丛上到下，行内元素从左到右）、浮动流(浮动)、定位流（Position）等。

- 水平列布局
  - inline-block 1.html
  - float 2.html
- 浮动存在的意义 float
  float 最初的设计初衷并非用于整体页面布局，而是为了实现文本环绕媒体元素（如图片、表格等）的排版效果——即让块级内容（如段落）在浮动元素周围自然流动，模拟传统印刷排版中的图文混排行为。

- 浮动布局
  - 浮动元素的高度不计算在父元素的高度中，导致父容器和后续元素重叠
  - 直接设置父元素的高度 --- 不推荐
    固定高度无法自适应内容变化，易导致溢出或留白。
  - 清除浮动
    - 在浮动元素的后面添加一个空的 div 标签，给这个空的 div 标签设置 clear: both; 不推荐 为了清楚浮动， 多加了元素
    - 伪元素清除浮动 --- 推荐 - 给父元素添加伪元素 ::after { content: ''; display: block; clear: both; 
    - 给被浮动影响的容器做清楚浮动 clear: both; --- 不推荐
    - 给父元素设置 overflow: hidden; --- 推荐
  

## BFC - block format context - 块级格式化上下文
  是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a73e2276d8b41f0a905361f151157e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
  - BFC 渲染规则
    - html 是最外层的BFC 容器
    内部的盒子会在垂直方向，一个接一个地放置；
    - 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
    - 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
    - BFC 的区域不会与 float 盒子重叠；
    - BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
    - 计算 BFC 的高度时，浮动元素也参与计算。 
  5.html
  - 如何创建BFC容器
  display: inline-block || table-cell || table-caption || flex || inline-flex; 
  position: absolute || fixed;
  overflow: hidden || auto || scroll || overlay;
