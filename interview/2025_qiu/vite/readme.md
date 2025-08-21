# VITE 

Vite 是一个基于原生 ES 模块和浏览器现代特性、通过按需编译实现极速冷启动与热更新的新一代前端构建工具。

demo1
<script type="module" src="/src/main.jsx"></script>

- 为什么Vite 快
    不支持 IE11

早期浏览器不支持ES模块，需打包合并文件、转换语法、处理依赖，减少HTTP请求并兼容旧环境。
App.jsx 依赖 components/Hello.jsx  useState react  
import 是没有办法解析的， 先react, hello, 再 App.jsx 就能允许了