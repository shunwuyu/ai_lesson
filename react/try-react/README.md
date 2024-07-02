# React组件化， 大型团队的协作

- 脚手架 
    create-react-app  官方
    npm init vite 用vite来初始化 react + js 快（vite）

- index.html 首页 
    #root 挂载点
- src/main.jsx 单点入口  type="module"
- 根节点
    - root.render 
    - react.creatElement 
- 组件
    component
    components  拼乐高
    - 根组件  App
        - JSX 里用html标签的方式来插入
        - 标签不是html内置标签， 而是组件本身
    - 子组件
    - 旧开发打理的是真实DOM树
    - 组件树 （React 组件树）子组件

- 关系
    - 网页(#root)<- 组件(App)<- element 节点 + css + js 

- 模块化
    - script 默认不支持模块化，早期的前端处理的业务主要是DOM交互和事件,不存在太多扩文件的需求，所以简单， 没有模块化， 
    - node v8引擎封装到命令行，js解析 数据库，文件，网络....
    require + module.exports
    - ES6模块化 前端App 越来越复杂，react 几万个组件拼起来的
    - commonJS不太优秀，推出了 es6 module 
    - <script type="module"></script> 打开浏览器的模块化支持
    - 一个文件只做一件事

