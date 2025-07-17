import React, {  lazy, Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Pay = lazy(() => import('./pages/Pay'));
const Nav = lazy(() => import('./components/Nav'));


function App() {
  return (
  
    <>
    <Nav />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pay" element={
          <RequireAuth>
            <Pay />
          </RequireAuth>
        } />
      </Routes>
    </Suspense>
    </>
  );
}

export default App;
