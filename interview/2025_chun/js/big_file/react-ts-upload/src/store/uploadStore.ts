import { create } from 'zustand';

interface Upload {
  id: string;
  fileName: string;
  fileSize: number;
  progress: number;
  status: 'uploading' | 'success' | 'error' | 'paused';
}

interface UploadStore {
  uploads: Upload[];
  addUpload: (upload: Upload) => void;
  removeUpload: (id: string) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  updateUploadStatus: (id: string, status: Upload['status']) => void;
  clearUploads: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploads: [],
  
  addUpload: (upload) => set((state) => ({
    uploads: [...state.uploads, upload]
  })),
  
  removeUpload: (id) => set((state) => ({
    uploads: state.uploads.filter(upload => upload.id !== id)
  })),
  
  updateUploadProgress: (id, progress) => set((state) => ({
    uploads: state.uploads.map(upload => 
      upload.id === id ? { ...upload, progress } : upload
    )
  })),
  
  updateUploadStatus: (id, status) => set((state) => ({
    uploads: state.uploads.map(upload => 
      upload.id === id ? { ...upload, status } : upload
    )
  })),
  
  clearUploads: () => set({ uploads: [] })
}));