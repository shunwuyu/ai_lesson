## 为何要适配？
在移动端，设备宽度差异大。设计稿一般是按照 某一分辨率（如 375 或 750px） 来设计，但实际用户设备可能是多种分辨率。我们希望页面在不同设备下布局一致、字体比例合理，这就需要适配方案。

## 主流适配方案对比
- em/rem  html font-size 简单直观，社区成熟  字体/边框等需要手动兼容
- vw/vh   使用相对视口宽度/高度单位 更原生，不依赖 JS   兼容性问题，
- 媒体查询（响应式） 针对不同宽度写多个断点样式 灵活自由   样式臃肿，维护成本高
- flexible + px2rem  淘宝早期方案，动态设置根字体 稳定可靠，适合老项目 引入 JS 动态计算字体

## 动态计算字体的代码
(function flexible(window, document) {
  const docEl = document.documentElement;
  const dpr = window.devicePixelRatio || 1;

  function setRemUnit() {
    const width = docEl.clientWidth;
    docEl.style.fontSize = (width / 10) + 'px'; // 设计稿宽度 / 10
  }

  setRemUnit();
  window.addEventListener('resize', setRemUnit);
})(window, document);

module.exports = {
  plugins: {
    'postcss-px2rem': {
      remUnit: 75, // 750px 设计稿，1rem = 75px
      remPrecision: 6
    }
  }
}

npm i postcss-px-to-viewport -D

module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};

## 业务中会用tailwindcss 快速实现适配
<div class="text-sm sm:text-base md:text-lg lg:text-xl">
  根据设备宽度自动调整字体大小
</div>
