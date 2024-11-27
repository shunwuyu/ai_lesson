https://juejin.cn/post/6941206439624966152?searchId=2024112511124973ED988B233B9A09DA98

- 结合图聊聊何为css?
  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc35c91eb2d64ca1aa829d2f070a2d6f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
  - 一个属性与值的键值对被称为声明
    color: green;
  - 声明块 将一个或者多个声明用 {} 包裹起来后
    ```
    {
      color: red;
      text-align: center;
    }
    ```
  - 选择器 声明块如果需要作用到对应的 HTML 元素
  - CSS 规则集 选择器和声明块组成了CSS 规则集
- 为什么css也叫层叠样式表？ 1.html
  层叠性怎么理解？
    -  CSS 选择器的优先级以及继承性来理解
    - 比如针对同一个选择器，定义在后面的声明会覆盖前面的；作者定义的样式会比默认继承的样式优先级更高。

- 选择器
  - 基础选择器
    标签选择器：h1
    类选择器：.checked
    ID 选择器：#picker
    通配选择器：*
  - 属性选择器
    [attr]：指定属性的元素；
    [attr=val]：属性等于指定值的元素；
    [attr*=val]：属性包含指定值的元素；
    [attr^=val]	：属性以指定值开头的元素；
    [attr$=val]：属性以指定值结尾的元素；
    [attr~=val]：属性包含指定值(完整单词)的元素(不推荐使用)；
    [attr|=val]：属性以指定值(完整单词)开头的元素(不推荐使用)；
  - 组合选择器 2.html
    相邻兄弟选择器：A + B
    普通兄弟选择器：A ~ B
    子选择器：A > B
    后代选择器：A B

  - 伪类  3.html
    - 行为伪类
      :active：鼠标激活的元素；
      :hover： 鼠标悬浮的元素；
      ::selection：鼠标选中的元素
    - 状态伪类
      :focus：输入聚焦的表单元素；
      :checked：选项选中的表单元素；
    - 条件伪类
      :not()：用来匹配不符合一组选择器的元素；
    - 结构伪类
      :root  7.html
      :root 是一个CSS伪类，它匹配文档的根元素。在HTML文档中，根元素总是 <html> 元素。因此，:root 伪类可以用来选择整个文档的根元素 <html>。


      :nth-child(n)：元素中指定顺序索引的元素；4.html
      - :nth-child 元素中指定顺序索引的元素
        :nth-of-type 标签中指定顺序索引的标签

- 伪元素 5.html
  ::before：在元素前插入内容；
  ::after：在元素后插入内容；

