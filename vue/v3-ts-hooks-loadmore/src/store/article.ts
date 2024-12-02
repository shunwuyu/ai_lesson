import {defineStore} from 'pinia';
import { ref } from 'vue';
import type { Article } from '../types/article';

export const useArticleStore = defineStore('article',()=>{

    // 文章数据集
    const _articles = [
        {
            id:1,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:2,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:3,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:4,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:5,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:6,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:7,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:8,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:9,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:10,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:11,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:12,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:13,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:14,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:15,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:16,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:17,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:18,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:19,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:20,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:21,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:22,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:23,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:24,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:25,
            title:"恭喜王总拿下阿里巴巴"
        },
        {
            id:26,
            title:"恭喜王总拿下阿里巴巴"
       },
    ]

    // 响应式文章数据
    const articles = ref<Article[]>([])

    // 获取每页文章列表 action

    const getArticles = (page:number, size:number = 10) => {
        // resolve 后的数据类型约束
        return new Promise<{
            data:Article[];
            page:number;
            total:number;
            hasMore:boolean;
        }>((resolve => {

            setTimeout(()=>{
                // 按页切割，得到当前页面数据
                const data = _articles.slice((page-1)*size,page * size);
                // 追加数据
                articles.value = [...articles.value,...data];
                resolve({
                    data,
                    page,
                    total:_articles.length,
                    // 是否还有更多数据， 如果没有数据后就false
                    hasMore:page * size < _articles.length
                });
            }, 500);
        }))
    }

    return{
      articles,
      getArticles
    }
}
)