// App.jsx
import React, { useEffect, useState } from 'react'
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom"
// import routes from '../src/router'
import routes from '@/router'
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import NavBar from '@/components/NavBar';

function App() {
  const location = useLocation() 
  const { pathname } = location
  const needNav = ['/', '/data'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=

  return (
    <>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </>
      </ConfigProvider>
      <NavBar showNav={showNav} />
    </>
  )
}

export default App
