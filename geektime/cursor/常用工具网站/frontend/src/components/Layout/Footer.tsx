import styled from 'styled-components';

const FooterWrapper = styled.footer`
  text-align: center;
  padding: 24px;
  background: #f0f2f5;
  color: rgba(0, 0, 0, 0.45);
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} 在线工具箱. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

export default Footer; 