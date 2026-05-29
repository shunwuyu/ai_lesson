const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const fse = require('fs-extra');

const pipeline = promisify(require('stream').pipeline);

const UPLOAD_DIR = path.join(__dirname, '../uploads');
const CHUNK_DIR = path.join(UPLOAD_DIR, 'chunks');

// Helper to calculate file hash
const calculateFileHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
};

// Helper to get chunk directory for a specific file
const getChunkDir = (fileHash) => {
  const chunkDir = path.join(CHUNK_DIR, fileHash);
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }
  return chunkDir;
};

exports.uploadController = {
  // Verify if file already exists or get uploaded chunks
  async verifyFile(ctx) {
    // 前端怎么做hash?
    const { fileHash, fileName, fileSize } = ctx.request.body;
    console.log(fileHash,fileName,fileSize,'///')
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      
      if (stats.size === fileSize) {
        // Verify file hash
        const existingFileHash = await calculateFileHash(filePath);
        
        if (existingFileHash === fileHash) {
          // File already exists and is identical
          ctx.body = {
            shouldUpload: false, // 快传
            url: `/uploads/${fileName}`
          };
          return;
        }
      }
    }
    
    // Check for existing chunks
    const chunkDir = getChunkDir(fileHash);
    let uploadedChunks = [];
    
    if (fs.existsSync(chunkDir)) {
      uploadedChunks = fs.readdirSync(chunkDir)
        .filter(name => name.includes('-chunk-'))
        .map(name => parseInt(name.split('-chunk-')[1]));
    }
    
    ctx.body = {
      shouldUpload: true,
      uploadedChunks
    };
  },
  
  // Handle chunk upload
  async uploadChunk(ctx) {
    const { file } = ctx.request.files;
    const { hash, fileHash, index } = ctx.request.body;
    
    if (!file) {
      ctx.status = 400;
      ctx.body = { error: 'No file uploaded' };
      return;
    }
    
    // Create chunk directory for this file if it doesn't exist
    const chunkDir = getChunkDir(fileHash);
    
    // Move the uploaded chunk to its proper location
    const chunkPath = path.join(chunkDir, `${fileHash}-chunk-${index}`);
    
    try {
      await fse.move(file.filepath, chunkPath, { overwrite: true });
      
      ctx.body = {
        success: true,
        chunkIndex: index
      };
    } catch (error) {
      console.error('Error saving chunk:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to save chunk' };
    }
  },
  
  // Merge chunks into a complete file
  async mergeChunks(ctx) {
    const { fileHash, fileName, chunkCount } = ctx.request.body;
    
    const chunkDir = getChunkDir(fileHash);
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    try {
      // Create write stream for the final file
      const writeStream = fs.createWriteStream(filePath);
      
      // Process chunks in order
      for (let i = 0; i < chunkCount; i++) {
        const chunkPath = path.join(chunkDir, `${fileHash}-chunk-${i}`);
        
        if (fs.existsSync(chunkPath)) {
          // Read chunk and pipe to the final file
          await pipeline(
            fs.createReadStream(chunkPath),
            writeStream,
            { end: false }
          );
        } else {
          throw new Error(`Chunk ${i} is missing`);
        }
      }
      
      // Close the write stream
      writeStream.end();
      
      // Verify file integrity
      const finalHash = await calculateFileHash(filePath);
      
      if (finalHash !== fileHash) {
        // If hash doesn't match, delete the file and return error
        fs.unlinkSync(filePath);
        ctx.status = 400;
        ctx.body = { error: 'File integrity check failed' };
        return;
      }
      
      // Optionally clean up chunks after successful merge
      // fse.removeSync(chunkDir);
      
      ctx.body = {
        success: true,
        url: `/uploads/${fileName}`
      };
    } catch (error) {
      console.error('Error merging chunks:', error);
      ctx.status = 500;
      ctx.body = { error: 'Failed to merge chunks' };
    }
  }
};