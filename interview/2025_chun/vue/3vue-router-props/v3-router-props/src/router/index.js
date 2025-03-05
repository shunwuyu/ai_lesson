import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';

const routes = [
    { path: '/', component: Home },
    { 
        path: '/user/:id', 
        name: 'UserProfile',
        component: UserProfile, 
        props: route => ({ id: route.params.id }) // 将 URL 参数作为 props 传递
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;