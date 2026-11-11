import { useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Badge, Dropdown, Layout, Menu, Tag, theme } from 'antd'
import type { MenuProps } from 'antd'
import { BrandLogo } from '../components/BrandLogo'
const { Header, Sider, Content } = Layout
type MenuItem = NonNullable<MenuProps['items']>[number]
import { useAuth } from '../auth'
import {
  ApartmentOutlined,
  BellOutlined,
  ClusterOutlined,
  FileTextOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

function AppLayout() {
  const user = useAuth()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const topKey = useMemo(() => {
    if (
      location.pathname.startsWith('/documents') ||
      location.pathname.startsWith('/favorites') ||
      location.pathname.startsWith('/admin/reviews')
    ) {
      return '/documents'
    }
    if (location.pathname.startsWith('/search')) return '/search'
    if (location.pathname.startsWith('/chat')) return '/chat'
    if (location.pathname.startsWith('/graph')) return '/graph'
    if (location.pathname.startsWith('/profile')) return '/profile'
    if (location.pathname.startsWith('/notifications')) return '/notifications'
    if (location.pathname.startsWith('/admin')) return '/admin'
    return '/dashboard'
  }, [location.pathname])

  const topItems = useMemo(() => {
    const items: MenuItem[] = [
      { key: '/dashboard', label: '首页大盘', icon: <HomeOutlined /> },
    ]
    // if (can(user, 'document:list')) {
    //   items.push({ key: '/documents', label: '文档管理', icon: <FileTextOutlined /> })
    // }
    // if (can(user, 'search')) {
    //   items.push({ key: '/search', label: '文档搜索', icon: <SearchOutlined /> })
    //   items.push({ key: '/chat', label: 'AI智能问答', icon: <MessageOutlined /> })
    //   items.push({ key: '/graph', label: '知识图谱', icon: <ClusterOutlined /> })
    // }
    // if (can(user, 'profile')) {
    //   items.push({ key: '/profile', label: '个人中心', icon: <UserOutlined /> })
    // }
    // if (isAdmin(user)) {
    //   items.push({ key: '/admin/users', label: '系统管理', icon: <SettingOutlined /> })
    // }
    return items
  }, [user])

  const side = useMemo(() => {
    if (topKey === '/documents') {
      const items: MenuItem[] = [
        { key: '/documents', icon: <ReadOutlined />, label: '可见文档' },
        { key: '/documents/mine', icon: <FileTextOutlined />, label: '我的文档' },
        { key: '/favorites', icon: <ReadOutlined />, label: '我的收藏' },
        { key: '/documents/new', icon: <FileTextOutlined />, label: '新建文档' },
      ]
      return { title: '文档管理', items }
    }
    if (topKey === '/search') {
      return {
        title: '文档搜索',
        items: [{ key: '/search', icon: <SearchOutlined />, label: '全文检索' }],
      }
    }
    if (topKey === '/chat') {
      return {
        title: 'AI智能问答',
        items: [{ key: '/chat', icon: <MessageOutlined />, label: '知识问答' }],
      }
    }
    if (topKey === '/graph') {
      return {
        title: '知识图谱',
        items: [
          { key: '/graph', icon: <ApartmentOutlined />, label: '全景图谱' },
        ],
      }
    }
    if (topKey === '/profile') {
      return {
        title: '个人中心',
        items: [{ key: '/profile', icon: <UserOutlined />, label: '账号资料' }],
      }
    }
    if (topKey === '/notifications') {
      return {
        title: '通知',
        items: [{ key: '/notifications', icon: <BellOutlined />, label: '全部通知' }],
      }
    }
    if (topKey === '/admin') {
      return {
        title: '系统管理',
        items: [
          { key: '/admin/users', icon: <UserOutlined />, label: '用户管理' },
          { key: '/admin/roles', icon: <SafetyCertificateOutlined />, label: '角色权限' },
          { key: '/admin/teams', icon: <TeamOutlined />, label: '团队管理' },
          { key: '/admin/categories', icon: <ApartmentOutlined />, label: '分类管理' },
          { key: '/admin/notifications', icon: <BellOutlined />, label: '发送通知' },
        ],
      }
    }
    return {
      title: '首页大盘',
      items: [{ key: '/dashboard', icon: <HomeOutlined />, label: '工作概览' }],
    }
  }, [topKey, user])

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="kh-root">
      <Header className="kh-header" style={{ background: colorBgContainer }}>
        <div className="kh-logo" onClick={() => navigate('/dashboard')}>
          <BrandLogo />
          <span className="kh-logo-text">Knowledge Hub</span>
        </div>
        <Menu
          className="kh-top-menu"
          mode="horizontal"
          selectedKeys={[topKey === '/admin' ? '/admin/users' : topKey]}
          items={topItems}
          onClick={({ key }) => navigate(key)}
        />
      </Header>
      <Layout>
        <Sider
          className="kh-sider"
          theme="light"
          width={220}
          collapsedWidth={64}
          collapsible
          collapsed={collapsed}
          trigger={null}
        >
          {!collapsed ? <div className="kh-sider-title">{side.title}</div> : null}
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={side.items}
            onClick={({ key }) => navigate(key)}
          />
          <div className="kh-sider-bottom" onClick={() => setCollapsed((v) => !v)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {!collapsed ? <span>收起菜单</span> : null}
          </div>
        </Sider>
      
        <Content className="kh-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout