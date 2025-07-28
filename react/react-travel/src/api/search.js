import axios from "./config"

export const getHotList = async () => {
    return axios.get('/hotlist');
}

export const getSuggestList = async (keyword) => {
    return axios.get(`/suggest?keyword=${keyword}`);
}