import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm(); // Antd 表单实例
  const navigate = useNavigate(); // 路由跳转
  const { loading, login } = useAuthStore(); // 获取全局 loading 和登录方法
  const [errorMsg, setErrorMsg] = useState(''); // 登录错误提示

  // 登录表单提交处理
  const handleLogin = async () => {
    try {
      // 1. 表单校验
      const values = await form.validateFields();
      const { username, password } = values;

      // 2. 清空之前的错误提示
      setErrorMsg('');
      message.destroy();

      // 3. 调用 Zustand 中的登录方法
      const loginSuccess = await login(username, password);

      // 4. 登录成功 → 跳转到首页
      if (loginSuccess) {
        message.success('登录成功，即将进入首页');
        setTimeout(() => {
          navigate('/');
        }, 800);
      } else {
        // 5. 登录失败 → 显示错误提示
        setErrorMsg('账号或密码错误，请输入 admin / 123456');
        message.error('登录失败，请检查账号密码');
      }
    } catch (error) {
      // 表单校验失败处理
      console.error('表单校验失败：', error);
      message.warning('请完整填写账号和密码');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={20} sm={16} md={12} lg={8} xl={6}>
          <Card bordered={true} style={{ borderRadius: 8, boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={2} style={{ color: '#1890ff' }}>后台管理系统</Title>
            </div>

            {/* 登录表单 */}
            <Form
              form={form}
              name="login_form"
              layout="vertical"
              initialValues={{ username: '', password: '' }}
              onFinish={handleLogin}
            >
              {/* 错误提示 */}
              {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: 16, textAlign: 'center' }}>{errorMsg}</div>}

              {/* 账号输入框 */}
              <Form.Item
                name="username"
                label="账号"
                rules={[{ required: true, message: '请输入账号' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                  placeholder="请输入账号（admin）"
                  disabled={loading}
                />
              </Form.Item>

              {/* 密码输入框 */}
              <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                  placeholder="请输入密码（123456）"
                  disabled={loading}
                  visibilityToggle
                />
              </Form.Item>

              {/* 登录按钮 */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  style={{ height: 40, fontSize: 16 }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;