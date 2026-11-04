- 阿里云怎么设置跨域

1. 进入 OSS 控制台，打开你的 Bucket → 左侧【数据安全】→【跨域设置 (CORS)】→【创建规则】阿里云帮助...
2. 推荐开发配置（前端上传图片、预览，适配 Nest + 多模态场景）
   - **来源 (Origin)**：`*`（开发用；生产写你的前端域名，比如`http://localhost:5173`）
   - **允许 Methods**：`GET,PUT,POST,HEAD`
   - **允许 Headers**：`*`
   - **暴露 Headers**：`ETag,Content-Length`
   - **缓存时间**：`86400`（24 小时）
   - 多域名 / 通配符场景勾选【返回 Vary:Origin】
3. 保存规则，**清浏览器缓存再测试**（OPTIONS 预检会缓存）

- 创建项目
  nest new ai-canvas
  nest g res ai --no-spec

- 上传图片
http://localhost:3000/ai/oss/upload-signature?ext=.png
controller
service 
- oss.service.ts 注入依赖
