import React, { useState } from 'react';
import { Upload, Select, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { convertFile } from '../../services/api';
import styles from './index.module.css';

const { Dragger } = Upload;
const { Option } = Select;

const FileConverter: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('pdf');
  const [loading, setLoading] = useState(false);

  const handleUpload = (info: any) => {
    // console.log(info)
    const uploadFile: File = info.file;
        console.log(uploadFile)
    setFile(uploadFile)
    // console.log(file)
    // if (info.file.status === 'done') {
    //   messageApi.success(`${info.file.name} 上传成功`);
    // } else if (info.file.status === 'error') {
    //   messageApi.error(`${info.file.name} 上传失败`);
    // }
  };

  React.useEffect(() => {
    // console.log('File state updated:', file);
    // console.log(file)
    if (file) {
        messageApi.success(`${file.name} 上传成功`);
    }
  }, [file]);

  const handleConvert = async () => {
    if (!file) {
      messageApi.warning('请先上传文件');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', targetFormat);

      const response = await convertFile(formData);
      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${targetFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      messageApi.success('转换成功！');
    } catch (error) {
      messageApi.error('转换失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <h1 className={styles.title}>文件转换工具</h1>
      <div className={styles.content}>
        <Dragger
          name="file"
          multiple={false}
          onChange={handleUpload}
          beforeUpload={() => false}
          showUploadList={true}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">拖拽文件到这里</p>
          <p className="ant-upload-hint">或者点击选择文件</p>
        </Dragger>

        <div className={styles.formatSelection}>
          <span>选择输出格式：</span>
          <Select
            value={targetFormat}
            onChange={setTargetFormat}
            style={{ width: 120 }}
          >
            <Option value="pdf">PDF</Option>
            <Option value="doc">DOC</Option>
            <Option value="docx">DOCX</Option>
            <Option value="txt">TXT</Option>
            <Option value="rtf">RTF</Option>
          </Select>
        </div>

        <Button
          type="primary"
          onClick={handleConvert}
          loading={loading}
          className={styles.convertButton}
        >
          开始转换
        </Button>
      </div>
    </div>
  );
};

export default FileConverter; 