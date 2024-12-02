import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const rootRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/aiAssistant',
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            keepAlive: false,
            title: '首页'
        }
    },
    {
        path: '/aiAssistant',
        name: 'aiAssistant',
        component: () => import('@/views/AiAssistant.vue'),
        meta: {
            keepAlive: false,
            title: 'AI助手'
        }
    },
    {
        path: '/dialogue',
        name: 'dialogue',
        component: () => import('@/views/Dialogue.vue'),
        meta: {
            keepAlive: true,
            title: 'AI智能选车'
        }
    },
]

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'App',
        component: () => import('@/views/layout/TheRoot.vue'),
        redirect: '/home',
        meta: {
            keepAlive: true
        },
        children: rootRoutes
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // 将对象类型转为字符串
        document.title = to.meta.title as string
    } else {
        document.title = '梦梦';
    }
    next();
})

export default router