import {
  Suspense,
  lazy
} from 'react';
import { AliveScope } from 'react-activation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import Loading from '../components/Loading';
// const Home = lazy(() => import('@/pages/Home'));
const Home = lazy(() => import('@/components/KeepAliveHome'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const PostDetail = lazy(() => import('@/pages/PostDetail'));
const Chat = lazy(()=> import('@/pages/Chat'));

export default function RouterConfig() {
  return (
    <Router>
      <AliveScope>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* 登录页独立，不带底部栏 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/post/:id" element={<PostDetail />} />
            {/* 主布局，包含底部栏 */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/mine" element={<Mine />} />
            </Route>
          </Routes>
        </Suspense>
      </AliveScope>
    </Router>
  )
}
