https://juejin.cn/post/6844903516897542158?searchId=2024111809553835614683DB6FD530E0ED

- 从图里看到了什么？
  块元素（block）独占一行
  内联元素（inline），不独占一行
- margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔
- margin用于布局分开元素使元素与元素互不相干 padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段“距离”。
- 文档流
  文档流是指在网页布局中，元素按照源代码中的顺序从上到下（block）、从左到右(inline)自然排列的流动方式。
  元素按照其在 HTML 中的位置顺序决定排布的过程。HTML的布局机制就是用文档流模型的，即块元素（block）独占一行，内联元素（inline），不独占一行。

## position

**不管是哪种定位，都必须有一个参照物。找对了参照物，就成功了一半。**

  - relative 
  生成相对定位的元素，相对于其正常位置进行定位
  - 按默认方式（static）生成一个元素(并且元素像层一样浮动了起来)。
  - 相对于以前的位置移动，移动的方向和幅度由 left、right、top、bottom 属性确定，偏移前的位置保留不动。
  2.html

  默认情况下，所有块级元素和行内元素都是以 position: static; 方式显示的
  如果你想要创建一个看起来像是浮动的层效果，但又不想完全脱离文档流，可以考虑使用 position: relative;，同时结合 z-index 属性来控制元素的堆叠顺序，使得某些元素在视觉上看起来像是浮动在其他元素之上。

  position: relative 顺序变一下
  **相对定位的参照物是它本身。**

  - absolute
    这个元素将会脱离文档流，其他元素就会认为这个元素不存在于文档流中而填充它原来的位置。绝对定位元素根据它的参照物移动自己的位置，而参照物则需要根据它祖先元素的定位设置来确定。

    相对于该元素最近的已定位的祖先元素，如果没有一个祖先元素设置定位，那么参照物是body层。


  - fixed