import { useState } from 'react'
import './login.css'

function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const validate = (name, value) => {
    let msg = ''

    if (name === 'username') {
      if (!value) msg = '用户名不能为空'
      else if (value.length < 3) msg = '用户名至少 3 位'
    }

    if (name === 'password') {
      if (!value) msg = '密码不能为空'
      else if (value.length < 6) msg = '密码至少 6 位'
    }

    setErrors(prev => ({ ...prev, [name]: msg }))
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    validate(name, value)
  }

  const isValid =
    form.username &&
    form.password &&
    !errors.username &&
    !errors.password

  const handleSubmit = e => {
    e.preventDefault()
    if (!isValid) return
    console.log('登录数据:', form)
  }

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>登录</h2>

        <div className="form-item">
          <label>用户名</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="请输入用户名"
          />
          {errors.username && (
            <span className="error">{errors.username}</span>
          )}
        </div>

        <div className="form-item">
          <label>密码</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="请输入密码"
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        <button disabled={!isValid}>登录</button>
      </form>
    </div>
  )
}

export default LoginForm
