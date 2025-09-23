import { defineStore } from 'pinia';
import { getArticleList, getArticleDetail, ArticleListParams, ArticleItem, ArticleDetail } from '@/api/article';

interface ArticleState {
  list: ArticleItem[]; // 文章列表
  total: number;       // 总条数
  currentDetail: ArticleDetail | null; // 当前文章详情
  loading: boolean;    // 加载状态
}

export const useArticleStore = defineStore('article', {
  state: (): ArticleState => ({
    list: [],
    total: 0,
    currentDetail: null,
    loading: false
  }),
  actions: {
    // 获取文章列表
    async fetchArticleList(params: ArticleListParams) {
      this.loading = true;
      try {
        const res = await getArticleList(params);
        if (res.data.code === 200) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        }
      } catch (err) {
        console.error('获取文章列表失败：', err);
      } finally {
        this.loading = false;
      }
    },
    // 获取文章详情
    async fetchArticleDetail(id: number) {
      this.loading = true;
      try {
        const res = await getArticleDetail(id);
        if (res.data.code === 200) {
          this.currentDetail = res.data.data;
        }
      } catch (err) {
        console.error('获取文章详情失败：', err);
      } finally {
        this.loading = false;
      }
    },
    // 清空当前文章详情
    clearCurrentDetail() {
      this.currentDetail = null;
    }
  }
});