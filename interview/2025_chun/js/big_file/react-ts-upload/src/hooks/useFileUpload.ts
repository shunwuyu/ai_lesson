import { useState, useCallback } from 'react';
import axios from 'axios';
import { useUploadStore } from '../store/uploadStore';
import { calculateHash } from '../utils/fileUtils';

axios.defaults.baseURL = 'http://localhost:3001';

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_CONCURRENT_UPLOADS = 3;

interface ChunkType {
  file: Blob;
  index: number;
  hash: string;
  fileHash: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export const useFileUpload = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>('');
  const [chunks, setChunks] = useState<ChunkType[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const { addUpload, updateUploadProgress } = useUploadStore();

  // Calculate overall progress
  const updateOverallProgress = () => {
    if (!chunks.length) return;
    
    const totalProgress = chunks.reduce((acc, chunk) => acc + chunk.progress, 0);
    const overallProgress = Math.floor(totalProgress / chunks.length);
    
    setUploadProgress(overallProgress);
    if (currentFile) {
      updateUploadProgress(fileHash, overallProgress);
    }
  };

  // Merge chunks on the server
  const mergeChunks = async () => {
    if (!currentFile || !fileHash) return;
    
    try {
      await axios.post('/api/upload/merge', {
        fileHash,
        fileName: currentFile.name,
        fileSize: currentFile.size,
        chunkCount: chunks.length
      });
      
      setUploadSuccess(true);
      setUploadProgress(100);
    } catch (error) {
      console.error('Failed to merge chunks:', error);
      throw error;
    }
  };

  // Create file chunks
  const createFileChunks = useCallback(async (file: File) => {
    const fileSize = file.size;
    const chunkCount = Math.ceil(fileSize / CHUNK_SIZE);
    const hash = await calculateHash(file);
    
    setFileHash(hash);
    // console.log(hash,'///')
    
    // Check if file already exists on server (for instant upload)
    const { data } = await axios.post('/api/upload/verify', {
      fileHash: hash,
      fileName: file.name,
      fileSize: file.size
    });
    
    if (data.shouldUpload === false) {
      // File already exists, no need to upload
      setUploadSuccess(true);
      setUploadProgress(100);
      return [];
    }
    
    // Create chunks
    const fileChunks: ChunkType[] = [];
    
    for (let i = 0; i < chunkCount; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(fileSize, start + CHUNK_SIZE);
      const chunk = file.slice(start, end);
      
      fileChunks.push({
        file: chunk,
        index: i,
        hash: `${hash}_${i}`,
        fileHash: hash,
        progress: 0,
        status: 'pending'
      });
    }

    // console.log(fileChunks,'///')
    
    // If we have already uploaded some chunks, mark them as successful
    if (data.uploadedChunks && data.uploadedChunks.length > 0) {
      data.uploadedChunks.forEach((chunkIndex: number) => {
        if (fileChunks[chunkIndex]) {
          fileChunks[chunkIndex].status = 'success';
          fileChunks[chunkIndex].progress = 100;
        }
      });
    }
    
    return fileChunks;
  }, []);

  // Upload a single chunk
  const uploadChunk = useCallback(async (chunk: ChunkType) => {
    const formData = new FormData();
    formData.append('file', chunk.file);
    formData.append('hash', chunk.hash);
    formData.append('fileHash', chunk.fileHash);
    formData.append('index', chunk.index.toString());
    formData.append('fileName', currentFile?.name || '');
    formData.append('chunkCount', chunks.length.toString());
    
    try {
      chunk.status = 'uploading';
      setChunks(prev => [...prev]);
      
      const { data } = await axios.post('/api/upload/chunk', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            
            setChunks(prev => {
              const newChunks = [...prev];
              const chunkIndex = newChunks.findIndex(c => c.hash === chunk.hash);
              if (chunkIndex !== -1) {
                newChunks[chunkIndex].progress = percentCompleted;
              }
              return newChunks;
            });
            
            // Update overall progress
            updateOverallProgress();
          }
        }
      });
      
      chunk.status = 'success';
      setChunks(prev => [...prev]);
      
      return data;
    } catch (error) {
      chunk.status = 'error';
      setChunks(prev => [...prev]);
      throw error;
    }
  }, [chunks, currentFile]);

  // Upload chunks with concurrency control
  const uploadChunks = useCallback(async () => {
    console.log('---------------????', chunks.length)
    if (!chunks.length) return;
    
    setUploading(true);
    console.log('?sss')
    const pendingChunks = chunks.filter(chunk => chunk.status !== 'success');
    console.log(pengdingChunks, '????')
    const uploadQueue = async () => {
      const uploadingCount = chunks.filter(chunk => chunk.status === 'uploading').length;
      const nextChunks = chunks
        .filter(chunk => chunk.status === 'pending')
        .slice(0, MAX_CONCURRENT_UPLOADS - uploadingCount);
      
      if (nextChunks.length === 0 && uploadingCount === 0) {
        // All chunks uploaded, merge them
        try {
          await mergeChunks();
          setUploadSuccess(true);
        } catch (error) {
          console.error('Failed to merge chunks:', error);
        } finally {
          setUploading(false);
        }
        return;
      }
      
      await Promise.allSettled(
        nextChunks.map(async (chunk) => {
          try {
            await uploadChunk(chunk);
          } catch (error) {
            console.error(`Failed to upload chunk ${chunk.index}:`, error);
            // Will be retried in the next iteration
          }
          
          // Continue with next chunks
          await uploadQueue();
        })
      );
    };
    
    await uploadQueue();
  }, [chunks, uploadChunk]);

  // Start upload process
  const uploadFile = useCallback(async (file: File) => {
    if (!file) return;
    console.log(file)
    setCurrentFile(file);
    setUploadSuccess(false);
    setUploadProgress(0);
    
    // Add to upload store
    addUpload({
      id: Date.now().toString(),
      fileName: file.name,
      fileSize: file.size,
      progress: 0,
      status: 'uploading'
    });
    
    const fileChunks = await createFileChunks(file);
    setChunks(fileChunks);
    // console.log(fileChunks.length, '??????????????????????????????')
    if (fileChunks.length > 0) {
      await uploadChunks();
    }
  }, [addUpload, createFileChunks, uploadChunks]);

  // Retry failed chunks
  const retryFailedChunks = useCallback(async () => {
    setChunks(prev => {
      return prev.map(chunk => {
        if (chunk.status === 'error') {
          return { ...chunk, status: 'pending', progress: 0 };
        }
        return chunk;
      });
    });
    
    await uploadChunks();
  }, [uploadChunks]);

  return {
    uploadFile,
    uploadProgress,
    uploading,
    uploadSuccess,
    chunks,
    retryFailedChunks,
    currentFile
  };
};