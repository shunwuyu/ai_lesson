import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';

const routes = [
    { path: '/', name:"home", component: Home },
    { path: '/user/:id', name: "UserProfile", component: UserProfile, props: true }, // 使用 props 接收参数
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;