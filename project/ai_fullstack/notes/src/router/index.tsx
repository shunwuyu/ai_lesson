import {
  Suspense,
  lazy
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import Loading from '../components/Loading';
const Home = lazy(() => import('@/pages/Home'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const PostDetail = lazy(() => import('@/pages/PostDetail'));

export default function RouterConfig() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 登录页独立，不带底部栏 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          {/* 主布局，包含底部栏 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mine" element={<Mine />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
