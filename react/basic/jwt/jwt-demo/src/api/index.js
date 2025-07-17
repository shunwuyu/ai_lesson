import axios from './axios';

export const login = async (data) => {
  const res = await axios.post('/api/login', data);
  return res.data;
};

export const getProtected = async () => {
  const res = await axios.get('/api/get');
  return res.data;
};
