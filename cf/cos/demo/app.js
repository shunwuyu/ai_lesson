require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const multer = require('multer');

const app = express();
const PORT = 3000;

// 初始化 COS 客户端
const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY
});

const BUCKET = process.env.COS_BUCKET;
const REGION = process.env.COS_REGION;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态资源托管
app.use(express.static(path.join(__dirname, 'public')));

// 配置multer存储（内存存储，文件以 buffer 形式拿到）
const storage = multer.memoryStorage();

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 允许的文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传 jpg、png、gif 格式的图片'), false);
  }
};

// 配置multer上传
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// 图片上传接口
app.post('/api/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '请选择要上传的图片'
      });
    }

    // 生成唯一文件名：时间戳 + 随机数 + 原始扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(req.file.originalname);
    const key = `uploads/${uniqueSuffix}${ext}`;

    // 上传到腾讯云 COS
    await cos.putObject({
      Bucket: BUCKET,
      Region: REGION,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    });

    // 返回可访问的 COS 外链
    const url = `https://${BUCKET}.cos.${REGION}.myqcloud.com/${key}`;

    res.json({
      success: true,
      message: '图片上传成功',
      data: {
        url,
        key,
        size: req.file.size
      }
    });
  } catch (error) {
    next(error);
  }
});

// 错误处理中间件
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // Multer错误
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '文件大小超过限制，最大允许5MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: '文件上传错误: ' + error.message
    });
  }
  
  if (error.message === '只允许上传 jpg、png、gif 格式的图片') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  // 其他错误
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: error.message
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动，访问地址: http://localhost:${PORT}`);
});