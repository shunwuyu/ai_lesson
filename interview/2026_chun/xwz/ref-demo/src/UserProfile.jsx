import React, { useEffect, useState } from 'react';
import emitter from './utils/eventBus';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    // 1. 定义回调处理函数
    const onLogin = (data) => {
      console.log('收到登录事件:', data);
      setUser(data);
    };

    const onToast = (msg) => {
      setToast(msg);
      // 3秒后清除 toast
      setTimeout(() => setToast(''), 3000);
    };

    // 2. 订阅事件
    emitter.on('user-login', onLogin);
    emitter.on('show-toast', onToast);

    // 3. 【重要】清理函数：组件卸载时取消订阅
    return () => {
      emitter.off('user-login', onLogin);
      emitter.off('show-toast', onToast);
      
      // 或者一次性取消该组件所有监听 (mitt 特有功能，如果不指定具体回调)
      // emitter.all.clear(); 
    };
  }, []);

  return (
    <div>
      {toast && <div className="toast">{toast}</div>}
      {user ? (
        <p>欢迎, {user.name} (ID: {user.id})</p>
      ) : (
        <p>未登录</p>
      )}
    </div>
  )
}
export default UserProfile;