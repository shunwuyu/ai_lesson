import React, { useState, useRef, useEffect } from 'react';
import { Upload, Button, Input, Slider, Radio, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import './styles.css';

const { Dragger } = Upload;

type WatermarkPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';

const ImageWatermark: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [fontSize, setFontSize] = useState('medium');
  const [position, setPosition] = useState<WatermarkPosition>('bottomRight');
  const [opacity, setOpacity] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload: UploadProps['onChange'] = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        setImageElement(img);
      };
      img.src = image;
    }
  }, [image]);

  const applyWatermark = (targetCanvas: HTMLCanvasElement | null = canvasRef.current) => {
    if (!imageElement || !targetCanvas) return;

    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image
    targetCanvas.width = imageElement.width;
    targetCanvas.height = imageElement.height;

    // Draw original image
    ctx.drawImage(imageElement, 0, 0);

    if (watermarkText) {
      // Configure watermark text
      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = '#000000';
      const fontSizes = { small: '24px', medium: '36px', large: '48px' };
      ctx.font = `${fontSizes[fontSize as keyof typeof fontSizes]} Arial`;

      // Calculate text metrics
      const metrics = ctx.measureText(watermarkText);
      const textWidth = metrics.width;
      const textHeight = parseInt(ctx.font);

      // Calculate position
      let x = 0, y = 0;
      const padding = 20;

      switch (position) {
        case 'topLeft':
          x = padding;
          y = textHeight + padding;
          break;
        case 'topRight':
          x = targetCanvas.width - textWidth - padding;
          y = textHeight + padding;
          break;
        case 'bottomLeft':
          x = padding;
          y = targetCanvas.height - padding;
          break;
        case 'bottomRight':
          x = targetCanvas.width - textWidth - padding;
          y = targetCanvas.height - padding;
          break;
        case 'center':
          x = (targetCanvas.width - textWidth) / 2;
          y = targetCanvas.height / 2;
          break;
      }

      // Draw watermark
      ctx.fillText(watermarkText, x, y);
    }
  };

  // Effect for real-time preview
  useEffect(() => {
    if (imageElement) {
      applyWatermark(previewCanvasRef.current);
    }
  }, [imageElement, watermarkText, fontSize, position, opacity]);

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'watermarked-image.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleApplyWatermark = () => {
    applyWatermark();
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    onChange: handleImageUpload,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return false;
    },
    showUploadList: false,
  };

  return (
    <div className="watermark-container">
      <h1>图片水印工具</h1>
      
      <div className="upload-section">
        {!image ? (
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片到这里上传</p>
          </Dragger>
        ) : (
          <div className="image-preview">
            <canvas
              ref={previewCanvasRef}
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
      </div>

      <div className="controls-section">
        <div className="control-item">
          <label>水印文字：</label>
          <Input 
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder="请输入水印文字"
          />
        </div>

        <div className="control-item">
          <label>字体大小：</label>
          <Radio.Group value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <Radio.Button value="small">小</Radio.Button>
            <Radio.Button value="medium">中</Radio.Button>
            <Radio.Button value="large">大</Radio.Button>
          </Radio.Group>
        </div>

        <div className="control-item">
          <label>水印位置：</label>
          <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
            <Radio.Button value="topLeft">左上</Radio.Button>
            <Radio.Button value="topRight">右上</Radio.Button>
            <Radio.Button value="bottomLeft">左下</Radio.Button>
            <Radio.Button value="bottomRight">右下</Radio.Button>
            <Radio.Button value="center">居中</Radio.Button>
          </Radio.Group>
        </div>

        <div className="control-item">
          <label>透明度：</label>
          <Slider
            min={0}
            max={100}
            value={opacity}
            onChange={setOpacity}
          />
        </div>

        <div className="button-group">
          <Button type="primary" onClick={handleApplyWatermark}>
            添加水印
          </Button>
          <Button onClick={downloadImage}>
            下载图片
          </Button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageWatermark; 