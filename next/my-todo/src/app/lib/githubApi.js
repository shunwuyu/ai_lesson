// app/lib/githubApi.js
import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

// 获取用户仓库列表
export const getUserRepos = async (username = 'shunwuyu') => {
  try {
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
      },
    });
    return response.data;
  } catch (error) {
    console.error('获取仓库列表失败:', error);
    throw error;
  }
};

// 获取单个仓库详情
export const getRepoDetail = async (username, repoName) => {
  try {
    const [repoResponse, readmeResponse] = await Promise.all([
      api.get(`/repos/${username}/${repoName}`),
      api.get(`/repos/${username}/${repoName}/readme`).catch(() => null), // README 可能不存在
    ]);
    
    return {
      repo: repoResponse.data,
      readme: readmeResponse?.data,
    };
  } catch (error) {
    console.error('获取仓库详情失败:', error);
    throw error;
  }
};