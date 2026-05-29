<template>
  <div class="article-list-page">
    <el-page-header content="文章列表" />

    <!-- 文章列表 -->
    <el-table 
      v-loading="articleStore.loading" 
      :data="articleStore.list" 
      border 
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column label="ID" prop="id" width="80" align="center" />
      <el-table-column label="标题" align="center">
        <template #default="scope">
          <el-link @click="goToDetail(scope.row.id)" type="primary" style="cursor: pointer">
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="author" width="120" align="center" />
      <el-table-column label="发布时间" prop="createTime" width="160" align="center" />
      <el-table-column label="摘要" prop="summary" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="listParams.page"
      v-model:page-size="listParams.limit"
      :total="articleStore.total"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; text-align: right"
    />
  </div>
</template>

<script setup lang="ts">
import { useArticle } from '@/hooks/useArticle';

const { articleStore, listParams, loadArticleList, goToDetail } = useArticle();

// 初始化加载列表
loadArticleList();

// 每页条数改变
const handleSizeChange = (size: number) => {
  listParams.value.limit = size;
  loadArticleList();
};

// 当前页改变
const handleCurrentChange = (page: number) => {
  listParams.value.page = page;
  loadArticleList();
};
</script>

<style scoped>
.article-list-page {
  padding: 20px;
}
</style>