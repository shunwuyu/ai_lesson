import { Button, Checkbox, Form, Input } from 'antd'
import { useState, useEffect } from 'react'
import classes from './Login.module.scss'

const Login = () => {
    const [loading, setLoading] = useState(false)
    
    // 获取antd的form实例
    const [form] = Form.useForm()
    const onFinish = async (values) => {
         // 开始loading
        setLoading(true)
        console.log(values)
        // 记住密码存储用户信息
        if (values.remember) {
            localStorage.setItem('username', values.username, { expires: 7 })
            localStorage.setItem('password', encrypt(values.password), { expires: 7 })
            localStorage.setItem('remember', values.remember, { expires: 7 })
        } else {
            // 移除用户信息
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            localStorage.removeItem('remember')
        }
    }



    useEffect(() => {
        // getUser()
    }, [])
    return (
        <div className={classes.login}>
            <div className={classes['login-container']}>
                <div className={classes['login-text']}>欢迎登录</div>
                <div className={classes['login-form']}>
                    <Form
                        name="basic"
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        autoComplete="off">
                        <Form.Item label="用户名" name="username" rules={[{ required: true, max: 12, message: '请输入用户名!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>
                        <p className={classes['login-tip']}>测试登录账号：Alan，密码：123456</p>
                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                登录
                            </Button>
                            <Button htmlType="reset" style={{ marginLeft: '32px' }}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login