# react 旅游 APP 
ReadMe.md 很重要 方便面试官 
- 移动App 
- 模仿 App
    - 喜欢的、国外的 
    - 有点改变
- 绝大多数的考点
    - 都适用于任何App 

## 技术栈
- React全家桶
    React 组件开发
    组件的封装 
    第三方组件库 
    受控和非受控
    hooks编程 自定义的hooks  
    React-Router-DOM
        SPA
        路由守卫
        懒加载
    Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt 登录 
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo .....
- css 预处理器  stylus 
    flex transition transform。。。
- LLM
    - chat
    - 生图
    - 语言
    - coze  工作流 调用
    - 流式输出
- 移动端适配
    rem 
- 单例模式 设计模式的理解 
- git 提交等编程风格 
## 项目的架构
- components
- pages
- store
- hooks
- api
- mock

## 开发前的准备 
- 安装的包
    react-router-dom zustand axios 
     react-vant(UI组件库) lib-flexible(移动端适配)
    开发期间的依赖
    vite-plugin-mock jwt
- vite 配置
    - alias 
    - mock 
    - .env.local
    llm apiKey 
    - user-scalable
    - css 预处理
        index.css reset  
        box-sizing  font-family:-apply-system
        App.css  全局通用样式 
        module.css 模块化样式 
    - 移动端适配 rem 
        不能用px,相对单位rem html 
        不同设备上体验要一致
        不同尺寸手机 等比例缩放 
        设计师设计稿 750px iphone 4  375pt *2 = 750 
        小米 
        css 一行代码   手机不通尺寸 html font-size 等比例
        layout 
        flexible.js 阿里 在任何设备上
        1rem = 屏幕宽度/10
- lib-flexible
    阿里开源
    设置html fontSize = window.innerWidth / 10
    css px 宽度 = 手机设备宽度 = 375
    1px = 2发光源
    750px 设计稿

- 设计稿上一个盒子的大小？
    - 1像素不差的还原设计稿
    - 设计稿中像素单位
    - /75 

## 项目亮点
- 移动端适配
    - lib-flexible  1rem = 屏幕宽度/10
    - 设计稿 尺寸是iphone 标准尺寸 750px
    - 前端的指责是还原设计稿
    - 频繁的单位 260/75 换算
    - 自动化？ 
        postcss+ postcss-pxtorem
## git 提交规范