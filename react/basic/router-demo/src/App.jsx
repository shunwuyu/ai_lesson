import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './views/Home';
import About from './views/About';
import Navigation from './components/Navigation';
import UserProfile from './views/UserProfile';
import Products from './views/Products';
import ProductDetails from './views/Products/ProductDetails';
import NewProduct from './views/Products/NewProduct';
import NotFound  from './views/NotFound';
import NewPath from './views/NewPath';
import Login from './views/Login';
import ProtectRoute from './ProtectRoute';
import Pay from './views/Pay';

function App() {

  return (
    <>
      
      <Router>
        {/* 放下外面和里面 */}
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* 动态路由 */}
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<ProductDetails />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          
          <Route path="/old-path" element={<Navigate replace to="/new-path" />} />
          <Route path="/new-path" element={<NewPath />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/pay" element={
            <ProtectRoute>
              <Pay />
            </ProtectRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
