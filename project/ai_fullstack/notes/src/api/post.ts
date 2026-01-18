import axios from './config';
import type { Post } from '@/types';

export interface PostListResponse {
  items: Post[];
  pagination: Pagination;
}

export interface Pagination {
  current: number;
  limit: number;
  total: number;
  totalPage: number;
}

export const fetchPosts = async (
  page: number = 1,
  limit: number = 10
): Promise<PostListResponse> => {
  try {
    const response = await axios.get('/posts', {
      params: {
        page,
        limit,
      },
    });
    console.log(response, '??????')
    // 假设后端返回 { code, msg, data }
    if (response.status !== 200) {
      throw new Error(response.data.msg || '请求失败');
    }
    console.log(response.data, '???????||')
    return response.data; // 即 { list, pagination }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
};