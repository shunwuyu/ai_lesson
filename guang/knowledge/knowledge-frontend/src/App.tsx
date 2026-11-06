import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './auth'
//  引入布局组件 采用侧边导航 + 顶部栏 + 主内容区的经典三栏布局，
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'

function Guard({ children }: { children: ReactNode }) {
  const user = useAuth();
  // `replace`：替换当前浏览器历史记录，不新增一条历史。
  // 规避返回按钮再次回到受保护路由
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {

  return (
    <Routes>
      {/* 跳出Layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Guard>
            <AppLayout />
          </Guard>
        }
      >
      </Route>
    </Routes>
  )
}

export default App
