const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 输入目录（放你要转的图片）
const inputDir = path.join(__dirname, 'imgs');
// 输出目录（自动生成 webp 图片）
const outputDir = path.join(__dirname, 'webp');

// 自动创建输出文件夹
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 读取所有图片
fs.readdir(inputDir, async (err, files) => {
  if (err) return console.error('读取失败:', err);

  const images = files.filter(f =>
    f.toLowerCase().endsWith('.jpg') ||
    f.toLowerCase().endsWith('.jpeg') ||
    f.toLowerCase().endsWith('.png')
  );

  for (const file of images) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

    await sharp(inputPath)
      .webp({ quality: 80 }) // 画质 80%，可改
      .toFile(outputPath);

    console.log('✅ 转换完成:', file);
  }

  console.log('\🎉 全部批量转换完成！');
});