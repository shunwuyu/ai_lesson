import { ref } from 'vue';
import { useArticleStore } from '@/pinia/articleStore';
import { ArticleListParams } from '@/api/article';
import { useRouter } from 'vue-router';

export const useArticle = () => {
  const articleStore = useArticleStore();
  const router = useRouter();
  // 列表分页参数
  const listParams = ref<ArticleListParams>({
    page: 1,
    limit: 10
  });

  // 加载文章列表
  const loadArticleList = (params?: ArticleListParams) => {
    const queryParams = params || listParams.value;
    articleStore.fetchArticleList(queryParams);
    // 更新分页参数
    if (params) listParams.value = params;
  };

  // 跳转到文章详情页
  const goToDetail = (id: number) => {
    router.push(`/article/${id}`);
  };

  // 加载文章详情
  const loadArticleDetail = (id: number) => {
    // 先清空旧数据
    articleStore.clearCurrentDetail();
    // 加载新详情
    articleStore.fetchArticleDetail(id);
  };

  return {
    articleStore,
    listParams,
    loadArticleList,
    goToDetail,
    loadArticleDetail
  };
};