// Greeting.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Greeting = ({ name, message = 'Welcome to our platform', showIcon = false }) => {
  return (
    <div className="greeting">
      {showIcon && <span>👋</span>}
      <h1>Hello, {name}!</h1>
      <p>{message}</p>
    </div>
  );
};

// 在组件上直接定义 propTypes（类型约束）
Greeting.propTypes = {
  /**
   * 用户的名字，必须提供
   */
  name: PropTypes.string.isRequired,

  /**
   * 显示的欢迎语，可选，默认为 "Welcome to our platform"
   */
  message: PropTypes.string,

  /**
   * 是否显示表情图标，布尔值，可选，默认 false
   */
  showIcon: PropTypes.bool
};

// 设置默认值
// Greeting.defaultProps = {
//   message: 'Welcome to our platform',
//   showIcon: false
// };

export default Greeting;