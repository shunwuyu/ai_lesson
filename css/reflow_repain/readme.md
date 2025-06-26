[source](https://juejin.cn/post/6844903569087266823?searchId=20250626084427E6E9DD99524E129E3A26)

- 有什么元素就可以实现行列布局？
    1.html table
- 为什么页面布局不用table 呢？

    任何单元格的变化（如内容、大小或样式）都会影响整个表格的布局，导致浏览器重新计算所有相关单元格的位置和大小。

    现代布局更倾向于使用 CSS Flexbox 或 Grid，以提高效率和灵活性。

    容易实现列布局但性能不好， 不用

- grid 2.html

## 回流，重绘前置

### 前置知识
    - 浏览器使用流式布局模型 (Flow Based Layout)。
    根据文档顺序依次渲染元素，各元素在默认情况下按从左到右、从上到下的顺序排列。基石
    - 浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree。
    图片
    Render Tree 包含了页面中可见的元素及其样式信息，但不包括不可见的元素（如 display: none 的元素）。
    是Layout Tree 计算布局所需的基础

    - 有了RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。 LayoutTree
    先后顺序：Layout Tree 负责计算每个可见元素的几何信息（位置和大小），并将这些元素绘制到页面上。
    Render Tree 先生成，Layout Tree 后生成。
    依赖关系：Layout Tree 依赖于 Render Tree，因为它需要 Render Tree 提供的样式和结构信息来计算布局。
    渲染程序渲染

## 回流 (Reflow)

当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
- 页面首次渲染 严格意义下不叫“回流” 渲染，
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的DOM元素
- 激活CSS伪类（例如：:hover） 浏览器需**重新计算元素**的样式和布局
- 查询某些属性或调用某些方法
    clientWidth、clientHeight、clientTop、clientLeft 返回元素内容区尺寸 返回边框厚度
    offsetWidth、offsetHeight、offsetTop、offsetLeft 
    offsetWidth 和 offsetHeight 包含边框的元素尺寸，offsetTop 和 offsetLeft 是相对带定位父元素的偏移量。
    scrollWidth、scrollHeight、scrollTop、scrollLeft
    scrollWidth 和 scrollHeight 是内容的总尺寸，scrollTop 和 scrollLeft 是滚动条的位置。
    scrollIntoView()、scrollIntoViewIfNeeded()
    scrollIntoView() 滚动元素到可视区域，scrollIntoViewIfNeeded() 仅在元素不在可视区域时滚动，确保其可见。
    getComputedStyle() 元素的最终计算样式，提供当前元素所有 CSS 属性的值，常用于动态样式分析。
    getBoundingClientRect() 元素的大小及其相对于视口的位置，用于精确测量和定位页面元素。
    scrollTo()  将页面或元素滚动到指定位置

    function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

getComputedStyle 会强制浏览器同步计算当前元素所有最终样式，导致立即回流，影响性能。

## 重绘 (Repaint)
当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

- 回流比重绘的代价要更高。
- 有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。
  7.html

- 现代浏览器会对频繁的回流或重绘操作进行优化：
  浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。

- 当你访问以下属性或方法时， 浏览器会立刻清空队列：
  width、height
  getBoundingClientRect()
  getComputedStyle()
  width、height
  scrollWidth、scrollHeight、scrollTop、scrollLeft
  offsetWidth、offsetHeight、offsetTop、offsetLeft
  clientWidth、clientHeight、clientTop、clientLeft

  - 浏览器也会强行清空队列，确保你拿到的值是最精确的。同步

## 如何避免犯错？
  - 避免使用table布局。
  - 尽可能在DOM树的最末端改变class。 8.html
  - 避免设置多层内联样式。
  - 将动画效果应用到position属性为absolute或fixed的元素上。
  避免使用CSS表达式（例如：calc()）。


DOM → CSSOM → Render Tree → Layout → Paint → Composite（合成）
正常元素会被一起绘制到一个图层中。
合成层 是浏览器为某些特殊元素单独分配的图层，它们可以单独绘制、动画、合成，不会引起整个页面的重排或重绘，从而提升性能。
浏览器会为使用了 transform 的元素自动分配一个合成层（尤其是硬件加速时）。

但，为了确保触发合成层和获得最佳性能，可以使用以下几种方式：

✅ 常见的触发合成层的方法
方法	示例	是否推荐	原因
transform: translateZ(0)	element.style.transform = "translateZ(0)";	✅ 推荐	常用于显式触发 GPU 合成层
will-change: transform	element.style.willChange = "transform";	✅ 推荐	告诉浏览器“我即将改变某些属性”，提前优化准备
opacity 动画	transition: opacity 0.3s;	✅ 推荐	也会触发合成层，不影响布局
filter	filter: blur(2px);	✅ 可用	类似 transform，独立图层
position: fixed（有时）	position: fixed;	⚠️ 视浏览器实现而定	一些浏览器会自动提升 fixed 元素为独立层
video, canvas, iframe	<video> 标签等	✅ 自动合成层	原生元素通常默认是独立层
opacity: 0 + display: none/block	先隐藏再显示	❌ 不一定触发合成层，但能防止首次闪烁	


.box {
  transform: translateZ(0); /* 硬件加速触发合成层 */
  will-change: transform;   /* 告诉浏览器即将变动 */
  transition: transform 0.3s ease;
}

使用 transform 和 will-change 可以显式触发合成层，从而让动画更流畅、避免回流；配合 translateZ(0) 或隐藏-显示策略能进一步优化首次动画的性能。

13.html 

## JavaScript

- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
  14.html
  
- 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
- 也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。
  position: absolute; + transform 
