import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import KeepAlive from './KeepAlive'

function RouterWithKeepAlive() {
  const location = useLocation()

  return (
    <div>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      {/* 用 KeepAlive 包裹 Home，实现状态缓存 */}
      <KeepAlive active={location.pathname === '/'}>
        <Home />
      </KeepAlive>

      {/* About 不缓存 */}
      {location.pathname === '/about' && <About />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RouterWithKeepAlive />
    </BrowserRouter>
  )
}
