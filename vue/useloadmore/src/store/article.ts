import { defineStore } from 'pinia';
import { ref } from 'vue'
import  type { Article } from '../types/article';

export const useArticleStore = defineStore('article', () => {
    // 私有的 所有数据
    const _artciles:Article[] = [
        {
            id: 1,
            title: '预祝胡总拿下字节'
        },
        {
            id: 2,
            title: '预祝胡总拿下字节'
        },
        {
            id: 3,
            title: '预祝胡总拿下字节'
        },
        {
            id: 4,
            title: '预祝胡总拿下字节'
        },
        {
            id: 5,
            title: '预祝胡总拿下字节'
        },
        {
            id: 6,
            title: '预祝胡总拿下字节'
        },
        {
            id: 7,
            title: '预祝胡总拿下字节'
        },
        {
            id: 8,
            title: '预祝胡总拿下字节'
        },
        {
            id: 9,
            title: '预祝胡总拿下字节'
        },
        {
            id: 10,
            title: '预祝胡总拿下字节'
        },
        {
            id: 11,
            title: '预祝胡总拿下字节'
        },
        {
            id: 12,
            title: '预祝胡总拿下字节'
        },
        {
            id: 13,
            title: '预祝胡总拿下字节'
        },
        {
            id: 14,
            title: '预祝胡总拿下字节'
        },
        {
            id: 15,
            title: '预祝胡总拿下字节'
        },
        {
            id: 16,
            title: '预祝胡总拿下字节'
        },
        {
            id: 17,
            title: '预祝胡总拿下字节'
        },
        {
            id: 18,
            title: '预祝胡总拿下字节'
        },
        {
            id: 19,
            title: '预祝胡总拿下字节'
        },
        {
            id: 20,
            title: '预祝胡总拿下字节'
        },
        {
            id: 21,
            title: '预祝胡总拿下字节'
        },
        {
            id: 22,
            title: '预祝胡总拿下字节'
        },
        {
            id: 23,
            title: '预祝胡总拿下字节'
        },
        {
            id: 24,
            title: '预祝胡总拿下字节'
        },
        {
            id: 25,
            title: '预祝胡总拿下字节'
        },
        {
            id: 26,
            title: '预祝胡总拿下字节'
        },
        {
            id: 27,
            title: '预祝湘总拿下腾讯'
        },
    ]

    const articles = ref<Article[]>([])
    // 滚动加载更多 
    const getArtiles = (page: number, size:number=10) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 某页的数据
                const data = _artciles.slice((page-1)*size, page*size);
                articles.value = [...articles.value, ...data]
                resolve({
                    data, 
                    page,
                    total:_artciles.length,
                    hasMore: page * size < _artciles.length
                })
            }, 500)
        })
    }
    return {
        articles,
        getArtiles
    }
})