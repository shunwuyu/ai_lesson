import React, { useState, useCallback } from 'react';
import { Button, Slider, Radio, Card, App, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { compressImage, CompressResult } from '../../utils/imageCompressor';
import './styles.css';

const ImageCompressor: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [quality, setQuality] = useState<number>(0.8);
  const [compressResult, setCompressResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      messageApi.error('Please drop an image file');
    }
  }, [messageApi]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleCompress = async () => {
    if (!file) {
      messageApi.error('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const result = await compressImage(file, { quality });
      setCompressResult(result);
      messageApi.success('Image compressed successfully');
    } catch (error) {
      messageApi.error('Failed to compress image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressResult) return;
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(compressResult.compressedFile);
    link.href = url;
    link.download = `compressed_${file?.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const presetQualities = [
    { label: 'Low', value: 0.4 },
    { label: 'Medium', value: 0.7 },
    { label: 'High', value: 0.9 },
  ];

  return (
    <App>
      {contextHolder}
      <div className="image-compressor">
        <h1>Image Compression Tool</h1>
        
        <div className="upload-container">
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <>
                <InboxOutlined className="upload-icon" />
                <p>Drag and drop image here or</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  id="file-input"
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-input" className="upload-button">
                  Click to Select
                </label>
              </>
            )}
          </div>

          <Card className="compression-options">
            <div className="quality-presets">
              <h3>Compression Quality</h3>
              <Radio.Group
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                {presetQualities.map((preset) => (
                  <Radio.Button key={preset.label} value={preset.value}>
                    {preset.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <div className="quality-slider">
              <h3>Custom Quality: {Math.round(quality * 100)}%</h3>
              <Slider
                value={quality}
                onChange={setQuality}
                min={0.1}
                max={1}
                step={0.1}
                tooltip={{ open: false }}
              />
            </div>

            {compressResult && (
              <div className="compression-info">
                <p>Original Size: {(compressResult.originalSize / 1024).toFixed(2)} KB</p>
                <p>Compressed Size: {(compressResult.compressedSize / 1024).toFixed(2)} KB</p>
                <p>Compression Ratio: {((1 - compressResult.compressedSize / compressResult.originalSize) * 100).toFixed(1)}%</p>
              </div>
            )}

            <div className="action-buttons">
              <Button
                type="primary"
                onClick={handleCompress}
                loading={loading}
                disabled={!file}
              >
                Compress Image
              </Button>
              {compressResult && (
                <Button type="primary" onClick={handleDownload}>
                  Download
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </App>
  );
};

export default ImageCompressor; 