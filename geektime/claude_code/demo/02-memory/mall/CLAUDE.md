# 项目：电商平台前端

## 技术栈
- React 18 + TypeScript
- Vite 构建
- TanStack Query（数据获取）
- Zustand（状态管理）
- Tailwind CSS

## 目录结构
src/ 
├── components/ # 组件 
│ ├── ui/ # 基础 UI 
│ └── features/ # 功能组件 
├── pages/ # 页面 
├── hooks/ # 自定义 Hooks 
├── stores/ # Zustand stores 
├── api/ # API 调用 
└── types/ # 类型定义

## 组件规范
- 函数组件 + Hooks
- Props 接口命名: `XxxProps`
- 一个组件一个目录: `Button/index.tsx`

## 状态管理
- 服务端状态: TanStack Query
- 客户端状态: Zustand
- 本地状态: useState

## 常用命令
- `pnpm dev` - 开发服务器
- `pnpm build` - 构建
- `pnpm test` - 测试