import { useState } from 'react'
import './App.scss'
import { Layout, Switch, Button, Breadcrumb, Dropdown, Space, Popconfirm } from 'antd'
import { 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardFilled,
  DownOutlined,
  UserOutlined,
  UndoOutlined,
  LogoutOutlined
} from '@ant-design/icons'
const { Header, Sider, Content } = Layout
import { useNavigate, Link, useLocation } from 'react-router-dom'
import avatar from '@/assets/images/avatar/default_avatar.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './store/counterSlice';

function App() {
  const count = useSelector(state => state.counter.value); // 获取计数器值
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false)
  const [themeVari, setThemeVari] = useState('dark')
  const { pathname } = useLocation()

  const changeTheme = (value) => {
    setThemeVari(value ? 'light' : 'dark')
  }

  const toggleCenterStatus = () => {

  }

  const toggleResetStatus = () => {

  }

  const handleLogout = () => {

  }

  const dropdownMenuItems = [
    {
      key: '1',
      label: (
        <div onClick={() => toggleCenterStatus(true)}>
          <UserOutlined /> 个人中心
        </div>
      )
    },
    {
      key: '2',
      label: (
        <Popconfirm
          onConfirm={() => toggleResetStatus(true)}
          title="是否确认重置密码？"
          okText="重置"
          cancelText="取消">
          <UndoOutlined /> 重置密码
        </Popconfirm>
      )
    },
    {
      key: '3',
      label: (
        <Popconfirm onConfirm={() => handleLogout()} title="是否确认退出？" okText="退出" cancelText="取消">
          <LogoutOutlined /> 退出登录
        </Popconfirm>
      )
    }
  ]
 
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} theme={themeVari}>
        <div className="layout-logo-vertical" style={{ color: themeVari === 'dark' ? '#fff' : '#000' }}>
          <span className="layout-logo">
            <DashboardFilled />
          </span>
          {!collapsed && <span>react-antd5-admin</span>}
        </div>
        <Switch
          className="sider-switch"
          checkedChildren="☀"
          unCheckedChildren="🌙"
          onChange={changeTheme}
          style={{ transform: collapsed ? 'translateX(15px)' : 'translateX(75px)' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#ffffff',
            display: 'flex'
          }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <div className="header-right">
              <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomRight">
                <Space>
                  <img
                    src={avatar}
                    className="user-icon"
                    alt="avatar"
                  />
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
        </Header>
        <Content
          style={{
            minHeight: 280
          }}>

        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
