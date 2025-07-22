import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

function Login() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isValid, setIsValid] = useState(false);

  // 实时校验逻辑
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem('token', res.token);
      dispatch({ type: 'LOGIN', payload: res });
      navigate(from, { replace: true });
    } catch (err) {
      alert('登录失败');
      console.error(err);
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
