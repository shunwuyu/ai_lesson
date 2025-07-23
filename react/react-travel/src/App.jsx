// App.tsx
import { Tabbar } from 'react-vant';
import {
  HomeO,
  Search,
  FriendsO,
  SettingO,
  UserO,
} from '@react-vant/icons';
import { useState, lazy, Suspense } from 'react';
import { 
  useNavigate,
  Routes,
  Route
} from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/index.jsx'))
const Discount = lazy(() => import('./pages/Discount/index.jsx'))
const Collection = lazy(() => import('./pages/Collection/index.jsx'))
const Trip = lazy(() => import('./pages/Trip/index.jsx'))
const Account = lazy(() => import('./pages/Account/index.jsx'))

const App = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const tabs = [
    { icon: <HomeO />, title: '首页', path: '/home' },
    { icon: <Search />, title: '特惠专区', path: '/discount' },
    { icon: <FriendsO />, title: '我的收藏', path: '/collection' },
    { icon: <SettingO />, title: '行程', path: '/trip' },
    { icon: <UserO />, title: '我的账户', path: '/account' },
  ];

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Suspense>
      <Tabbar activeKey={active} onChange={(key) => {
        setActive(key);
        navigate(tabs[key].path);
      }}>
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </>
  );
};

export default App;
