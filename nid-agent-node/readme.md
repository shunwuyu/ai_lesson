![](https://ninghao.co/c/fmbFfW)

- pnpm 
  npm install -g pnpm
- demo 运行大模型
- utils/deepseek.mjs
  .env
  index.mjs 模块化引入
  不同的模型
- 直接请求http 接口 
  装插件 REST Client
  request.http

  fetch 发送请求
  index.mjs

- 第一个应用
  vue 版本 agent-vue
  react 版本 agent-react

- vue react 区别
  核心区别与理念：

响应式原理
Vue 使用 ref 自动追踪依赖（Proxy 实现）
React 需手动 setState 触发更新（不可变数据）

模板 vs JSX
Vue 类 HTML 模板 + 指令（v-model, @click）
React 纯 JS 语法（JSX + 原生事件）

API 设计
Vue 组合式 API 聚合相关逻辑（<script setup>）
React Hooks 分离状态逻辑（useState）

各自优势：

Vue 优势
更简洁的模板语法
内置响应式系统（减少样板代码）
官方生态集成度高

React 优势
JSX 更灵活的编程能力
Hooks 组合性更强
生态更丰富（如状态管理）

代码体现差异：

Vue 的 v-model 比 React 的 onChange+value 更简洁

React 需手动处理加载状态（Vue 示例未实现）

Vue 事件修饰符（@keyup.enter） vs React 原生事件判断

