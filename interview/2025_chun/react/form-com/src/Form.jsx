import React, { useState, useCallback } from 'react';

const Form = () => {
  // 表单状态管理
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  // 错误信息状态
  const [errors, setErrors] = useState({});
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表单验证
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    // 用户名验证
    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符';
    }

    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '邮箱不能为空';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符';
    }

    // 确认密码验证
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    // 协议验证
    if (!formData.agree) {
      newErrors.agree = '请同意服务条款';
    }

    return newErrors;
  }, [formData]);

  // 处理输入变化
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    const newErrors = validateForm();
    setErrors(newErrors);

    // 如果有错误，停止提交
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 成功提交后的处理
      console.log('Form submitted:', formData);
      alert('提交成功！');
      
      // 重置表单
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
      });
    } catch (error) {
      console.error('Submit error:', error);
      alert('提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 输入框通用样式
  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  };

  // 错误信息样式
  const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginBottom: '8px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>注册表单</h2>
      
      {/* 用户名输入 */}
      <div>
        <input
          type="text"
          name="username"
          placeholder="用户名"
          value={formData.username}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.username && <div style={errorStyle}>{errors.username}</div>}
      </div>

      {/* 邮箱输入 */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.email && <div style={errorStyle}>{errors.email}</div>}
      </div>

      {/* 密码输入 */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="密码"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.password && <div style={errorStyle}>{errors.password}</div>}
      </div>

      {/* 确认密码 */}
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="确认密码"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
      </div>

      {/* 同意条款 */}
      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          我同意服务条款和隐私政策
        </label>
        {errors.agree && <div style={errorStyle}>{errors.agree}</div>}
      </div>

      {/* 提交按钮 */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isSubmitting ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
};

export default Form;