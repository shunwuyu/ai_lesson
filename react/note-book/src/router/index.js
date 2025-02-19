// router/index.js
import Home from '@/views/Home'
import Data from '@/views/Data'
import User from '@/views/User'
import Login from '@/views/Login'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes
