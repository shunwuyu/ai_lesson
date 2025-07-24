import React from 'react';
import { NavBar } from 'react-vant';
import { useNavigate } from 'react-router-dom';

const AppHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <NavBar
      title={title}
      leftText="返回"
      onClickLeft={handleBack}
      style={{ backgroundColor: '#fff' }}
    />
  );
};

export default AppHeader;