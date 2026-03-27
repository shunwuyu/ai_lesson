// src/entry-client.jsx
import React from 'react'
// hydrateRoot 是 React 18 引入的 API，用于将服务端渲染（SSR）生成的静态 HTML 转换为可交互的客户端应用。
import { hydrateRoot } from 'react-dom/client'
import App from './App'
// 将服务端渲染生成的静态 HTML 转换为可交互的客户端应用
// 可注释看到效果
hydrateRoot(document.getElementById('app'), <App />)