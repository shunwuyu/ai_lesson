# 动画

- 怎么做动画？
每帧手动操作 DOM，触发布局（reflow）和重绘（repaint）；
修改 style.left，影响 layout，浏览器需要重新计算元素位置；
会掉帧，导致卡顿。

- 为什么用transition 
    浏览器渲染流程中，布局后会将页面分层（合成层），如含 transform、opacity 等的元素可单独成层，由 GPU 合成，避免频繁重排重绘，提高动画性能和平滑度。
    浏览器用 合成层（compositor layer） 控制动画；
    对 transform 或 opacity 的过渡甚至不会触发重绘；
    CSS 动画可由浏览器 GPU 加速，更平滑更省资源。

    JS 动画易控制但易卡顿，CSS 过渡性能更优，推荐优先使用。

- 重排 Reflow
    当元素的几何属性变化时（如宽、高、位置、字体大小），浏览器必须重新计算其及其子元素的布局。
    element.style.width = "500px"; // 改变尺寸，触发重排
- 重绘
    重绘 = 重新绘制像素（颜色、边框等）
    元素外观变化但不影响布局（如颜色、背景、visibility），只需重绘，不需要重新计算位置。
    element.style.backgroundColor = "red"; // 只改变外观，触发重绘

对比项	重排（Reflow）	重绘（Repaint）
影响范围	可能影响整个页面布局	通常只影响自身或子元素像素
性能消耗	更高（布局 + 重绘）	较低（仅重绘）
触发条件	位置、大小、字体、DOM结构等变化	背景、颜色、可见性等变化

- 重排操作
el.style.height = "100px";
el.classList.add("new-class");
document.body.appendChild(el);
- 触发重绘的操作：
el.style.color = "blue";
el.style.border = "1px solid red";

如何优化？
1. 避免频繁操作 DOM
for (let i = 0; i < 100; i++) {
  el.style.width = i + 'px';
}

// ✅ 推荐：合并操作
el.style.cssText = "width:100px;height:100px;background:red;";

2. 使用 class 替代逐条改样式
el.classList.add('active'); 

3. 避免同步布局查询
el.offsetHeight;
el.scrollTop;
getComputedStyle(el);
尽量不要在修改样式后立刻读取这些属性，会造成强制同步回流。

4. 使用 transform 和 opacity 实现动画


<div id="box" style="height: 100px; background: lightblue;"></div>
<button onclick="expand()">点击展开</button>

<script>
  function expand() {
    const box = document.getElementById("box");

    // 修改高度前
    box.style.height = "200px";

    // 读取 offsetHeight，会强制浏览器计算新高度，触发回流
    console.log("当前高度是：", box.offsetHeight); // 输出：200

    // 此时浏览器被迫立即重新计算布局
  }
</script>

## 变换 

2D变换在平面中操作，3D变换在空间中操作，2D与3D的概念相信很多同学都知道。变换可理解为将节点复制一份并生成新图层，原节点隐藏，在新图层中使用新节点进行变换操作。

transform-style可实现2D变换与3D变换间的切换

transform-style在父节点中声明，即发生变换的节点的父节点。

flat：所有变换效果在平面中呈现(默认)
preserve-3d：所有变换效果在空间中呈现 3.html

translate
scale
skew
rotate

为节点声明transform:translate3d()或transform:translateZ()，它们都能开启GPU硬件加速模式

## 3D


https://juejin.cn/post/6935232082482298911?searchId=202506241050383A797A082E42D447B9F3#heading-36

<div class="container">
    <h1>Hello, World!</h1>
</div>

{
    "type": "element",
    "tagName": "div",
    "attributes": {
        "class": "container"
    },
    "children": [
        {
            "type": "element",
            "tagName": "h1",
            "attributes": {},
            "children": [
                {
                    "type": "text",
                    "content": "Hello, World!"
                }
            ]
        }
    ]
}

DOM 构建:  最后，由于 HTML 标记定义不同标记之间的关系（一些标记包含在其他标记内），创建的对象链接在一个树数据结构内，此结构也会捕获原始标记中定义的父项-子项关系: HTML 对象是 body 对象的父项，body 是 paragraph 对象的父项，依此类推。


构建 DOM 树对象的意义在于提供文档结构的层次化表示，使浏览器能够高效地渲染、更新和操作网页内容。

是的，DOM 树对象使 JavaScript 能够方便地访问和修改网页元素，实现动态交互和响应用户操作。

cssom 
{
    "type": "stylesheet",
    "rules": [
        {
            "type": "rule",
            "selector": "body",
            "declarations": [
                {
                    "property": "font-size",
                    "value": "16px"
                }
            ]
        }
    ]
}

渲染树
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd08d03c593c41ffbc618d0316c7c871~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

布局阶段以渲染树为入参，从根节点开始遍历，先通过渲染树的 styles 属性获取盒模型，再结合元素定位属性（如 position ）和展示属性（如 display ）计算元素的位置和尺寸，从而创建布局树

.will-change	will-change: transform	✅ 是	will-change 明确告诉浏览器未来会更改 transform，浏览器提前分配一个独立图层。

.transform	transform: skew(...)	❌ 否（视浏览器而定）	普通的 2D transform（如 skew）可能不会单独创建图层，除非结合动画、opacity 或其它性能敏感的属性。

<iframe>	-	✅ 是	所有 iframe 默认就是独立图层（安全隔离 + 性能），属于浏览器合成层的一部分。

主文档的主图层（用于渲染未提到的其它普通元素）

.transform（合成到主图层中）

.will-change（单独图层）

.box_3d（单独图层）

.position_（固定定位 + z-index 提升 + 独立图层）

<iframe>（系统自动创建的独立图层，通常在顶层或者 z-index 控制下）