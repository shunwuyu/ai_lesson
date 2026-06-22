---
name: pinme-deploy
description: "一键部署前端静态网站到 IPFS 网络。使用场景：(1) 用户需要部署静态网站、HTML页面、前端项目 (2) 用户提到pinme、IPFS部署、静态网站托管 (3) 用户需要快速预览或分享前端作品 (4) 用户要求发布、上传、部署静态页面。支持自动识别项目类型、构建并上传到 IPFS 网络，返回可访问的 URL。"
---

# PinMe 静态网站部署

零配置、无服务器、基于 IPFS 的前端静态网站一键部署工具。

## 工作流程

### Step 1: 环境检查

首先检查 PinMe 是否已安装：

```bash
pinme -v
```

**判断标准**：
- ✅ 输出版本号 → 已安装，继续下一步
- ❌ 报错或无输出 → 未安装，执行安装命令

**安装命令**：
```bash
npm install -g pinme
```

安装完成后，再次验证是否成功。

---

### Step 2: 项目类型识别

通过项目根目录的特征文件，识别项目类型并确定构建配置：

| 项目类型 | 识别文件 | 构建命令 | 输出目录 |
|----------|----------|----------|----------|
| Vite | `vite.config.js` / `vite.config.ts` | `npm run build` | `dist/` |
| Create React App | 无 vite 配置但有 `package.json` | `npm run build` | `build/` |
| Next.js (static) | `next.config.js` | `npm run build && npm run export` | `out/` |
| Vue CLI | `vue.config.js` | `npm run build` | `dist/` |
| 纯 HTML 项目 | 无配置文件，仅有 `.html` 文件 | 无需构建 | 项目根目录 `.` |
| 其他框架 | 检查 `package.json` 的 `scripts.build` | `npm run build` | 通常为 `dist/` 或 `build/` |

**识别步骤**：
1. 检查是否存在 `vite.config.js` 或 `vite.config.ts` → Vite 项目
2. 检查是否存在 `vue.config.js` → Vue CLI 项目
3. 检查是否存在 `next.config.js` → Next.js 项目
4. 检查是否存在 `package.json` 且有 `build` 脚本 → 其他前端框架
5. 检查是否存在 `.html` 文件 → 纯 HTML 项目
6. 无法识别 → 询问用户项目类型和构建目录

---

### Step 3: 路由模式检查（可选提醒）

如果项目是 SPA（单页应用），需要检查路由模式：

**必须使用 Hash 模式路由**：
- React: `<HashRouter>` 或 `createHashRouter()`
- Vue: `createWebHashHistory()`
- 原因：IPFS 静态托管不支持服务端路由重写

**检查方法**：
- React: 搜索 `BrowserRouter` 或 `createBrowserRouter`
- Vue: 搜索 `createWebHistory`

**提醒用户**：如果发现使用 history 模式，提醒用户更改为 hash 模式，否则子页面会出现 404。

---

### Step 4: 执行构建（如需要）

**纯 HTML 项目**：跳过此步骤

**前端框架项目**：

```bash
npm run build
```

**检查构建结果**：
1. 确认输出目录存在（`dist/`、`build/`、`out/`）
2. 确认目录中包含 `index.html`
3. 如果构建失败，根据错误信息提示用户

**常见构建错误处理**：
- `npm ERR! missing script: build` → 提示用户在 `package.json` 中添加构建脚本
- 依赖未安装 → 提示执行 `npm install`
- 环境变量缺失 → 提示配置 `.env` 文件

---

### Step 5: 验证目录结构

在执行上传前，必须验证目标目录是否符合 PinMe 要求：

**必要条件**：
- ✅ 包含 `index.html` 文件
- ✅ 单个文件大小 ≤ 200MB
- ✅ 总目录大小 ≤ 1GB

**禁止内容**（应提醒用户排除）：
- ❌ `node_modules/`
- ❌ `.git/`
- ❌ `.env`、`.env.local` 等环境配置文件
- ❌ `src/` 源代码目录
- ❌ 构建配置文件（`webpack.config.js`、`vite.config.js` 等）

**验证命令**：
```bash
ls -la <目录路径>
du -sh <目录路径>
```

如果发现禁止内容，提醒用户使用 `.pinmeignore` 或移动到其他位置。

---

### Step 6: 上传到 IPFS

使用 PinMe 上传静态目录：

```bash
pinme upload <静态目录>
```

**参数说明**：
- `<静态目录>`：构建输出目录（如 `dist`、`build`、`out`）或项目根目录（纯 HTML）

**成功标志**：
- 输出包含 IPFS Hash（CID）
- 输出包含可访问的 URL（通常是 ` https://pinme.eth.limo/#/preview/<hash>` 或类似格式）

**示例输出**：
```
✓ Uploaded to IPFS
CID: QmXyz123...
Gateway URL:  https://pinme.eth.limo/#/preview/QmXyz123...
```

---

### Step 7: 返回结果

