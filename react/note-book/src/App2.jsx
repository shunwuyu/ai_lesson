// App.jsx
import React from 'react'
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
// import routes from '../src/router'
import routes from '@/router'
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
function App() {
  return (
  <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  </ConfigProvider>
  )
}

export default App
