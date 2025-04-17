# 物理像素 设备像素  像素单位之间的关系

- 在前端开发和移动端适配中，常见的有物理像素（Physical Pixel）和设备独立像素（Device-Independent Pixel，简称设备像素或 CSS 像素

- 物理像素（Physical Pixel）
    指屏幕上最小的显示单元，是硬件层面的像素点。
    不同设备的物理像素密度（PPI）不同。

- 设备像素（Device Pixel / CSS Pixel）
    也称为逻辑像素、CSS像素，是前端开发中用来布局和样式的单位。
    1个CSS像素在不同设备上可能对应多个物理像素。

- 关系：设备像素比（Device Pixel Ratio, DPR）
    设备像素比 = 物理像素 / 设备像素

    iPhone的DPR为2时，1个CSS像素等于2×2=4个物理像素。
    iPhone 的 DPR 为 2 时，1 个 CSS 像素 = 2（宽）× 2（高）= 4 个物理像素，
    因为像素是二维的，即包括 宽度和高度，所以总共是 4 个物理像素组成一个 CSS 像素的“面积”。

    物理像素 是你屏幕上真实存在的小点点（点阵）。

    通过window.devicePixelRatio可以获取当前设备的DPR。（调试）

- 怎么适配
    1. 使用 rem + Flexible / PostCSS
        px2rem
        (function() {
  function setRem() {
    // 以设计稿375px为基准，1rem = 1/10 屏幕宽度
    var html = document.documentElement;
    var width = html.clientWidth;
    html.style.fontSize = (width / 10) + 'px';
  }
  setRem();
  window.addEventListener('resize', setRem);
})();
        
    2. 使用 vw / vh 单位
        原生 CSS 支持，无需额外 JS 或插件
    3. 媒体查询
    
- viewport
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    视口宽度等于设备的物理宽度（以 CSS 像素为单位），保证页面在不同设备上宽度自适应。

    initial-scale=1.0
    只是让页面的CSS像素宽度和设备的CSS像素宽度一致。

    maximum-scale=1.0
    用户最大只能缩放到1倍，禁止放大页面。

