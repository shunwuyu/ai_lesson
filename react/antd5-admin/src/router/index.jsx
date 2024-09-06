import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Login from '@/pages/Login'
const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter