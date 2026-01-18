export interface User {
  id: number;
  name: string;
  avatar?: string;
}


export interface BannerData {
  id: number;
  title: string;
  image: string;
}

export interface Post {
  id: number;
  title: string;
  brief: string;
  publishedAt: string; // 对应数据中的 "2026-01-18T07:55:04.456Z" ISO 格式字符串
  // 保留原始接口中与新数据匹配的可选属性，补充必选/可选的新属性
  totalLikes?: number; // 数据中存在该字段，保留可选性（若业务中必传可改为非可选）
  totalComments?: number; // 数据中存在该字段，保留可选性（若业务中必传可改为非可选）
  user: User; // 嵌套用户对象，必选字段（JSON 中存在且非空）
  tags: string[]; // 标签数组，必选字段（JSON 中存在且非空）
  thumbnail: string; // 缩略图地址，必选字段（JSON 中存在且非空）
  pics: string[]; // 图片数组，必选字段（JSON 中存在且非空）
}