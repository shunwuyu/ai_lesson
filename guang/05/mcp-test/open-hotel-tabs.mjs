#!/usr/bin/env node
/**
 * 生成北京南站附近最近 3 家酒店的独立 HTML 页面（每个页面标题为酒店名），并用默认浏览器打开，每个 tab 一个 URL。
 * 使用方式：node open-hotel-tabs.mjs
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = __dirname;

const hotels = [
  { name: '米家青年酒店(北京南站店)', address: '右外东庄21号楼', photo: 'https://store.is.autonavi.com/showpic/357bcafee9e1ab90ac1460eb0bda5150' },
  { name: '北京佳伟来福宾馆', address: '南站幸福路东庄小区20号楼', photo: 'https://store.is.autonavi.com/showpic/6c9008e5c66fc1b34df92daa631c20ed' },
  { name: '北京永鑫宾馆', address: '幸福三巷', photo: 'https://store.is.autonavi.com/showpic/260da22f7025709aeff4470843ad435f' },
];

// 为每个酒店生成一个独立 HTML，页面标题为酒店名
hotels.forEach((h, i) => {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(h.name)}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #1a1a2e; color: #eee; }
    h1 { font-size: 1.25rem; margin-bottom: 16px; }
    p { color: #aaa; margin-bottom: 16px; }
    img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
  </style>
</head>
<body>
  <h1>${escapeHtml(h.name)}</h1>
  <p>地址：${escapeHtml(h.address)}</p>
  <img src="${escapeHtml(h.photo)}" alt="${escapeHtml(h.name)}" />
</body>
</html>`;
  const path = join(outDir, `hotel-${i + 1}-${slug(h.name)}.html`);
  writeFileSync(path, html, 'utf8');
  console.log('已生成:', path);
});

// 用默认浏览器打开 3 个 tab（每个 URL 一个 tab）
const files = hotels.map((h, i) => join(outDir, `hotel-${i + 1}-${slug(h.name)}.html`));
const fileUrls = files.map(f => `file://${f}`);

const plat = process.platform;
if (plat === 'darwin') {
  // 优先用 Chrome 一次打开多个 URL，会开成多个 tab；否则用默认浏览器
  try {
    execSync(`open -a "Google Chrome" ${fileUrls.map(u => `"${u}"`).join(' ')}`, { stdio: 'inherit' });
  } catch {
    execSync(`open ${fileUrls.map(u => `"${u}"`).join(' ')}`, { stdio: 'inherit' });
  }
} else if (plat === 'win32') {
  fileUrls.forEach(url => execSync(`start "" "${url}"`, { stdio: 'inherit' }));
} else {
  execSync(`xdg-open "${fileUrls[0]}"`, { stdio: 'inherit' });
  fileUrls.slice(1).forEach(url => execSync(`xdg-open "${url}"`, { stdio: 'inherit' }));
}

console.log('已在浏览器中打开 3 个标签页，每个页面标题为对应酒店名。');

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slug(name) {
  return name.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '') || 'hotel';
}
