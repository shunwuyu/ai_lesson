# BFC Block Formating Context

- 1.html 怎么理解？
  规则一 BFC 内部的盒子会在垂直方向上从上到下排列
  BFC 是浏览器布局中一个独立的渲染区域(不受外界影响)，区域内的元素不会影响区域外的布局，常用来处理浮动、外边距折叠、清除浮动、两栏自适应布局等问题。
  - <html> 会创建一个 BFC
  - <body> 参与 <html> 创建的 BFC
  - 普通 block-level 元素默认在同一个 BFC 中 垂直排列

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a73e2276d8b41f0a905361f151157e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- BFC 可以阻止外边距（margin）折叠
  2.html
  BFC 是独立的布局环境。两个不在同一 BFC 的 block-level box，不会产生 margin 折叠。

- BFC 不会被浮动元素重叠，会自动避开浮动
  3.html
    不会与浮动重叠，创造出“两栏布局”的效果
    当一个元素创建 BFC 时，会将浮动元素视为存在，从而自动避开浮动，形成自适应布局。

- BFC 可以包含浮动元素的高度（清除浮动）
  BFC 会计算浮动的高度，因此父元素能自动包含浮动子元素，相当于“清除浮动”的效果。

在大型布局中，BFC 是一种廉价、兼容性好、可控的布局隔离手段。



