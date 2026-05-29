import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PageA from '../components/PageA.vue';
import PageB from '../components/PageB.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/page-a', component: PageA },
  { path: '/page-b', component: PageB },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;