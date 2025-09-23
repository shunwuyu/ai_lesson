import axios from 'axios';

// 文章列表请求参数类型
export interface ArticleListParams {
  page: number;
  limit: number;
}

// 文章列表项类型
export interface ArticleItem {
  id: number;
  title: string;
  author: string;
  createTime: string;
  summary: string;
}

// 文章列表响应类型
export interface ArticleListRes {
  list: ArticleItem[];
  total: number;
  page: number;
  limit: number;
}

// 文章详情类型
export interface ArticleDetail {
  id: number;
  title: string;
  author: string;
  createTime: string;
  content: string;
}

// 获取文章列表
export const getArticleList = (params: ArticleListParams) => {
  return axios.get<{ code: number; data: ArticleListRes }>('/api/articles', { params });
};

// 获取文章详情
export const getArticleDetail = (id: number) => {
  return axios.get<{ code: number; data: ArticleDetail }>(`/api/articles/${id}`);
};