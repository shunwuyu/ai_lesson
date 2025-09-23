import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ArticleList from '@/views/ArticleList.vue';
import ArticleDetail from '@/views/ArticleDetail.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/articles'
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;