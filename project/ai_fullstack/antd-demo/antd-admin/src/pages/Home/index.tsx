import { Button, Typography, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // 退出登录处理
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title level={2} style={{ marginBottom: 24 }}>欢迎进入后台管理系统</Title>
        <Button
          type="default"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </Content>
    </Layout>
  );
};

export default Home;