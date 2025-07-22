import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api';
import { useAuthStore } from '../store/user'; // 👈 改成 zustand store
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const setAuth = useAuthStore(state => state.setAuth); // 👈 zustand 设置状态

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  // 表单验证逻辑
  useEffect(() => {
    const newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3位';
    }

    if (!formData.password.trim()) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6位';
    }

    setErrors(newErrors);
    setIsValid(!newErrors.username && !newErrors.password);
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await login(formData); // 发起登录请求
      if (res.code === 0) {
        setAuth({ token: res.token, user: res.user }); // 使用 zustand 更新状态
        navigate(from, { replace: true }); // 登录成功后跳转
      } else {
        alert(res.message || '登录失败');
      }
    } catch (err) {
      console.error(err);
      alert('登录失败');
    }
  };

  return (
    <div className={styles.container}>
      <h2>登录</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">用户名</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className={styles.error}>{errors.username}</div>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">密码</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        <button type="submit" disabled={!isValid}>
          登录
        </button>
      </form>
    </div>
  );
}

export default Login;
