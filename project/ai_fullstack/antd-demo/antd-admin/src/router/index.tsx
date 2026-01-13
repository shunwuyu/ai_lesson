import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Login from '../pages/Login';
import Home from '../pages/Home/index';

// 路由守卫：验证是否登录
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuthStore();
  // 未登录 → 重定向到登录页
  if (!isLogin) {
    return <Navigate to="/login" replace/>;
  }
  return children;
};

const LoginGuard = () => {
  const { isLogin } = useAuthStore();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

// 定义路由规则
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginGuard />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  // 404 路由（可选，补充完整）
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

// 创建浏览器路由
export const router = createBrowserRouter(routes);