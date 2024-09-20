// App.jsx
import React, { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom"
import routes from '@/router'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
import NavBar from '@/components/NavBar';
import { ConfigProvider } from 'zarm';
function App() {
  const location = useLocation()
  const { pathname } = location
  console.log(pathname);
  const needNav = ['/', '/data', '/user']
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) 
  return <ConfigProvider primaryColor={'#007fff'}>
    <>
     <Routes>
      {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
     </Routes>
     <NavBar showNav={showNav} />
  
   </>
   </ConfigProvider>
}

export default App