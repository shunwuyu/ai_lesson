export const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();//html5 
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        crypto.subtle.digest('SHA-256', buffer).then((hash) => {
          const hashArray = Array.from(new Uint8Array(hash));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          resolve(hashHex);
        });
      };
    });
  };
  
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };