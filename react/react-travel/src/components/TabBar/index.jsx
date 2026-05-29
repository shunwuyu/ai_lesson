// TabBar.jsx
import React, { useState } from 'react';
import styles from './TabBar.module.css';

// 假设这是你的iconfont引入方式
// 通常你需要先在项目中引入iconfont.css文件
// 然后可以使用如下方式使用图标
const Icon = ({ type }) => <span className="iconfont" dangerouslySetInnerHTML={{ __html: type }} />;

const TabBar = () => {
  const [activeKey, setActiveKey] = useState('/home');

  const tabs = [
    {
      title: '首页',
      key: '/home',
      icon: '&#xe61c;', // iconfont图标编码
    },
    {
      title: '特惠专区',
      key: '/discount',
      icon: '&#xe67d;',
    },
    {
      title: '我的收藏',
      key: '/collection',
      icon: '&#xe60a;',
    },
    {
      title: '行程',
      key: '/trip',
      icon: '&#xe625;',
    },
    {
      title: '我的账户',
      key: '/account',
      icon: '&#xe604;',
    }
  ];

  const handleTabClick = (key) => {
    setActiveKey(key);
    // 在实际项目中，这里可以添加路由跳转逻辑
    // 例如使用react-router的useNavigate钩子
    console.log(`Navigate to: ${key}`);
  };

  return (
    <div className={styles.tabBarContainer}>
      {tabs.map(tab => (
        <a 
          key={tab.key} 
          className={`${styles.tabItem} ${activeKey === tab.key ? styles.active : ''}`}
          onClick={() => handleTabClick(tab.key)}
        >
          <span className={styles.icon}>
            <Icon type={tab.icon} />
          </span>
          <span className={styles.label}>{tab.title}</span>
        </a>
      ))}
    </div>
  );
};

export default TabBar;