- styled-components

  styled-components 的价值在于把样式“组件化、动态化、作用域化”。

  首先，Button 本身就是一个 React 组件，样式和结构绑定在一起，避免了传统 CSS 中样式分散、命名冲突的问题，不再需要想 btn-primary / btn-default 这种类名。
  其次，样式可以直接使用 props（如 primary），用 JS 逻辑控制样式变化，比切换 class 更直观、更安全，特别适合复杂业务状态。
  再次，每个 styled 组件天然是 局部作用域，不会污染全局样式，组件可复用、可维护性更强。
  本质上，styled-components 让样式成为“真正的组件能力”，非常契合 React 的组件化思想。