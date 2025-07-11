import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // 检查 localStorage 中的 isLogin
  const isLoggedIn = localStorage.getItem('isLogin') === 'true';
  
  if (!isLoggedIn) {
    // 如果未登录，则导航到登录页面，并保存当前路径以便登录后重定向
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果已登录，则渲染子组件
  return children;
}

export default ProtectedRoute;