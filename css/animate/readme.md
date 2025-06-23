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