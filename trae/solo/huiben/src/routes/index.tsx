import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// 页面组件
import HomePage from '@/pages/home';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import BooksPage from '@/pages/books';
import ActivitiesPage from '@/pages/activities';
import ReadingRecordPage from '@/pages/reading-record';
import ProfilePage from '@/pages/profile';

// 懒加载的页面
const BookDetailPage = lazy(() => import('@/pages/books/BookDetail'));
const ActivityDetailPage = lazy(() => import('@/pages/activities/ActivityDetail'));
const CartPage = lazy(() => import('@/pages/cart'));
const CheckoutPage = lazy(() => import('@/pages/checkout'));
const PaymentPage = lazy(() => import('@/pages/payment'));
const ProfileChildrenPage = lazy(() => import('@/pages/profile/Children'));
const ProfileOrdersPage = lazy(() => import('@/pages/profile/Orders'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* 首页 */}
      <Route path="/" element={<HomePage />} />
      
      {/* 认证相关 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* 绘本相关 */}
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      
      {/* 活动相关 */}
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:id" element={<ActivityDetailPage />} />
      
      {/* 阅读记录 */}
      <Route path="/reading-record" element={<ReadingRecordPage />} />
      
      {/* 用户中心 */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/children" element={<ProfileChildrenPage />} />
      <Route path="/profile/orders" element={<ProfileOrdersPage />} />
      
      {/* 购物相关 */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      
      {/* 404页面 */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
          <p className="text-xl text-neutral-600 mb-8">页面未找到</p>
          <a href="/" className="btn-primary">返回首页</a>
        </div>
      </div>} />
    </Routes>
  );
};

export default AppRoutes;