const Koa = require('koa');
const Router = require('@koa/router');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const fs = require('fs');
const path = require('path');
const { uploadController } = require('./controllers/uploadController');

const app = new Koa();
const router = new Router();

// Create upload directories if they don't exist
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const CHUNK_DIR = path.join(UPLOAD_DIR, 'chunks');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

if (!fs.existsSync(CHUNK_DIR)) {
  fs.mkdirSync(CHUNK_DIR);
}

// Middleware
app.use(cors());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 3 * 1024 * 1024, // 3MB for chunks
    uploadDir: CHUNK_DIR,
    keepExtensions: true
  }
}));

// Routes
router.post('/api/upload/verify', uploadController.verifyFile);
router.post('/api/upload/chunk', uploadController.uploadChunk);
router.post('/api/upload/merge', uploadController.mergeChunks);

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});