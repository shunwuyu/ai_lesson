import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, Suspense, lazy } from 'react'
import './App.css'
// import Home from './views/Home';
const Home = lazy(() => import('./views/Home'));
// import About from './views/About';
const About = lazy(() => import('./views/About'));
import Navigation from './components/Navigation';
import UserProfile from './views/UserProfile';
import Products from './views/Products';
import ProductDetails from './views/Products/ProductDetails';
import NewProduct from './views/Products/NewProduct';
import NotFound  from './views/NotFound';
import NewPath from './views/NewPath';
import Login from './views/Login';
import ProtectRoute from './ProtectRoute';
import Pay from './views/Pay';

function App() {

  return (
    <>
      
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
        {/* 放下外面和里面 */}
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            {/* 动态路由 */}
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/products" element={<Products />}>
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
            {/* 跳转 重定向 
            旧路由地址改版
            旧链接废弃
            /home  改成 / 
            访问 / 时不需要首页，直接进入仪表盘
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            限时活动地址 /summer‑sale，活动结束，重定向到活动公告页 
            <Route path="/summer-sale" element={<Navigate replace to="/activity-close" />} />

            */}
            <Route path="/old-path" element={<Navigate replace to="/new-path" />} />
            <Route path="/new-path" element={<NewPath />}/>
            <Route path="/login" element={<Login />}/>
            {/* 先登录 */}
            <Route path="/pay" element={
              // 把 <ProtectRoute> 想成一个 门禁保安 ， 
              // <Pay /> 是你要进的 房间 。
              // children 就是夹在 ProtectRoute 开闭标签中间夹的那个孩子
              <ProtectRoute>
                <Pay />
              </ProtectRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
