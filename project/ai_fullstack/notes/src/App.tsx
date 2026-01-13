import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import Home from './pages/Home';
import Mine from './pages/Mine';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页独立，不带底部栏 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 主布局，包含底部栏 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mine" element={<Mine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;