import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 使用 lazy 进行组件懒加载
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));

// 加载时的占位组件
const LoadingFallback = () => (
  <div className="loading">
    Loading...
  </div>
);

function App() {
  return (
    // Router 在外层，确保路由系统完全初始化
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        
        {/* Suspense 包裹可能需要懒加载的路由组件 */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
