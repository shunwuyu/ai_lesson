import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/home.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    noAuth: true,
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router