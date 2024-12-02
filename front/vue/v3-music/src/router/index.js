import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import {Pages} from "@/router/pages";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: Pages.home,
            component: () => import('@/views/Root.vue'),
            redirect: {name: Pages.discover},
            children: [
                {
                    path: 'discover',
                    name: 'discover',
                    component: () => import("@/views/discover/Discover.vue"),
                    meta: {
                        menu: 'discover',
                        keepAlive: true,
                    }
                }
            ]
        }
    ]
})

export default router