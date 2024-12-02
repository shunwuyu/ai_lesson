import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '../views/home.vue'
import { usePermissStore } from '../store/permiss'

// 自己人用的， 没有兼容性问题
// 移动端用户项目也不需要怎么考虑兼容性
// 用户端PC 项目 flex ? 

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
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
                    title: '首页',
                    noAuth: true
                },
                component: () => import('../views/dashboard.vue')
            },
            {
                path: '/system-user',
                name: 'system-user',
                meta: {
                    title: '用户管理',
                    permiss: '11'
                },
                component: () => import('../views/system-user.vue')
            },
            {
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '基础表格',
                    permiss: '31'
                },
                component: () => import('../views/basetable.vue')
            }
        ]
    },
    {
        path: '/login',
        meta: {
            title: '登录',
            noAuth: true
        },
        component: () => import('../views/login.vue')
    },
    {
        path: '/403',
        meta: {
            title: '403 Forbidden',
            noAuth: true
        },
        component: () => import('../views/403.vue') 
    },
    {
        path: '/404',
        meta: {
            title: '404 NotFound',
            noAuth: true
        },
        component: () => import('../views/404.vue') 
    },
    {
        path: '/:path(.*)',
        redirect: '/404'
    }
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from, next) => {
    NProgress.start();
    const role = localStorage.getItem('username'); // 登录？
    const permissStore = usePermissStore()
    // 鉴权  分角色  403
    if(to.meta.title) {
        document.title = to.meta.title as string
    }
    // 需要登录的路由 ， 未登录
    if(!role && to.meta.noAuth !== true) {
        next('/login')
        // 登陆了 访问的页面要鉴权， 未登录且不需要登录 
    } else if (
        // 这个页面要检验permiss 
        typeof to.meta.permiss == 'string' &&
        !permissStore.key.includes(to.meta.permiss)
    ) {
        next('/403')
    } else {
        // 未登录且不需要登录   要鉴权且有权限的
        next();
    }
    

    
})

router.afterEach(() => {
    NProgress.done();
})

export default router;