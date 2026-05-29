import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

const Logo = styled(Link)`
  float: left;
  margin-right: 48px;
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  text-decoration: none;
  line-height: 64px;
`;

const Header = () => {
  const menuItems = [
    { key: 'home', label: '首页', path: '/' },
    { key: 'file', label: '文件转换', path: '/file-converter' },
    {
      key: 'image',
      label: '图片工具',
      children: [
        { key: 'image-compressor', label: '图片压缩', path: '/image-compressor' },
        { key: 'image-cropper', label: '图片裁剪', path: '/image-cropper' },
        { key: 'image-converter', label: '图片格式转换', path: '/image-converter' },
        { key: 'image-watermark', label: '图片水印', path: '/image-watermark' },
      ],
    },
    { key: 'about', label: '关于我们', path: '/about' },
  ];

  const renderMenuItem = (item: any) => {
    if (item.children) {
      return {
        key: item.key,
        label: item.label,
        children: item.children.map(renderMenuItem),
      };
    }
    return {
      key: item.key,
      label: <Link to={item.path}>{item.label}</Link>,
    };
  };

  return (
    <HeaderWrapper>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Logo to="/">在线工具箱</Logo>
        <Menu
          mode="horizontal"
          items={menuItems.map(renderMenuItem)}
        />
      </div>
    </HeaderWrapper>
  );
};

export default Header; 