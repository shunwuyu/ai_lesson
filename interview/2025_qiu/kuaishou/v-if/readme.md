渲染机制差异

v-if 是 条件渲染：

当条件为 false 时，DOM 元素 不会被渲染，也不会存在于页面上。

再次切换为 true 时，会重新创建 DOM 元素。

v-show 是 显示隐藏：

无论条件是否为 true，都 会渲染 DOM 元素，只是通过 display: none 控制显示隐藏。

性能差异

v-if 切换频率低、条件复杂时性能好，因为不需要频繁渲染和销毁 DOM。

v-show 切换频率高时更好，因为只改变 CSS 样式，避免频繁销毁和创建 DOM。

总结使用场景

v-if：适合条件很少切换的情况，如权限控制、路由条件渲染。

v-show：适合频繁显示/隐藏的 UI 元素，如切换 Tab 页、手风琴面板。

示例分析

点击按钮切换 visible：

v-if 的 p 标签会销毁和重建 DOM，控制台可能触发钩子函数（如 mounted、beforeUnmount）。

v-show 的 p 标签 DOM 一直存在，只是 CSS display 发生变化，不触发 DOM 钩子。