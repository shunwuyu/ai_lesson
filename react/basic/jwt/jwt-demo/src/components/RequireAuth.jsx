import { useAuth } from '../hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
    const { state } = useAuth();
    const location = useLocation();
  
    if (!state.token) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
  
    return children;
}

export default RequireAuth;