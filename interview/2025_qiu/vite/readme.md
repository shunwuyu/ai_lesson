# VITE 

Vite 是一个基于原生 ES 模块和浏览器现代特性、通过按需编译实现极速冷启动与热更新的新一代前端构建工具。

demo1
<script type="module" src="/src/main.jsx"></script>

- 为什么Vite 快
    不支持 IE11

早期浏览器不支持ES模块，需打包合并文件、转换语法、处理依赖，减少HTTP请求并兼容旧环境。


webpack 需要打包的
![](https://pic.rmb.bdstatic.com/f78661bef717cf2cc2c2e5158f196384.png)

vite 开发时无需打包，实现按需编译与极速启动。