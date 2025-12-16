// src/App.jsx
import { HashRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './router';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </Router>
  );
}

export default App;