import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import About from '../pages/About'
import Home from '../pages/home'
import NotFound from '../pages/not-found'

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />}/>
                <Route path="about" element={<About />}/>
                <Route path="*" element={<NotFound />}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter