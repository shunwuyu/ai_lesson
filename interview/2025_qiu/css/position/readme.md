# position

- 基础定义
先把 position 的五种值解释清楚，但不只是死记硬背，而是用一句话 + 场景让人一听就明白

static 默认值，不定位，元素按正常文档流布局 网页正文的段落排版
relative 相对自身原位置偏移，不脱离文档流 给按钮加小红点角标
absolute 相对最近的 非 static 祖先 定位，脱离文档流  弹出菜单定位到按钮
fixed   相对 视口 定位，脱离文档流      页面右下角悬浮客服按钮 弹窗
sticky 是一种CSS定位方式，它让元素在滚动到特定阈值（top）前表现得像相对定位，到达阈值后固定在视口中，实现类似吸顶或吸附效果，适用于创建随页面滚动的固定导航或表头（fixed）。
<th> 元素在滚动过程中，距离其最近的具有滚动机制的祖先容器的 

position: sticky 底层依赖 IntersectionObserver / 滚动偏移计算

sticky 元素在滚动过程中会：

正常流中滚动（像 relative）；
当它到达某个阈值（如 top: 0）时，“感知”到自己即将离开视口，于是变为固定定位；
滚动超过它后，又恢复为正常流。
这个“感知是否进入/离开某个区域”的能力，和 IntersectionObserver 的功能高度相似。


对比项	IntersectionObserver	position: sticky
功能	监听元素是否进入/离开视口或某个容器	元素滚动到边界时“吸住”
原理	浏览器在底层监听滚动并计算元素与容器的交叉区域	浏览器监听滚动并计算位置
性能	高效异步，不阻塞渲染	同样由浏览器原生高效实现
触发条件	基于几何交叉（intersection）	基于几何位置（offset + 滚动）

sticky 的行为逻辑，就像浏览器内部为该元素创建了一个“隐形的观察者”，持续判断：“我现在是不是该 sticky 了？”——这正是 IntersectionObserver 的思想。

- 定位参照系
    - absolute → 找最近的 position !== static 的祖先（没有就找 <html>
    - fixed → 直接相对视口（但 transform 会改变参照系，尤其是 transform: translateZ(0) 会让 fixed 元素“绑”到某个容器）

    - sticky → 依赖滚动容器（不是总是 window

- 独立图层渲染
    - position:absolute 会独立图层吗？
    不会仅因为 position: absolute 就创建独立图层。
    transform: translateZ(0) 或 translate3d() 触发硬件加速，强制提升图层
    will-change: transform 或 opacity 提示浏览器未来会变化，可能提前分层
    opacity 动画或 transform 动画  浏览器为性能考虑，常将其分层
    filter 滤镜（如 blur） 通常需要独立图层处理


    独立图层渲染可提升性能，尤其适用于动画。元素独立后，合成由GPU处理，避免重排重绘。但过多图层会增加内存和管理开销，应合理使用，如配合transform、opacity实现高效动画。

    3.html 看layers 图层 

    4.html

- position fixed 失效
    transform 会创建一个新的“包含块”（containing block），fixed 不再相对于视口定位，而是相对于这个 transform 容器。
    5.html




