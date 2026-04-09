import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'; // 假设你安装了 antd 图标，或者可以用普通文字代替

// 1. 定义动画变体 (Variants) - 这是一个最佳实践，方便复用和管理
const containerVariants = {
  hidden: { opacity: 0, y: 100 }, // 初始状态：透明且向下偏移
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.6, 
      type: "spring", // 使用弹簧物理效果，更自然
      stiffness: 100  // 弹性系数 越小，弹性越大
    } 
  }
};

const inputVariants = {
  focus: { scale: 1.02, borderColor: "#1890ff", boxShadow: "0 0 8px rgba(24, 144, 255, 0.4)" },
  tap: { scale: 0.98 }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 4px 15px rgba(24, 144, 255, 0.4)" },
  tap: { scale: 0.95 }
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={styles.pageContainer}>
      {/* 2. 使用 motion.div 作为容器，应用入场动画 */}
      <motion.div
        className="login-card"
        variants={containerVariants}
        initial="hidden"
        // 入场动画
        animate="visible"
        style={styles.card}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 30, color: '#333' }}>
          欢迎回来
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 3. 输入框的交互动画 */}
          <motion.input
            type="text"
            placeholder="用户名"
            style={styles.input}
            variants={inputVariants}
            whileFocus="focus"
            whileTap="tap"
            initial={{ opacity: 0, x: -20 }} //  stagger children effect
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          />
          
          <motion.input
            type="password"
            placeholder="密码"
            style={styles.input}
            variants={inputVariants}
            whileFocus="focus"
            whileTap="tap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }} // 延迟出现，制造顺序感
          />

          {/* 4. 按钮的点击与悬停动画 */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={styles.button}
          >
            {loading ? '登录中...' : <><LoginOutlined /> 登 录</>}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// 基础样式
const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // 漂亮的渐变背景
  },
  card: {
    padding: '40px',
    borderRadius: '16px',
    background: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '350px',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease', // 配合 motion 使用
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: '#1890ff',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  }
};

export default App;