// src/App.jsx
import React from 'react';
import LoginButton from './LoginButton';   // 刚才写的发布者组件
import UserProfile from './UserProfile';   // 刚才写的订阅者组件
import Parent from './Parent';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Parent/>
      <h1>React + Mitt 事件总线示例</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* 
          注意：这两个组件在结构上是“兄弟”甚至完全无关的。
          LoginButton 不知道 UserProfile 的存在。
          UserProfile 也不知道 LoginButton 的存在。
          它们只认识 eventBus。
        */}
        
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>组件 A: 操作区</h3>
          <p>点击按钮发送事件</p>
          <LoginButton />
        </div>

        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>组件 B: 展示区</h3>
          <p>监听事件并更新</p>
          <UserProfile />
        </div>
      </div>

      <div style={{ marginTop: '20px', color: '#666', fontSize: '0.9em' }}>
        <p>💡 原理：点击左边按钮  触发 emit  EventBus 通知 右边组件 on 回调执行  界面更新</p>
      </div>
    </div>
  );
}

export default App;