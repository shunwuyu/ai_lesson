// app/lib/api.js
import fs from 'fs';
import path from 'path';

// 读取本地 JSON 文件
const getPostsData = () => {
  const filePath = path.join(process.cwd(), 'src/app', 'data', 'posts.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

// 获取所有文章
export const getPosts = () => {
  return getPostsData();
};

// 根据 ID 获取单篇文章
export const getPostById = (id) => {
  const posts = getPostsData();
  return posts.find(post => post.id === parseInt(id));
};