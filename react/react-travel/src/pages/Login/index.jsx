// Login/index.tsx
import React, { useState, useEffect } from 'react';
import { Input, Button, Toast } from 'react-vant';
import styles from './Login.module.css';
import AppHeader from '../../components/AppHeader';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const validateUsername = (value) => {
    if (!value) return '用户名不能为空';
    if (!/^\w{3,16}$/.test(value)) return '用户名需为3~16位字母、数字或下划线';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return '密码不能为空';
    if (!/^\w{6,20}$/.test(value))
      return '密码需为6~20位，包含字母和数字';
    return '';
  };

  useEffect(() => {
    if (!isTouched) return;
    const usernameErr = validateUsername(username);
    const passwordErr = validatePassword(password);
    setErrors({ username: usernameErr, password: passwordErr });
    setCanSubmit(!usernameErr && !passwordErr);
  }, [username, password]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    Toast.success('表单校验通过，提交中...');
    // TODO: 提交逻辑
  };

  return (
    <>
      <AppHeader title="登录" />
      <div className={styles.container}>
        <div className={styles.field}>
          <Input
            placeholder="请输入用户名"
            value={username}
            onChange={setUsername}
            onFocus={() => setIsTouched(true)}
            clearable
          />
          {errors.username && <div className={styles.error}>{errors.username}</div>}
        </div>

        <div className={styles.field}>
          <Input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={setPassword}
            onFocus={() => setIsTouched(true)}
            clearable
          />
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>

        <Button
          type="primary"
          block
          className={styles.button}
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          登录
        </Button>
      </div>
    </>
  );
}
