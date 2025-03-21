import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFileUpload } from '../hooks/useFileUpload';
import { formatFileSize } from '../utils/fileUtils';

export const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const {
    uploadFile,
    uploadProgress,
    uploading,
    uploadSuccess,
    chunks,
    retryFailedChunks,
    currentFile
  } = useFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const failedChunks = chunks.filter(chunk => chunk.status === 'error').length;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Large File</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          
          {!currentFile ? (
            <>
              <p className="mb-2">Drag and drop a file here, or</p>
              <Button onClick={handleButtonClick}>Select File</Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="font-medium">{currentFile.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(currentFile.size)}</p>
              
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm">{uploadProgress}% Uploaded</p>
              
              {uploadSuccess ? (
                <div className="text-green-600 font-medium">Upload Complete!</div>
              ) : uploading ? (
                <div className="text-blue-600">Uploading...</div>
              ) : null}
              
              {failedChunks > 0 && (
                <div className="text-red-600">
                  {failedChunks} chunks failed to upload.
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2"
                    onClick={retryFailedChunks}
                  >
                    Retry
                  </Button>
                </div>
              )}
              
              {!uploading && !uploadSuccess && (
                <Button onClick={handleButtonClick}>Select Another File</Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};