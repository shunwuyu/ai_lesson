- 两个按钮都红了....
类名冲突。两个组件都用了 .button，而浏览器会根据 CSS 文件加载顺序，最终生效的是最后一个定义的 .button 样式。

- 使用 CSS Modules
