import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import App from '../App'
import Login from '@/pages/Login'
import Layout from '@/Layout'
import Home from '@/pages/Home'

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                {/* 可以在这里添加更多子路由 */}
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter