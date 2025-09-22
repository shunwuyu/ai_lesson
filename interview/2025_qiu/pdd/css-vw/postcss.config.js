// postcss.config.js
export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,           // 设计稿宽度
      viewportHeight: 667,          // 可选，设计稿高度
      unitPrecision: 6,             // 转换后保留的小数位
      viewportUnit: 'vw',           // 转换成的单位（注意：通常使用 'vw' 或 'vh'，但 postcss-px-to-viewport 默认是 'vw'）
      selectorBlackList: ['ignore'], // 忽略的类名
      minPixelValue: 1,             // 小于或等于1px不转换
      mediaQuery: false,            // 允许在媒体查询中转换
    },
  },
};