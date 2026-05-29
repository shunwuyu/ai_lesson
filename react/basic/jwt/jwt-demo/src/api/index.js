import axios from './axios';

export const login = async (data) => {
  const res = await axios.post('/login', data);
  return res.data;
};

export const getProtected = async () => {
  const res = await axios.get('/get');
  return res.data;
};
