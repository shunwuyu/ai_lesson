import React, { Suspense } from 'react';
import avatar from './images/avatar.webp';
import book from './images/book.webp';
import { add } from './math'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 👇 懒加载路由组件
const Home = React.lazy(() => import('./pages/Home.tsx'));
const About = React.lazy(() => import('./pages/About.tsx'));

const Hello = () => {
    return (
        // <>
            

        //     hello world
        //     你好
        //     <img src={avatar} alt="" />
        //     <img src={book} alt="" />
        //     { add(1 + 2) }
        // </>

        <Router>
            {/* 👇 Suspense 包裹懒加载的组件，提供 loading 状态 */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default Hello;