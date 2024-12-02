import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import About from '../pages/About'
import Home from '../pages/home'

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />}/>
                <Route path="about" element={<About />}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter