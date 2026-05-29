import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { uploadFile } from '../../services/api';

const { Dragger } = Upload;

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*/*',
  maxSize = 50 * 1024 * 1024, // 50MB
  onSuccess,
  onError,
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept,
    customRequest: async ({ file, onSuccess: uploadSuccess, onError: uploadError }) => {
      try {
        const response = await uploadFile(file as File);
        uploadSuccess?.(response);
        onSuccess?.(response);
        message.success('File uploaded successfully');
      } catch (error) {
        const err = error as Error;
        uploadError?.(err);
        onError?.(err);
        message.error(err.message);
      }
    },
    beforeUpload: (file) => {
      if (file.size > maxSize) {
        message.error(`File must be smaller than ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single file upload. Maximum file size: {maxSize / 1024 / 1024}MB
      </p>
    </Dragger>
  );
};

export default FileUpload; 