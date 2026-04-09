import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const App = () => {
  const [loading, setLoading] = useState(false);

  // 处理表单提交
  const onFinish = (values) => {
    setLoading(true);
    // 模拟异步登录请求
    setTimeout(() => {
      setLoading(false);
      message.success(`登录成功！欢迎回来, ${values.username}`);
      // 这里可以添加跳转逻辑，例如: history.push('/dashboard')
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <Card className="login-card" style={styles.card}>
        <div style={styles.header}>
          <Title level={2} style={{ margin: 0 }}>后台管理系统</Title>
          <p style={{ color: '#8c8c8c', marginTop: '8px' }}>请登录您的账号</p>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名: admin" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码: 123456"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block // 按钮占满宽度
            >
              {loading ? '登录中...' : '登 录'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// 简单的内联样式，用于快速布局（实际项目中建议使用 CSS Modules 或 styled-components）
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f2f5', // 经典的后台背景灰
    backgroundImage: 'radial-gradient(#e6f7ff 1px, transparent 1px)', // 简单的点状背景纹理
    backgroundSize: '20px 20px',
  },
  card: {
    width: 400,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  }
};

export default App;