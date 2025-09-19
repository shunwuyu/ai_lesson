
import jwt from 'jsonwebtoken'

// 生成 JWT Token (实际项目应使用安全密钥)
const generateToken = (username: string) => {
  return jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' })
}

export default [
  {
    
  }
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      // 简单校验
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token: generateToken(username),
            username,
          },
        }
      }
      return {
        code: 400,
        message: '用户名或密码错误',
      }
    },
  },
] 