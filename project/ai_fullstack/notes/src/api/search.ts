import axios from './config';

export const doSearch = (keyword: string) => {
  return axios.get(`/api/search?keyword=${keyword}`);
}