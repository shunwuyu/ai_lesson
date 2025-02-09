- npm i mobx mobx-react-lite
  mobx 是一个简单、可扩展的状态管理库，它通过透明的函数响应式编程（TFRP）使得状态管理变得更加直观和高效。
  mobx-react-lite 是 mobx 的一个轻量级版本，专门为React函数组件设计，提供了与React Hooks集成的功能。

- npm install tailwindcss @tailwindcss/vite
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({
    plugins: [
      tailwindcss(),
    ],
  })

  @import "tailwindcss";