[source](https://juejin.cn/post/7079785777692934174?searchId=20240924083143E554511DD6DFD14B94D2)

- npm i -g pnpm 
    pnpm 是一个快速、节省磁盘空间的 npm 包管理器，通过创建符号链接来避免重复安装相同的模块。
    当安装一个包时，pnpm 会将这个包的实际文件存储在一个全局存储目录中，然后在项目的 node_modules 目录下创建指向这些文件的硬链接或符号链接。这样做的好处是，如果多个项目依赖于同一个版本的包，它们可以共享全局存储中的同一份文件，从而大大减少了磁盘使用量，并且加快了安装速度。

- yarn 与 npm 区别
    npm：作为最早也是最流行的包管理器，npm 拥有庞大的社区支持和丰富的包生态系统。
    Yarn：虽然起步较晚，但由于 Facebook、Google 等大公司的支持，也迅速积累了大量用户和贡献者。
    随着时间的发展，两者之间的差异正在逐渐缩小。

- npx 是 npm 自带的一个工具，用于临时执行 npm 包中的命令，无需事先全局安装该包。

- cnpm 是一个针对中国大陆用户的 npm 镜像客户端，旨在加速 npm 包的下载和提升国内用户的使用体验。

- nvm  node 版本管理
    https://github.com/coreybutler/nvm-windows/releases
    nvm list
    nvm 

- 创建项目
    - pnpm create vite
    - npm init vite@latest
    - yarn create vite
- proxy 代理
    通过设置 proxy 配置项，你实际上是在搭建一个代理服务器。这个代理服务器运行在与前端应用相同的服务器上，因此从技术上讲，前端应用向这个代理服务器发送的所有请求都是同源的，不会受到跨域限制。

    具体实现原理
    前端请求重定向：当你在开发环境中配置了如上的代理规则后，任何以 /api 开头的请求都会被代理服务器捕获，并根据 rewrite 函数将路径中的 /api 去掉，然后转发给目标地址（即 target 指定的URL）。
    后端响应处理：目标服务器接收到请求并返回数据给代理服务器。因为对于目标服务器来说，请求是来自代理服务器的，而不是直接来自用户的浏览器，所以不存在跨域的问题。
    代理转发响应：代理服务器接收到后端服务的响应后，再将这些响应转发给原始的客户端（浏览器）。由于整个过程中，前端应用只与代理服务器通信，而代理服务器与目标服务器通信，这有效地绕过了浏览器的同源策略限制。

- .vue 报错 
src/shims-vue.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
} 

shims-vue.d.ts 文件是一个类型声明文件，用于向 TypeScript 提供额外的类型信息。
在这个文件中，你声明了一个模块 *.vue，告诉 TypeScript 所有的 .vue 文件都应该被视为一个 DefineComponent 类型的模块。

declare module '*.vue'：
这行代码声明了一个模块模式匹配器，匹配所有以 .vue 结尾的文件。

export default component;：
这行代码导出了 component 常量，使得 .vue 文件可以被其他模块导入。

