import { useState } from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import { BrandLogo } from '../components/BrandLogo'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../api/client'
import { authApi } from '../api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  return (
    <div className="kh-login">
      <Card className="kh-login-card">
        <div className="kh-login-title">
          <BrandLogo size={40} />
          <h1>Knowledge Hub</h1>
          <p>登录后使用文档、检索、问答与图谱</p>
        </div>
        <Form
          layout="vertical"
          initialValues={{ username: 'user', password: '123456' }}
          // 表单点提交、校验通过之后就跑 onFinish，values 就是表单收集到的所有输入值。
          onFinish={async (values: { username: string; password: string }) => {
            setLoading(true)
            try {
              const result = await authApi.login(values.username, values.password)
              // setAuth({
              //   accessToken: result.accessToken,
              //   refreshToken: result.refreshToken,
              //   user: result.userInfo,
              // })
              // navigate('/dashboard', { replace: true })
            } catch (error) {
              message.error(error instanceof ApiError ? error.message : '登录失败')
            } finally {
              setLoading(false)
            }
          }}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}