import React, { useState, useCallback } from 'react';
import { Button, Input, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';
import type { RcFile } from 'antd/es/upload/interface';
import './styles.css';

const { Dragger } = Upload;

interface Point {
  x: number;
  y: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageCropper: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    return true;
  };

  const handleUpload = (info: any) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const getCroppedImg = async () => {
    try {
      if (!croppedAreaPixels) return;

      const image = await createImage(imageUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/jpeg');
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cropped-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      message.error('Failed to crop image');
    }
  };

  const handleAspectRatio = (ratio: number) => {
    setAspect(ratio);
    setCustomWidth('');
    setCustomHeight('');
  };

  const handleCustomSize = () => {
    const width = parseFloat(customWidth);
    const height = parseFloat(customHeight);
    if (width && height) {
      setAspect(width / height);
    }
  };

  return (
    <div className="image-cropper">
      <h1>图片裁剪工具</h1>
      <div className="cropper-container">
        {!imageUrl ? (
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
          <div style={{ width: '100%', height: 400, position: 'relative' }}>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
      </div>

      {imageUrl && (
        <>
          <div className="aspect-ratio-buttons">
            <Button onClick={() => handleAspectRatio(1)}>1:1</Button>
            <Button onClick={() => handleAspectRatio(16/9)}>16:9</Button>
            <Button onClick={() => handleAspectRatio(4/3)}>4:3</Button>
            <Button onClick={() => handleAspectRatio(0)}>自由裁剪</Button>
          </div>

          <div className="custom-size">
            <span>自定义尺寸：</span>
            <Input
              placeholder="宽度"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              style={{ width: 100 }}
            />
            <span>x</span>
            <Input
              placeholder="高度"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              style={{ width: 100 }}
            />
            <Button onClick={handleCustomSize}>应用</Button>
          </div>

          <div className="action-buttons">
            <Button onClick={() => setImageUrl('')}>重新上传</Button>
            <Button type="primary" onClick={getCroppedImg}>
              下载裁剪结果
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCropper; 