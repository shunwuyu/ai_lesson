import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Nav() {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/pay">Pay</Link> |
      {!state.token && <Link to="/login">Login</Link>}
      {state.token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

export default Nav;