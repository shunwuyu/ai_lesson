import {
    create    
} from 'zustand'
import {
    getHotList,
    getSuggestList
} from '../api/search';

const useSearchStore = create((set, get) => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    return {
        hotList: [],
        suggestList: [],
        searchHistory,
        enterLoading: false,
        setHotList: async () => {
            const res = await getHotList();
            // console.log(res);
            set({
                hotList: res.data
            });
        },
        setSuggestList: async (keyword) => {
            const res = await getSuggestList(keyword);
            // console.log(res);
            set({
                suggestList: res.data
            })
        },
        // 添加搜索记录到 localStorage
        addHistory: (keyword) => {
            if (!keyword) return;
    
            const { searchHistory } = get();
            const newHistory = [keyword, ...searchHistory.filter((item) => item !== keyword)].slice(0, 10); // 去重并保留最多10条
    
            set({ searchHistory: newHistory });
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        },
        // 清空搜索记录
        clearHistory: () => {
            set({ searchHistory: [] });
            localStorage.removeItem('searchHistory');
        },
      
    }
})

export default useSearchStore;