import { apiClient } from './http';

export interface RegisterParams {
  name: string;
  password: string;
}

export const registerUser = async (data: RegisterParams) => {
  // 这里只把后端需要的字段传过去（通常不需要传 repeatPassword）
  const response = await apiClient.post('/auth/register', {
    name: data.name,
    password: data.password,
  });
  return response.data;
};