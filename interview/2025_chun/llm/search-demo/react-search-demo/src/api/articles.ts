import axios from 'axios';

export const searchArticles = (keyword: string) => axios.post('http://localhost:3000/search', {
    keyword: keyword
})