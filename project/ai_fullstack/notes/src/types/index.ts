export interface User {
  id: number;
  name: string;
  // 根据你的实际数据结构扩展
}

export interface BannerData {
  id: number;
  title: string;
  image: string;
}

export interface Post {
  id: number;
  title: string;
  author: string;
  views?: number;
  likes?: number;
  comments?: number;
  createdAt: string; // 也可以使用 Date 类型，但原始数据是字符串格式 "YYYY-MM-DD HH:mm"
  hasImage?: boolean;
  imageUrl?: string;
  isTop?: boolean;
  excerpt?: string;
  category?: string;
}