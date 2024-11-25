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