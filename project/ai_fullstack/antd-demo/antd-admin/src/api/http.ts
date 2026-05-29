// api/user.ts 或你当前文件
import axios from './config';

/**
 * 分页获取用户列表
 * @param page 当前页码（从 1 开始）
 * @param pageSize 每页数量
 */
export const getUsers = (page: number = 1, pageSize: number = 2) => {
  return axios.get('/users', {
    params: {
      page,
      pageSize,
    },
  });
};