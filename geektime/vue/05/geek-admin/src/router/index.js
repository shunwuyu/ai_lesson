import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'
// 引入页面组件
import Home from '../pages/home.vue'
import About from '../pages/about.vue'
// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
// 新建路由实例
const router = createRouter({
  // 使用 hash 模式的路由，也就是 url 上会通过 # 来区分。
  history: createWebHashHistory(),
  routes
})
  
export default router
  