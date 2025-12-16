// src/router/index.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

// 导出路由配置组件（不包含 Router，只包含 Routes）
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}