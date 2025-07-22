// src/components/Nav.jsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/user';

function Nav() {
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link> | 
      <Link to="/pay">Pay</Link> | 
      {!token && <Link to="/login">Login</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Nav;