将上传结果返回给用户，包含：
- ✅ **访问 URL**：可直接在浏览器打开
- ✅ **IPFS Hash (CID)**：内容标识符，可用于其他 IPFS 网关
- ✅ **管理命令**：提醒用户如何管理已部署内容

**后续操作提示**：

| 操作 | 命令 |
|------|------|
| 查看上传记录 | `pinme list` |
| 删除已发布内容 | `pinme rm <hash>` |
| 绑定自定义域名 | `pinme bind <目录> --domain <域名>`（需 VIP） |
| 查看已绑定域名 | `pinme my-domains` |

---

## 常见问题处理

### 问题 1: `directory not found`

**原因**：指定的目录路径不存在

**解决方案**：
1. 使用 `ls` 确认当前目录结构
2. 检查是否已执行构建步骤
3. 确认构建输出目录名称是否正确

---

### 问题 2: `index.html not found`

**原因**：目标目录缺少入口文件

**解决方案**：
1. 检查构建配置，确认输出文件名
2. 有些框架会输出为 `200.html`（如 Next.js），需要重命名为 `index.html`
3. 确认构建是否成功

---

### 问题 3: `upload failed` 或网络错误

**原因**：网络连接问题或认证失败

**解决方案**：
1. 检查网络连接
2. 确认是否需要设置 AppKey：`pinme set-appkey <AppKey>`
3. 重试上传命令
4. 检查 PinMe 服务状态

---

### 问题 4: `file too large`

**原因**：文件或目录超过限制

**解决方案**：
1. 单文件 ≤ 200MB：压缩大文件（图片、视频）
2. 总目录 ≤ 1GB：
   - 使用 `du -sh <目录>` 检查大小
   - 删除不必要的资源文件
   - 压缩静态资源（使用 `vite-plugin-compression` 等）

---

### 问题 5: 子页面刷新 404

**原因**：使用了 history 模式路由

**解决方案**：
更改为 hash 模式路由：

**React (React Router v6)**:
```javascript
// ❌ 错误
import { BrowserRouter } from 'react-router-dom';

// ✅ 正确
import { HashRouter } from 'react-router-dom';

<HashRouter>
  <App />
</HashRouter>
```

**Vue (Vue Router v4)**:
```javascript
// ❌ 错误
import { createRouter, createWebHistory } from 'vue-router';

// ✅ 正确
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...]
});
```

---

## 最佳实践

### 1. 使用 `.pinmeignore` 排除文件

在项目根目录创建 `.pinmeignore` 文件：

```
node_modules
.git
.env
.env.local
src
*.config.js
*.config.ts
.DS_Store
Thumbs.db
```

### 2. 环境变量管理

不要将环境变量文件（`.env`）上传到 IPFS：
- 在构建时注入环境变量
- 或使用 `.pinmeignore` 排除

### 3. 资源优化

上传前优化资源以减小体积：
- 图片压缩（TinyPNG、ImageOptim）
- 代码压缩（Terser、CSSNano）
- Gzip 压缩（如果框架支持）

### 4. 版本管理

每次上传都会生成新的 CID：
- 使用 `pinme list` 管理历史版本
- 绑定自定义域名以便于访问
- 定期清理旧版本

---

## 完整示例

### 示例 1: 部署 Vite + React 项目

```bash
# Step 1: 检查环境
pinme -v

# Step 2: 识别项目类型
# 发现 vite.config.ts → Vite 项目

# Step 3: 检查路由模式（假设使用 HashRouter）
# 确认为 hash 模式，无需修改

# Step 4: 构建项目
npm run build

# Step 5: 验证目录
ls -la dist/
# 确认包含 index.html

# Step 6: 上传
pinme upload dist

# Step 7: 获取 URL
# 输出: https://gateway.pinme.cloud/ipfs/QmXyz123...
```

### 示例 2: 部署纯 HTML 项目

```bash
# Step 1: 检查环境
pinme -v

# Step 2: 识别项目类型
# 无配置文件，仅有 index.html → 纯 HTML 项目

# Step 3: 无需构建，跳过

# Step 4: 验证目录
ls -la .
# 确认包含 index.html

# Step 5: 上传当前目录
pinme upload .

# Step 6: 获取 URL
# 输出: https://gateway.pinme.cloud/ipfs/QmAbc456...
```

---

## 总结

PinMe 部署流程：
1. ✅ 检查环境 → 安装 PinMe（如需要）
2. ✅ 识别项目 → 确定构建配置
3. ✅ 检查路由 → 确保使用 hash 模式
4. ✅ 执行构建 → 生成静态文件
5. ✅ 验证目录 → 确保符合要求
6. ✅ 上传到 IPFS → 获取访问 URL
7. ✅ 返回结果 → 提供管理命令

关键注意事项：
- 必须包含 `index.html`
- 必须使用 hash 路由
- 单文件 ≤ 200MB，总目录 ≤ 1GB
- 排除 `node_modules`、`.git` 等无关文件
