import { createWebHistory, createRouter } from "vue-router"
import Home from '../views/home.vue'
import About from '../views/about.vue'
import Login from '../views/login.vue'
import { getToken } from '../utils/auth'

const routes = [
  {
    path: '/', name: 'Home', component: Home,
    children: [
      { path: 'about', name: 'About', component: About }]
  },
  { path: '/login', name: 'Login', component: Login },
]


const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  let token = getToken()
  const { fullPath } = to
  if (fullPath === '/login') {
    next()
  }
  if (!token) { next('/login') }
  next()
})

export default router