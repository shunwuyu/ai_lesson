const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const mkdirp = promisify(fs.mkdir);

const app = express();

// 确保上传目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // 生成一个不包含特殊字符的文件名
    const sanitizedName = Buffer.from(file.originalname, 'latin1').toString('utf8')
      .replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + sanitizedName);
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// File conversion endpoint
app.post('/api/convert', upload.single('file'), async (req, res) => {
  let inputPath = null;
  let outputPath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { targetFormat } = req.body;
    inputPath = req.file.path;
    const inputFileName = path.basename(inputPath, path.extname(inputPath));
    const expectedOutputPath = path.join(uploadsDir, `${inputFileName}.${targetFormat}`);

    console.log('Converting file:', {
      inputPath,
      expectedOutputPath,
      targetFormat
    });

    try {
      // Using LibreOffice for document conversion
      const cmd = `soffice --headless --convert-to ${targetFormat} --outdir "${uploadsDir}" "${inputPath}"`;
      const { stdout, stderr } = await execAsync(cmd);
      console.log('Conversion output:', stdout);
      if (stderr) {
        console.error('Conversion stderr:', stderr);
      }

      // 等待文件生成（最多等待5秒）
      let retries = 10;
      while (retries > 0 && !fs.existsSync(expectedOutputPath)) {
        await new Promise(resolve => setTimeout(resolve, 500));
        retries--;
      }

      // 如果文件还是不存在，尝试查找目录中新生成的文件
      if (!fs.existsSync(expectedOutputPath)) {
        const files = fs.readdirSync(uploadsDir);
        const possibleOutput = files.find(f => 
          f.startsWith(inputFileName) && f.endsWith(targetFormat)
        );
        if (possibleOutput) {
          outputPath = path.join(uploadsDir, possibleOutput);
        } else {
          throw new Error('Converted file not found');
        }
      } else {
        outputPath = expectedOutputPath;
      }
    } catch (convError) {
      console.error('Conversion command error:', convError);
      throw new Error(`File conversion failed: ${convError.message}`);
    }

    // Send the converted file
    res.download(outputPath, `converted.${targetFormat}`, (err) => {
      // Cleanup files after sending
      try {
        if (inputPath && fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }
        if (outputPath && fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
      
      if (err) {
        console.error('Error sending file:', err);
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    // Cleanup on error
    try {
      if (inputPath && fs.existsSync(inputPath)) {
        fs.unlinkSync(inputPath);
      }
      if (outputPath && fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    res.status(500).json({ error: error.message || 'Conversion failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadsDir}`);
}); 