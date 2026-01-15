import axios from './config';
import type { Post } from '@/types';

export interface PostListResponse {
  list: Post[];
  pagination: Pagination;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export const fetchPosts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PostListResponse> => {
  try {
    const response = await axios.get('/posts', {
      params: {
        page,
        pageSize,
      },
    });

    // 假设后端返回 { code, msg, data }
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || '请求失败');
    }

    return response.data.data; // 即 { list, pagination }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};