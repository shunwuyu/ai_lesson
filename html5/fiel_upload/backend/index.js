const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const multer = require('multer');
// const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/'); // 指定上传文件存放的目录
    },
    filename: function(req, file, cb) {
      // 生成一个基于当前时间和原始文件名的唯一文件名
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname); // 获取文件扩展名
      cb(null, uniqueSuffix + extension); // 使用时间戳+随机数+扩展名作为新文件名
    },
  });

  const upload = multer({ storage });

const app = express();
// const upload = multer({ dest: 'uploads/' }); // 指定上传文件的存储目录

// 设置静态文件服务，用于展示上传的图片
// app.use(express.static('uploads'));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        console.log(req.file, '/////////////////////')
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        // 返回上传文件的信息
        res.send(`File uploaded successfully: ${req.file.originalname}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file.');
    }
});

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});