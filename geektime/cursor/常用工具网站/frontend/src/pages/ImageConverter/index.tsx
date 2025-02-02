import React, { useState } from 'react';
import { Button, Upload, message, Slider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import './styles.css';

const { Dragger } = Upload;

interface ImageInfo {
  url: string;
  name: string;
  type: string;
  size: number;
}

const ImageConverter: React.FC = () => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('');
  const [quality, setQuality] = useState<number>(90);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件！');
      return false;
    }
    return true;
  };

  const handleUpload = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageInfo({
          url: reader.result as string,
          name: file.name,
          type: file.type,
          size: file.size
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImage = async () => {
    if (!imageInfo || !targetFormat) {
      message.error('请先上传图片并选择目标格式！');
      return;
    }

    try {
      // 创建图片对象
      const image = new Image();
      image.src = imageInfo.url;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // 创建canvas
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('无法创建canvas上下文');
      }

      // 绘制图片
      ctx.drawImage(image, 0, 0);

      // 转换格式
      let mimeType: string;
      switch (targetFormat) {
        case 'png':
          mimeType = 'image/png';
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'bmp':
          mimeType = 'image/bmp';
          break;
        default:
          mimeType = 'image/jpeg';
      }

      // 获取转换后的图片数据
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);

      // 创建下载链接
      const link = document.createElement('a');
      link.href = dataUrl;
      const extension = targetFormat || 'jpg';
      const fileName = imageInfo.name.replace(/\.[^/.]+$/, '') + '.' + extension;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success('转换成功！');
    } catch (error) {
      console.error('转换失败:', error);
      message.error('转换失败，请重试！');
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="image-converter">
      <h1>图片格式转换工具</h1>
      <div className="converter-container">
        {!imageInfo ? (
          <Dragger
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            showUploadList={false}
            className="drop-zone"
            customRequest={({ onSuccess }: any) => {
              if (onSuccess) {
                onSuccess("ok");
              }
            }}
          >
            <p className="upload-icon">
              <InboxOutlined />
            </p>
            <p>点击或拖拽图片到这里上传</p>
          </Dragger>
        ) : (
          <div className="drop-zone">
            <img src={imageInfo.url} alt="预览" className="preview-image" />
          </div>
        )}
      </div>

      {imageInfo && (
        <>
          <div className="file-info">
            <p>原始格式：{imageInfo.type.split('/')[1].toUpperCase()}</p>
            <p>文件大小：{formatSize(imageInfo.size)}</p>
          </div>

          <div className="format-buttons">
            <Button 
              type={targetFormat === 'jpg' ? 'primary' : 'default'}
              onClick={() => setTargetFormat('jpg')}
            >
              JPG
            </Button>
            <Button 
              type={targetFormat === 'png' ? 'primary' : 'default'}
              onClick={() => setTargetFormat('png')}
            >
              PNG
            </Button>
            <Button 
              type={targetFormat === 'webp' ? 'primary' : 'default'}
              onClick={() => setTargetFormat('webp')}
            >
              WEBP
            </Button>
            <Button 
              type={targetFormat === 'gif' ? 'primary' : 'default'}
              onClick={() => setTargetFormat('gif')}
            >
              GIF
            </Button>
            <Button 
              type={targetFormat === 'bmp' ? 'primary' : 'default'}
              onClick={() => setTargetFormat('bmp')}
            >
              BMP
            </Button>
          </div>

          {(targetFormat === 'jpg' || targetFormat === 'webp') && (
            <div className="quality-slider">
              <p>图片质量: {quality}%</p>
              <Slider
                min={1}
                max={100}
                value={quality}
                onChange={setQuality}
              />
            </div>
          )}

          <div className="action-buttons">
            <Button onClick={() => setImageInfo(null)}>重新上传</Button>
            <Button type="primary" onClick={convertImage} disabled={!targetFormat}>
              开始转换
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageConverter; 