- 图中看到了什么？![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b226c55b87c426c840d2c70d51d3511~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
  优先级

  优先级就是分配给指定的 CSS 声明的一个权重，它由匹配的选择器中的每一种选择器类型的数值决定。为了记忆，可以把权重分成如下几个等级，数值越大的权重越高：

  10000：!important；
  01000：内联样式；
  00100：ID 选择器；
  00010：类选择器、伪类选择器、属性选择器；
  00001：元素选择器、伪元素选择器；
  00000：通配选择器、后代选择器、兄弟选择器；

  - 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important；
  - 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important；
  - 永远不要在你的插件中使用 !important；
  - 永远不要在全站范围的 CSS 代码中使用 !important；

- 继承性
  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8bd1604b143463eb121c1f46d71c652~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
  
  表达了什么意思？

  比如页面根元素 html 的文本颜色默认是黑色的，页面中的所有其他元素都将继承这个颜色，当申明了如下样式后，H1 文本将变成橙色。

  ```css
  body {
    color: orange;
  }
  h1 {
      color: inherit;
  }

  ```

  - 如果没有css 的继承性， 会怎么样？
    如果 CSS 中不存在继承性，那么我们就需要为不同文本的标签都设置一下 color，这样一来的后果就是 CSS 的文件大小就会无限增大。

  - 哪些会继承？ 哪些不会继承？
    字体相关：font-family、font-style、font-size、font-weight 等；
    文本相关：text-align、text-indent、text-decoration、text-shadow、letter-spacing、word-spacing、white-space、line-height、color 等；
    列表相关：list-style、list-style-image、list-style-type、list-style-position 等；
    其他属性：visibility、cursor 等；

  - 设置为 控制继承行为
    inherit 继承父元素对应属性的计算值
    initial：应用该属性的默认值，比如 color 的默认值是 #000；
    unset：如果属性是默认可以继承的，则取 inherit 的效果，否则同 initial；
  
  - 不可以继承的 8.html
    border
    width height 
    盒模型相关属性 margin
    布局相关 float display 

- 文档流
  从上到下从左到右，而这就是 CSS 中的流式布局，又叫文档流。
  文档流就像水一样，能够自适应所在的容器。
  - 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的
  - 内联元素默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布；

  - 如何脱离文档流 9.html
    脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

    - 浮动
      使用浮动（float）会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
      当一个元素设置了 float: left;
      浮动（float）元素虽然脱离了正常的文档流，但它们并没有完全被其他内容忽略。
      1. 该元素会向左或向右移动，直到遇到其容器的边界或另一个浮动元素。
      2. 非浮动的内容（如文本、内联元素等）会围绕这个浮动元素。这意味着这些内容会从浮动元素的一侧开始显示，通常是在浮动元素的另一侧，形成环绕效果。
      3. 块级元素的行为有所不同：如果后续的块级元素没有设置任何浮动属性，那么它们不会围绕浮动元素，而是会尝试占据新的行， 10.html

    - 使用绝对定位（position: absolute;）或者固定定位（position: fixed;）也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。

    浮动（float）使元素脱离文档流但仍受其他浮动元素影响布局，而绝对定位（position: absolute;）或固定定位（position: fixed;）则让元素完全脱离文档流，并根据指定位置进行定位而不受其他元素影响。

- 盒模型 11.html
  在 CSS 中任何元素都可以看成是一个盒子，而一个盒子是由 4 部分组成的 内容（content）、内边距（padding）、边框（border）和外边距（margin）。

  盒模型有 2 种：标准盒模型和 IE 盒模型，本别是由 W3C 和 IExplore 制定的标准。

  .box {
    width: 200px;
    height: 200px;
    padding: 10px;
    border: 1px solid #eee;
    margin: 10px;
  }

  盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框

  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4b9dddb310540f78a19ea0f7da92938~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

  IE 盒模型认为：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框

  现在高版本的浏览器基本上默认都是使用标准盒模型，而像 IE6 这种老古董才是默认使用 IE 盒模型的。

  box-sizing content-box：标准盒模型；  border-box：IE 盒模型；

- 视觉格式化上下文模型 VFM 
  视觉格式化模型是CSS中用于确定如何在页面上布局和显示元素的一系列规则，它基于元素的尺寸、类型、定位方式（如常规流、浮动或绝对定位）及其与其他元素的关系来计算每个盒子的位置和大小。

  - 各种display 属性 12.html


  - 盒子的类型由display 属性决定 
    - 对外显示
      outer display type（对外显示）决定了该元素本身是如何布局的，即参与何种格式化上下文；
    - 对内显示
      inner display type（对内显示）：其实就相当于把该元素当成了容器，规定了其内部子元素是如何布局的，参与何种格式化上下文；

  - outer display type
    block-level box（块级盒子） 和 inline-level box（行内级盒子）
    块级盒子：display 为 block、list-item、table、flex、grid 等；
    行内级盒子：display 为 inline、inline-block、inline-table inline-flex等；

    所有块级盒子都会参与 BFC，呈现垂直排列；而所有行内级盒子都参会 IFC，呈现水平排列。

  - block、inline、inline-block 区别
    - 占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列；
    - 设置 width/height 将会生效；
    - 设置 padding 和 margin 将会生效；
  - inline
    - 不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行；
    - 设置 width/height 将不会生效；
    - 设置竖直方向上的 padding 和 margin 将不会生效；
  - inline-block
    - 是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素；
    - 设置 width/height 将会生效；
    - 设置 padding 和 margin 将会生效；
- inner display type 
  对内方面，其实就是把元素当成了容器，里面包裹着文本或者其他子元素。container box 的类型依据 display 的值不同，分为 4 种：
  
  - block container：建立 BFC 或者 IFC；
  - flex container：建立 FFC； 为什么会 item 在一起
  - grid container：建立 GFC;
    值得一提的是如果把 img 这种替换元素（replaced element）申明为 block 是不会产生 container box 的，因为替换元素比如 img 设计的初衷就仅仅是通过 src 把内容替换成图片，完全没考虑过会把它当成容器。

  
- 格式化上下文  FC
  格式化上下文（Formatting Context）是 CSS2.1 规范中的一个概念，大概说的是页面中的一块渲染区域，规定了渲染区域内部的子元素是如何排版以及相互作用的

  BFC (Block Formatting Context) 块级格式化上下文；
  IFC (Inline Formatting Context) 行内格式化上下文；
  FFC (Flex Formatting Context) 弹性格式化上下文；

  - BFC 
    块格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a73e2276d8b41f0a905361f151157e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

  - BFC 渲染规则

    - 内部的盒子会在垂直方向，一个接一个地放置；
    - 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
    - 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
    BFC 的区域不会与 float 盒子重叠；20.html
    - BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。 21.html
    - 计算 BFC 的高度时，浮动元素也参与计算。

  - 如何创建 BFC？

    根元素：html
    非溢出的可见元素：overflow 不为 visible
    设置浮动：float 属性不为 none
    设置定位：position 为 absolute 或 fixed
    定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid

  


