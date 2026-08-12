import axios from './axios';

export const getTodos = async () => {
  const res = await axios.get('/todos');
  return res.data;
};