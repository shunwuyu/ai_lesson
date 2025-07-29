// App.tsx
import { useState, lazy, Suspense } from 'react';
import Loading from './components/Loading';
import './App.css';
import { 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import MainLayout from './components/MainLayout/index.jsx';
import BlankLayout from './components/BlankLayout/index.jsx';

const Home = lazy(() => import('./pages/Home/index.jsx'))
const Discount = lazy(() => import('./pages/Discount/index.jsx'))
const Collection = lazy(() => import('./pages/Collection/index.jsx'))
const Trip = lazy(() => import('./pages/Trip/index.jsx'))
const Account = lazy(() => import('./pages/Account/index.jsx'))
const Search = lazy(() => import('./pages/Search/index.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/index.jsx'))
const Login = lazy(() => import('./pages/Login/index.jsx'))
const Detail = lazy(() => import('./pages/Detail/index.jsx'))
const App = () => {
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      
    </>
  );
};

export default App;
