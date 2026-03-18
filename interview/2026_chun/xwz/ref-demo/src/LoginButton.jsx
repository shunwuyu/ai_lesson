import React from 'react';
import emitter from './utils/eventBus';

function LoginButton() {
  const handleLogin = () => {
    // 发布事件：事件名 + 数据
    emitter.emit('user-login', { name: '张三', id: 888 });
    
    // 也可以发布简单数据
    emitter.emit('show-toast', '登录成功！');
  };

  return <button onClick={handleLogin}>登录</button>;
}

export default LoginButton;