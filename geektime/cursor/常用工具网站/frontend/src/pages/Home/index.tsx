import { Card, Row, Col, Typography } from 'antd';
import { FileTextOutlined, PictureOutlined, ScissorOutlined, SwapOutlined, FontSizeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 0;
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  color: white;
  margin-bottom: 48px;
`;

const ServiceCard = styled(Card)`
  text-align: center;
  margin-bottom: 24px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
  color: #1890ff;
`;

const Home = () => {
  const services = [
    {
      title: '文件转换',
      icon: <FileTextOutlined />,
      description: '支持多种格式',
      path: '/file-converter'
    },
    {
      title: '图片压缩',
      icon: <PictureOutlined />,
      description: '快速压缩图片',
      path: '/image-compressor'
    },
    {
      title: '图片裁剪',
      icon: <ScissorOutlined />,
      description: '自由裁剪图片',
      path: '/image-cropper'
    },
    {
      title: '图片格式转换',
      icon: <SwapOutlined />,
      description: '格式随心转换',
      path: '/image-converter'
    },
    {
      title: '图片水印',
      icon: <FontSizeOutlined />,
      description: '添加自定义水印',
      path: '/image-watermark'
    }
  ];

  return (
    <>
      <HeroSection>
        <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
          互联网一站式服务平台
        </Title>
        <Paragraph style={{ color: 'white', fontSize: 18 }}>
          助你轻松进入互联网时代
        </Paragraph>
      </HeroSection>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          我们的服务
        </Title>
        <Row gutter={24}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={8} key={index}>
              <Link to={service.path}>
                <ServiceCard hoverable>
                  <IconWrapper>{service.icon}</IconWrapper>
                  <Title level={3}>{service.title}</Title>
                  <Paragraph>{service.description}</Paragraph>
                </ServiceCard>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home; 