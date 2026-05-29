import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import cx from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import { post } from '@/utils'
import s from './style.module.less';

const Login = () => {
  const [type, setType] = useState('login'); // 登录注册类型
  
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码

  const onSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }


    try {
      if (type == 'login') {
        const { data } = await post('/user/login', {
          username,
          password
        });
        console.log(data,'///')
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        const { code } = await post('/user/register', {
          username,
          password
        });
        if (code === 200) {
          Toast.show('注册成功');
          setType('login');
        }
      }
    } catch (err) {
      Toast.show(err.msg);
    }
  };

  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册';
  }, [type])
  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
    </div>
    <div className={s.operation}>
      {
        type == 'register' ? <div className={s.agree}>
          <Checkbox />
          <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
        </div> : null
      }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
};

export default Login;