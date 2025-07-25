import { useState, useEffect } from 'react';
import {
  HomeO,
  Search,
  FriendsO,
  SettingO,
  UserO,
} from '@react-vant/icons';
import { Tabbar } from 'react-vant';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const tabs = [
  { icon: <HomeO />, title: '首页', path: '/home' },
  { icon: <Search />, title: '特惠专区', path: '/discount' },
  { icon: <FriendsO />, title: '我的收藏', path: '/collection' },
  { icon: <SettingO />, title: '行程', path: '/trip' },
  { icon: <UserO />, title: '我的账户', path: '/account' },
];

const MainLayout = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    const index = tabs.findIndex(tab => location.pathname.startsWith(tab.path));
    console.log(index)
    if (index > -1) {
      setActive(index);
    }
  }, [location.pathname]); // ✅ 添加依赖项

  return (
    <div className="flex flex-col h-screen" style={{paddingBottom:'50px'}}>
      <div style={{height:'100%'}}>
        <Outlet />
      </div>
      <Tabbar value={active} onChange={(key) => {
        setActive(key);
        navigate(tabs[key].path);
      }}>
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};

export default MainLayout;