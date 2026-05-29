<template>
  <div class="article-detail-page" v-loading="articleStore.loading">
    <el-page-header @back="handleBack" content="文章详情" />

    <!-- 文章内容 -->
    <div class="article-content" v-if="articleStore.currentDetail">
      <h1 class="title">{{ articleStore.currentDetail.title }}</h1>
      <div class="meta">
        <span>作者：{{ articleStore.currentDetail.author }}</span>
        <span>发布时间：{{ articleStore.currentDetail.createTime }}</span>
      </div>
      <div class="content" v-html="articleStore.currentDetail.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticle } from '@/hooks/userArticle';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const { articleStore, loadArticleDetail } = useArticle();
const route = useRoute();
const router = useRouter();

// 从路由获取文章ID
const articleId = Number(route.params.id);
console.log(articleId);

// 挂载时加载详情
onMounted(() => {
  loadArticleDetail(articleId);
});

// 返回列表页
const handleBack = () => {
  router.push('/articles');
};
</script>

<style scoped>
.article-detail-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.article-content {
  margin-top: 30px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.meta {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.meta span {
  margin: 0 15px;
}

.content {
  line-height: 2;
  color: #444;
}
</style>